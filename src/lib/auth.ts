import { cookies, headers } from "next/headers";
import { dbSessions, dbUsers, getRuntimeVar, toPublicUser, type PublicUser } from "./db";

const DEV_FALLBACK_SECRET = "ssair-local-dev-secret-configure-JWT_SECRET-for-prod";
const SESSION_DURATION_MS = 7 * 24 * 60 * 60 * 1000; // 7 days
const PBKDF2_ITERATIONS = 100_000;
const SESSION_COOKIE_NAME = "ssair-session";

export interface SessionPayload {
  sessionId: string;
  userId: number;
  iat?: number;
  exp?: number;
}

// ─── Base64Url Helpers (UTF-8 & Edge-Safe) ──────────────────
function bytesToBase64Url(bytes: Uint8Array): string {
  let binary = "";
  for (let i = 0; i < bytes.length; i++) {
    binary += String.fromCharCode(bytes[i]);
  }
  return btoa(binary).replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/g, "");
}

function base64UrlToBytes(input: string): Uint8Array {
  const normalized = input.replace(/-/g, "+").replace(/_/g, "/");
  const padding = "=".repeat((4 - (normalized.length % 4)) % 4);
  const binary = atob(normalized + padding);
  const bytes = new Uint8Array(binary.length);
  for (let i = 0; i < binary.length; i++) {
    bytes[i] = binary.charCodeAt(i);
  }
  return bytes;
}

function bytesToHex(bytes: Uint8Array): string {
  return Array.from(bytes)
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");
}

function hexToBytes(hex: string): Uint8Array {
  const bytes = new Uint8Array(hex.length / 2);
  for (let i = 0; i < bytes.length; i++) {
    bytes[i] = parseInt(hex.slice(i * 2, i * 2 + 2), 16);
  }
  return bytes;
}

function constantTimeEqual(a: Uint8Array, b: Uint8Array): boolean {
  if (a.length !== b.length) return false;
  let diff = 0;
  for (let i = 0; i < a.length; i++) {
    diff |= a[i] ^ b[i];
  }
  return diff === 0;
}

// ─── Hardware-Accelerated Web Crypto Password Hashing ────────
export async function hashPassword(password: string): Promise<string> {
  const encoder = new TextEncoder();
  const salt = new Uint8Array(16);
  crypto.getRandomValues(salt);

  const keyMaterial = await crypto.subtle.importKey(
    "raw",
    encoder.encode(password),
    "PBKDF2",
    false,
    ["deriveBits"]
  );

  const derivedBits = await crypto.subtle.deriveBits(
    {
      name: "PBKDF2",
      salt,
      iterations: PBKDF2_ITERATIONS,
      hash: "SHA-256",
    },
    keyMaterial,
    256
  );

  return `pbkdf2_sha256$${PBKDF2_ITERATIONS}$${bytesToHex(salt)}$${bytesToHex(new Uint8Array(derivedBits))}`;
}

export async function verifyPassword(password: string, storedHash: string): Promise<boolean> {
  if (!storedHash.startsWith("pbkdf2_sha256$")) {
    return false;
  }

  const parts = storedHash.split("$");
  if (parts.length !== 4) return false;

  const iterations = Number(parts[1]);
  const saltHex = parts[2];
  const expectedHex = parts[3];

  if (!Number.isFinite(iterations) || iterations < 10_000 || saltHex.length < 16 || expectedHex.length !== 64) {
    return false;
  }

  const encoder = new TextEncoder();
  const saltBytes = hexToBytes(saltHex);
  const expectedBytes = hexToBytes(expectedHex);

  const keyMaterial = await crypto.subtle.importKey(
    "raw",
    encoder.encode(password),
    "PBKDF2",
    false,
    ["deriveBits"]
  );

  const derivedBits = await crypto.subtle.deriveBits(
    {
      name: "PBKDF2",
      salt: saltBytes as BufferSource,
      iterations,
      hash: "SHA-256",
    },
    keyMaterial,
    256
  );

  return constantTimeEqual(new Uint8Array(derivedBits), expectedBytes);
}

// ─── Web Crypto HMAC-SHA256 JWT (Zero Dependencies) ──────────
async function resolveJwtSecret(): Promise<string> {
  const secret = await getRuntimeVar("JWT_SECRET");
  if (secret) return secret;

  if (typeof process !== "undefined" && process.env?.NODE_ENV === "production") {
    console.warn(
      JSON.stringify({
        level: "warn",
        message: "JWT_SECRET is not set; using fallback signing key. Set JWT_SECRET via `cf secret put JWT_SECRET` in production.",
      })
    );
  }
  return DEV_FALLBACK_SECRET;
}

async function importHmacKey(secret: string, usage: "sign" | "verify"): Promise<CryptoKey> {
  return crypto.subtle.importKey(
    "raw",
    new TextEncoder().encode(secret),
    { name: "HMAC", hash: "SHA-256" },
    false,
    [usage]
  );
}

export async function createToken(payload: Pick<SessionPayload, "sessionId" | "userId">): Promise<string> {
  const secret = await resolveJwtSecret();
  const nowSec = Math.floor(Date.now() / 1000);
  const fullPayload: SessionPayload = {
    sessionId: payload.sessionId,
    userId: payload.userId,
    iat: nowSec,
    exp: nowSec + Math.floor(SESSION_DURATION_MS / 1000),
  };

  const encoder = new TextEncoder();
  const headerB64 = bytesToBase64Url(encoder.encode(JSON.stringify({ alg: "HS256", typ: "JWT" })));
  const payloadB64 = bytesToBase64Url(encoder.encode(JSON.stringify(fullPayload)));
  const signingInput = `${headerB64}.${payloadB64}`;

  const key = await importHmacKey(secret, "sign");
  const signatureBuffer = await crypto.subtle.sign("HMAC", key, encoder.encode(signingInput));
  const sigB64 = bytesToBase64Url(new Uint8Array(signatureBuffer));

  return `${signingInput}.${sigB64}`;
}

export async function verifyToken(token: string): Promise<SessionPayload | null> {
  try {
    const segments = token.split(".");
    if (segments.length !== 3) return null;

    const [headerB64, payloadB64, sigB64] = segments;
    const headerJson = JSON.parse(new TextDecoder().decode(base64UrlToBytes(headerB64))) as {
      alg?: string;
    };
    if (headerJson.alg !== "HS256") return null;

    const secret = await resolveJwtSecret();
    const key = await importHmacKey(secret, "verify");
    const signingBytes = new TextEncoder().encode(`${headerB64}.${payloadB64}`);
    const sigBytes = base64UrlToBytes(sigB64);

    const valid = await crypto.subtle.verify("HMAC", key, sigBytes as BufferSource, signingBytes as BufferSource);
    if (!valid) return null;

    const payload = JSON.parse(new TextDecoder().decode(base64UrlToBytes(payloadB64))) as SessionPayload;
    if (!payload.sessionId || typeof payload.userId !== "number") return null;

    const nowSec = Math.floor(Date.now() / 1000);
    if (typeof payload.exp === "number" && payload.exp <= nowSec) return null;

    return payload;
  } catch {
    return null;
  }
}

// ─── Cookie Security Protocol Detection ─────────────────────
async function isHttpsRequest(request?: Request): Promise<boolean> {
  if (request) {
    const forwardedProto = request.headers.get("x-forwarded-proto");
    if (forwardedProto) {
      return forwardedProto.split(",")[0].trim().toLowerCase() === "https";
    }
    try {
      return new URL(request.url).protocol === "https:";
    } catch {}
  }

  try {
    const h = await headers();
    const proto = h.get("x-forwarded-proto");
    if (proto) {
      return proto.split(",")[0].trim().toLowerCase() === "https";
    }
    const host = h.get("host") || "";
    if (host.startsWith("localhost") || host.startsWith("127.0.0.1")) {
      return false;
    }
  } catch {}

  return false;
}

// ─── Session Lifecycle ───────────────────────────────────────
export async function createSession(userId: number, request?: Request) {
  const expiresAt = new Date(Date.now() + SESSION_DURATION_MS);
  const sessionId = crypto.randomUUID();

  // Prune old expired sessions for this user silently
  await dbSessions.pruneExpiredForUser(userId);

  const session = await dbSessions.create(sessionId, userId, expiresAt);
  const token = await createToken({ sessionId: session.id, userId });
  const secure = await isHttpsRequest(request);

  const cookieStore = await cookies();
  cookieStore.set(SESSION_COOKIE_NAME, token, {
    httpOnly: true,
    secure,
    sameSite: "lax",
    path: "/",
    expires: expiresAt,
  });

  return session;
}

export async function getSession(): Promise<{ session: { id: string; userId: number; expiresAt: string }; user: PublicUser } | null> {
  const cookieStore = await cookies();
  const token = cookieStore.get(SESSION_COOKIE_NAME)?.value;
  if (!token) return null;

  const payload = await verifyToken(token);
  if (!payload) return null;

  const session = await dbSessions.findById(payload.sessionId);
  if (!session || new Date(session.expiresAt).getTime() < Date.now()) {
    if (session) {
      await dbSessions.deleteById(session.id).catch(() => {});
    }
    return null;
  }

  const user = await dbUsers.findById(session.userId);
  if (!user) return null;

  return { session, user: toPublicUser(user) };
}

export async function destroySession() {
  const cookieStore = await cookies();
  const token = cookieStore.get(SESSION_COOKIE_NAME)?.value;

  if (token) {
    const payload = await verifyToken(token);
    if (payload) {
      await dbSessions.deleteById(payload.sessionId).catch(() => {});
    }
  }

  cookieStore.delete(SESSION_COOKIE_NAME);
}

export async function hasConfiguredJwtSecret(): Promise<boolean> {
  const s = await getRuntimeVar("JWT_SECRET");
  return Boolean(s && s.length >= 16);
}
