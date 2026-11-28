import { services as STATIC_SERVICES } from "@/data/services";
import { CATALOG_ITEMS } from "@/data/catalog";
import { RESEARCH_ARTICLES } from "@/data/research";

// ─── Domain Record Interfaces ─────────────────────────────────
export interface DbUser {
  id: number;
  name: string;
  email: string;
  passwordHash: string | null;
  avatar: string | null;
  phone: string | null;
  institution: string | null;
  role: string;
  provider: string;
  providerId: string | null;
  createdAt: string;
  updatedAt: string;
}

export type PublicUser = Omit<DbUser, "passwordHash" | "providerId" | "updatedAt">;

export interface DbSession {
  id: string;
  userId: number;
  expiresAt: string;
  createdAt: string;
}

export interface DbTeachingApplication {
  id: number;
  userId: number;
  fullName: string;
  email: string;
  phone: string;
  qualification: string;
  specialization: string;
  experience: string;
  motivation: string;
  resumeUrl: string | null;
  status: string;
  createdAt: string;
  updatedAt: string;
}

export interface DbProjectRequest {
  id: number;
  userId: number | null;
  fullName: string;
  email: string;
  phone: string;
  track: string;
  domain: string;
  projectCode: string | null;
  title: string;
  requirements: string;
  status: string;
  createdAt: string;
  updatedAt: string;
}

export interface DbContactInquiry {
  id: number;
  name: string;
  email: string;
  phone: string | null;
  subject: string;
  message: string;
  status: string;
  createdAt: string;
  updatedAt: string;
}

export interface DbServiceRow {
  id: number;
  slug: string;
  title: string;
  shortDescription: string;
  fullDescription: string;
  icon: string;
  category: string;
  features: string;
  technologies: string;
  isActive: number | boolean;
  createdAt: string;
  updatedAt: string;
}

export interface DbNewsArticleRow {
  id: number;
  title: string;
  excerpt: string;
  content: string | null;
  category: string;
  publishedAt: string;
  createdAt: string;
  updatedAt: string;
}

export type DbEngine = "cloudflare-d1" | "node-sqlite";

interface SqlClient {
  engine: DbEngine;
  queryAll<T = Record<string, unknown>>(sql: string, params?: unknown[]): Promise<T[]>;
  queryFirst<T = Record<string, unknown>>(sql: string, params?: unknown[]): Promise<T | null>;
  execute(sql: string, params?: unknown[]): Promise<{ lastRowId: number; changes: number }>;
  batchDDL(statements: string[]): Promise<void>;
}

// ─── Date & Mapping Helpers ───────────────────────────────────
export function toIsoString(value: unknown): string {
  if (!value && value !== 0) return new Date().toISOString();
  if (value instanceof Date) return value.toISOString();
  if (typeof value === "number") return new Date(value).toISOString();
  if (typeof value === "string") {
    if (/^\d{10,15}$/.test(value)) {
      return new Date(Number(value)).toISOString();
    }
    const parsed = new Date(value.includes("T") || value.endsWith("Z") ? value : `${value}Z`);
    if (!Number.isNaN(parsed.getTime())) {
      return parsed.toISOString();
    }
  }
  return new Date().toISOString();
}

function mapUserRow(row: Record<string, unknown>): DbUser {
  return {
    id: Number(row.id),
    name: String(row.name),
    email: String(row.email),
    passwordHash: row.passwordHash != null ? String(row.passwordHash) : null,
    avatar: row.avatar != null ? String(row.avatar) : null,
    phone: row.phone != null ? String(row.phone) : null,
    institution: row.institution != null ? String(row.institution) : null,
    role: String(row.role || "STUDENT"),
    provider: String(row.provider || "credentials"),
    providerId: row.providerId != null ? String(row.providerId) : null,
    createdAt: toIsoString(row.createdAt),
    updatedAt: toIsoString(row.updatedAt),
  };
}

export function toPublicUser(user: DbUser): PublicUser {
  return {
    id: user.id,
    name: user.name,
    email: user.email,
    avatar: user.avatar,
    phone: user.phone,
    institution: user.institution,
    role: user.role,
    provider: user.provider,
    createdAt: user.createdAt,
  };
}

function mapTeachingApp(row: Record<string, unknown>): DbTeachingApplication {
  return {
    id: Number(row.id),
    userId: Number(row.userId),
    fullName: String(row.fullName),
    email: String(row.email),
    phone: String(row.phone),
    qualification: String(row.qualification),
    specialization: String(row.specialization),
    experience: String(row.experience),
    motivation: String(row.motivation),
    resumeUrl: row.resumeUrl != null ? String(row.resumeUrl) : null,
    status: String(row.status || "PENDING"),
    createdAt: toIsoString(row.createdAt),
    updatedAt: toIsoString(row.updatedAt),
  };
}

function mapProjectRequest(row: Record<string, unknown>): DbProjectRequest {
  return {
    id: Number(row.id),
    userId: row.userId != null ? Number(row.userId) : null,
    fullName: String(row.fullName),
    email: String(row.email),
    phone: String(row.phone),
    track: String(row.track),
    domain: String(row.domain),
    projectCode: row.projectCode != null ? String(row.projectCode) : null,
    title: String(row.title),
    requirements: String(row.requirements),
    status: String(row.status || "SUBMITTED"),
    createdAt: toIsoString(row.createdAt),
    updatedAt: toIsoString(row.updatedAt),
  };
}

function mapContactInquiry(row: Record<string, unknown>): DbContactInquiry {
  return {
    id: Number(row.id),
    name: String(row.name),
    email: String(row.email),
    phone: row.phone != null ? String(row.phone) : null,
    subject: String(row.subject),
    message: String(row.message),
    status: String(row.status || "PENDING"),
    createdAt: toIsoString(row.createdAt),
    updatedAt: toIsoString(row.updatedAt),
  };
}

// ─── Cloudflare Env & Runtime Resolution ──────────────────────
interface RuntimeCloudflareEnv {
  DB?: D1Database;
  JWT_SECRET?: string;
}

export async function getCloudflareEnv(): Promise<RuntimeCloudflareEnv | null> {
  try {
    const mod = (await import("cloudflare:workers")) as { env?: RuntimeCloudflareEnv };
    return mod?.env ?? null;
  } catch {
    return null;
  }
}

export async function getRuntimeVar(key: "JWT_SECRET"): Promise<string | undefined> {
  const cfEnv = await getCloudflareEnv();
  if (cfEnv && typeof cfEnv[key] === "string" && cfEnv[key]!.length > 0) {
    return cfEnv[key];
  }
  if (typeof process !== "undefined" && process.env && process.env[key]) {
    return process.env[key];
  }
  return undefined;
}

function createD1Client(d1: D1Database): SqlClient {
  return {
    engine: "cloudflare-d1",
    async queryAll<T>(sql: string, params: unknown[] = []): Promise<T[]> {
      const stmt = d1.prepare(sql);
      const bound = params.length > 0 ? stmt.bind(...params) : stmt;
      const res = await bound.all<T>();
      return res.results ?? [];
    },
    async queryFirst<T>(sql: string, params: unknown[] = []): Promise<T | null> {
      const stmt = d1.prepare(sql);
      const bound = params.length > 0 ? stmt.bind(...params) : stmt;
      return bound.first<T>();
    },
    async execute(sql: string, params: unknown[] = []): Promise<{ lastRowId: number; changes: number }> {
      const stmt = d1.prepare(sql);
      const bound = params.length > 0 ? stmt.bind(...params) : stmt;
      const res = await bound.run();
      return {
        lastRowId: Number(res.meta?.last_row_id ?? 0),
        changes: Number(res.meta?.changes ?? 0),
      };
    },
    async batchDDL(statements: string[]): Promise<void> {
      const prepared = statements
        .map((s) => s.trim())
        .filter(Boolean)
        .map((s) => d1.prepare(s));
      if (prepared.length > 0) {
        await d1.batch(prepared);
      }
    },
  };
}

let nodeSqliteInitPromise: Promise<unknown> | null = null;

async function getNodeSqliteDb() {
  if (!nodeSqliteInitPromise) {
    nodeSqliteInitPromise = (async () => {
      const modName = "node:sqlite";
      const pathName = "node:path";
      const fsName = "node:fs";
      const sqliteMod = (await import(/* webpackIgnore: true */ /* @vite-ignore */ modName)) as {
        DatabaseSync: new (path: string) => {
          prepare(sql: string): {
            all(...params: unknown[]): unknown[];
            get(...params: unknown[]): unknown;
            run(...params: unknown[]): { lastInsertRowid?: number | bigint; changes?: number | bigint };
          };
          exec(sql: string): void;
        };
      };
      const pathMod = (await import(/* webpackIgnore: true */ /* @vite-ignore */ pathName)) as typeof import("node:path");
      const fsMod = (await import(/* webpackIgnore: true */ /* @vite-ignore */ fsName)) as typeof import("node:fs");
      const dbPath = pathMod.resolve(process.cwd(), "prisma", "dev.db");
      fsMod.mkdirSync(pathMod.dirname(dbPath), { recursive: true });
      const instance = new sqliteMod.DatabaseSync(dbPath);
      instance.exec("PRAGMA foreign_keys = ON;");
      return instance;
    })();
  }
  return nodeSqliteInitPromise as Promise<{
    prepare(sql: string): {
      all(...params: unknown[]): unknown[];
      get(...params: unknown[]): unknown;
      run(...params: unknown[]): { lastInsertRowid?: number | bigint; changes?: number | bigint };
    };
    exec(sql: string): void;
  }>;
}

async function createNodeSqliteClient(): Promise<SqlClient> {
  const rawDb = await getNodeSqliteDb();
  return {
    engine: "node-sqlite",
    async queryAll<T>(sql: string, params: unknown[] = []): Promise<T[]> {
      return rawDb.prepare(sql).all(...(params as (string | number | null)[])) as T[];
    },
    async queryFirst<T>(sql: string, params: unknown[] = []): Promise<T | null> {
      const row = rawDb.prepare(sql).get(...(params as (string | number | null)[]));
      return (row as T | undefined) ?? null;
    },
    async execute(sql: string, params: unknown[] = []): Promise<{ lastRowId: number; changes: number }> {
      const info = rawDb.prepare(sql).run(...(params as (string | number | null)[]));
      return {
        lastRowId: Number(info.lastInsertRowid ?? 0),
        changes: Number(info.changes ?? 0),
      };
    },
    async batchDDL(statements: string[]): Promise<void> {
      for (const s of statements) {
        const trimmed = s.trim();
        if (trimmed) rawDb.exec(trimmed);
      }
    },
  };
}

// ─── Self-Healing Schema & Seed Bootstrap ────────────────────
const SCHEMA_DDL_STATEMENTS: string[] = [
  `CREATE TABLE IF NOT EXISTS "User" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "passwordHash" TEXT,
    "avatar" TEXT,
    "phone" TEXT,
    "institution" TEXT,
    "role" TEXT NOT NULL DEFAULT 'STUDENT',
    "provider" TEXT NOT NULL DEFAULT 'credentials',
    "providerId" TEXT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
  )`,
  `CREATE UNIQUE INDEX IF NOT EXISTS "User_email_key" ON "User"("email")`,
  `CREATE TABLE IF NOT EXISTS "Session" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "userId" INTEGER NOT NULL,
    "expiresAt" DATETIME NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "Session_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE CASCADE ON UPDATE CASCADE
  )`,
  `CREATE INDEX IF NOT EXISTS "Session_userId_idx" ON "Session"("userId")`,
  `CREATE INDEX IF NOT EXISTS "Session_expiresAt_idx" ON "Session"("expiresAt")`,
  `CREATE TABLE IF NOT EXISTS "TeachingApplication" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "userId" INTEGER NOT NULL,
    "fullName" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "phone" TEXT NOT NULL,
    "qualification" TEXT NOT NULL,
    "specialization" TEXT NOT NULL,
    "experience" TEXT NOT NULL,
    "motivation" TEXT NOT NULL,
    "resumeUrl" TEXT,
    "status" TEXT NOT NULL DEFAULT 'PENDING',
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "TeachingApplication_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE CASCADE ON UPDATE CASCADE
  )`,
  `CREATE INDEX IF NOT EXISTS "TeachingApplication_userId_status_idx" ON "TeachingApplication"("userId", "status")`,
  `CREATE TABLE IF NOT EXISTS "ProjectRequest" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "userId" INTEGER,
    "fullName" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "phone" TEXT NOT NULL,
    "track" TEXT NOT NULL,
    "domain" TEXT NOT NULL,
    "projectCode" TEXT,
    "title" TEXT NOT NULL,
    "requirements" TEXT NOT NULL,
    "status" TEXT NOT NULL DEFAULT 'SUBMITTED',
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "ProjectRequest_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE SET NULL ON UPDATE CASCADE
  )`,
  `CREATE INDEX IF NOT EXISTS "ProjectRequest_userId_idx" ON "ProjectRequest"("userId")`,
  `CREATE INDEX IF NOT EXISTS "ProjectRequest_email_idx" ON "ProjectRequest"("email")`,
  `CREATE INDEX IF NOT EXISTS "ProjectRequest_status_idx" ON "ProjectRequest"("status")`,
  `CREATE TABLE IF NOT EXISTS "ContactInquiry" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "phone" TEXT,
    "subject" TEXT NOT NULL,
    "message" TEXT NOT NULL,
    "status" TEXT NOT NULL DEFAULT 'PENDING',
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
  )`,
  `CREATE INDEX IF NOT EXISTS "ContactInquiry_email_idx" ON "ContactInquiry"("email")`,
  `CREATE INDEX IF NOT EXISTS "ContactInquiry_status_idx" ON "ContactInquiry"("status")`,
  `CREATE TABLE IF NOT EXISTS "Service" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "slug" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "shortDescription" TEXT NOT NULL,
    "fullDescription" TEXT NOT NULL,
    "icon" TEXT NOT NULL,
    "category" TEXT NOT NULL,
    "features" TEXT NOT NULL,
    "technologies" TEXT NOT NULL,
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
  )`,
  `CREATE UNIQUE INDEX IF NOT EXISTS "Service_slug_key" ON "Service"("slug")`,
  `CREATE TABLE IF NOT EXISTS "Project" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "category" TEXT NOT NULL,
    "technologies" TEXT NOT NULL,
    "status" TEXT NOT NULL DEFAULT 'In Development',
    "imageUrl" TEXT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
  )`,
  `CREATE TABLE IF NOT EXISTS "NewsArticle" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "title" TEXT NOT NULL,
    "excerpt" TEXT NOT NULL,
    "content" TEXT,
    "category" TEXT NOT NULL,
    "publishedAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
  )`,
];

// Precomputed PBKDF2-SHA256 hash for default demo account "test@ssair.in" / "test123"
const DEMO_USER_PBKDF2_HASH =
  "pbkdf2_sha256$100000$8479c426118b8ec271a8fcd098b30d5f$5c89b9110f93e362f1c42f00b48199f3070c870b09ea46778ffcd30f07eb9fa4";

let schemaVerifiedInIsolate = false;

async function ensureSchemaAndSeed(client: SqlClient): Promise<void> {
  if (schemaVerifiedInIsolate) return;

  try {
    // Fast-path check: verify tables already exist (applied via `cf d1 migrations apply`)
    const existing = await client.queryFirst<{ cnt: number }>(
      `SELECT count(*) AS cnt FROM sqlite_master WHERE type = 'table' AND name IN ('User', 'Session', 'TeachingApplication', 'ProjectRequest', 'ContactInquiry', 'Service')`
    );

    if (!existing || Number(existing.cnt) < 6) {
      await client.batchDDL(SCHEMA_DDL_STATEMENTS);
    }

    // Ensure User table has phone & institution columns if upgrading from older dev schema
    const userCols = await client.queryAll<{ name: string }>(`PRAGMA table_info("User")`);
    const colNames = new Set(userCols.map((c) => c.name));
    if (!colNames.has("phone")) {
      await client.execute(`ALTER TABLE "User" ADD COLUMN "phone" TEXT`).catch(() => {});
    }
    if (!colNames.has("institution")) {
      await client.execute(`ALTER TABLE "User" ADD COLUMN "institution" TEXT`).catch(() => {});
    }

    // Seed demo student account idempotently
    const demoUser = await client.queryFirst<{ id: number }>(
      `SELECT "id" FROM "User" WHERE "email" = ?`,
      ["test@ssair.in"]
    );
    if (!demoUser) {
      const now = new Date().toISOString();
      await client.execute(
        `INSERT INTO "User" ("name", "email", "passwordHash", "role", "provider", "createdAt", "updatedAt") VALUES (?, ?, ?, ?, ?, ?, ?)`,
        ["Test Student", "test@ssair.in", DEMO_USER_PBKDF2_HASH, "STUDENT", "credentials", now, now]
      );
    }

    // Seed Services table idempotently if empty
    const svcCount = await client.queryFirst<{ cnt: number }>(`SELECT count(*) AS cnt FROM "Service"`);
    if (!svcCount || Number(svcCount.cnt) === 0) {
      const now = new Date().toISOString();
      for (const s of STATIC_SERVICES) {
        await client.execute(
          `INSERT OR IGNORE INTO "Service" ("id", "slug", "title", "shortDescription", "fullDescription", "icon", "category", "features", "technologies", "isActive", "createdAt", "updatedAt") VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, 1, ?, ?)`,
          [
            s.number,
            s.slug,
            s.title,
            s.shortDescription,
            s.fullDescription,
            s.category,
            s.categoryName,
            JSON.stringify(s.features),
            JSON.stringify(s.technologies),
            now,
            now,
          ]
        );
      }
    }

    // Seed Projects table idempotently if empty
    const projCount = await client.queryFirst<{ cnt: number }>(`SELECT count(*) AS cnt FROM "Project"`);
    if (!projCount || Number(projCount.cnt) === 0) {
      const now = new Date().toISOString();
      for (let i = 0; i < CATALOG_ITEMS.length; i++) {
        const p = CATALOG_ITEMS[i];
        await client.execute(
          `INSERT OR IGNORE INTO "Project" ("id", "title", "description", "category", "technologies", "status", "imageUrl", "createdAt", "updatedAt") VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`,
          [i + 1, p.title, p.description, p.domain, JSON.stringify(p.technologies), p.status, p.imageUrl, now, now]
        );
      }
    }

    // Seed NewsArticle table idempotently if empty
    const newsCount = await client.queryFirst<{ cnt: number }>(`SELECT count(*) AS cnt FROM "NewsArticle"`);
    if (!newsCount || Number(newsCount.cnt) === 0) {
      const now = new Date().toISOString();
      for (let i = 0; i < RESEARCH_ARTICLES.length; i++) {
        const a = RESEARCH_ARTICLES[i];
        await client.execute(
          `INSERT OR IGNORE INTO "NewsArticle" ("id", "title", "excerpt", "content", "category", "publishedAt", "createdAt", "updatedAt") VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
          [i + 1, a.title, a.excerpt, a.fullText, a.category, now, now, now]
        );
      }
    }

    schemaVerifiedInIsolate = true;
  } catch (err) {
    console.error(JSON.stringify({ message: "ensureSchemaAndSeed failed", error: err instanceof Error ? err.message : String(err) }));
    throw err;
  }
}

export async function getDb(): Promise<SqlClient> {
  const cfEnv = await getCloudflareEnv();
  const client = cfEnv?.DB ? createD1Client(cfEnv.DB) : await createNodeSqliteClient();
  await ensureSchemaAndSeed(client);
  return client;
}

// ─── Typed Data Repositories ──────────────────────────────────
export const dbUsers = {
  async findByEmail(email: string): Promise<DbUser | null> {
    const db = await getDb();
    const row = await db.queryFirst<Record<string, unknown>>(
      `SELECT * FROM "User" WHERE "email" = ? LIMIT 1`,
      [email.toLowerCase().trim()]
    );
    return row ? mapUserRow(row) : null;
  },

  async findById(id: number): Promise<DbUser | null> {
    const db = await getDb();
    const row = await db.queryFirst<Record<string, unknown>>(
      `SELECT * FROM "User" WHERE "id" = ? LIMIT 1`,
      [id]
    );
    return row ? mapUserRow(row) : null;
  },

  async create(data: {
    name: string;
    email: string;
    passwordHash: string;
    phone?: string | null;
    institution?: string | null;
    provider?: string;
    role?: string;
  }): Promise<DbUser> {
    const db = await getDb();
    const now = new Date().toISOString();
    const res = await db.execute(
      `INSERT INTO "User" ("name", "email", "passwordHash", "phone", "institution", "role", "provider", "createdAt", "updatedAt") VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        data.name.trim(),
        data.email.toLowerCase().trim(),
        data.passwordHash,
        data.phone ? data.phone.trim() : null,
        data.institution ? data.institution.trim() : null,
        data.role || "STUDENT",
        data.provider || "credentials",
        now,
        now,
      ]
    );
    const created = await dbUsers.findById(res.lastRowId);
    if (!created) throw new Error("Failed to read created user");
    return created;
  },

  async updateProfile(
    userId: number,
    data: { name: string; phone?: string | null; institution?: string | null }
  ): Promise<DbUser | null> {
    const db = await getDb();
    const now = new Date().toISOString();
    await db.execute(
      `UPDATE "User" SET "name" = ?, "phone" = ?, "institution" = ?, "updatedAt" = ? WHERE "id" = ?`,
      [
        data.name.trim(),
        data.phone ? data.phone.trim() : null,
        data.institution ? data.institution.trim() : null,
        now,
        userId,
      ]
    );
    return dbUsers.findById(userId);
  },

  async updatePasswordHash(userId: number, passwordHash: string): Promise<void> {
    const db = await getDb();
    const now = new Date().toISOString();
    await db.execute(
      `UPDATE "User" SET "passwordHash" = ?, "updatedAt" = ? WHERE "id" = ?`,
      [passwordHash, now, userId]
    );
  },
};

export const dbSessions = {
  async create(id: string, userId: number, expiresAt: Date): Promise<DbSession> {
    const db = await getDb();
    const now = new Date().toISOString();
    const expIso = expiresAt.toISOString();
    await db.execute(
      `INSERT INTO "Session" ("id", "userId", "expiresAt", "createdAt") VALUES (?, ?, ?, ?)`,
      [id, userId, expIso, now]
    );
    return { id, userId, expiresAt: expIso, createdAt: now };
  },

  async findById(id: string): Promise<DbSession | null> {
    const db = await getDb();
    const row = await db.queryFirst<Record<string, unknown>>(
      `SELECT * FROM "Session" WHERE "id" = ? LIMIT 1`,
      [id]
    );
    if (!row) return null;
    return {
      id: String(row.id),
      userId: Number(row.userId),
      expiresAt: toIsoString(row.expiresAt),
      createdAt: toIsoString(row.createdAt),
    };
  },

  async deleteById(id: string): Promise<void> {
    const db = await getDb();
    await db.execute(`DELETE FROM "Session" WHERE "id" = ?`, [id]);
  },

  async pruneExpiredForUser(userId: number): Promise<void> {
    const db = await getDb();
    const nowIso = new Date().toISOString();
    await db.execute(
      `DELETE FROM "Session" WHERE "userId" = ? AND "expiresAt" < ?`,
      [userId, nowIso]
    ).catch(() => {});
  },
};

export const dbTeachingApps = {
  async findByUserId(userId: number): Promise<DbTeachingApplication[]> {
    const db = await getDb();
    const rows = await db.queryAll<Record<string, unknown>>(
      `SELECT * FROM "TeachingApplication" WHERE "userId" = ? ORDER BY "createdAt" DESC`,
      [userId]
    );
    return rows.map(mapTeachingApp);
  },

  async findActiveByUserId(userId: number): Promise<DbTeachingApplication | null> {
    const db = await getDb();
    const row = await db.queryFirst<Record<string, unknown>>(
      `SELECT * FROM "TeachingApplication" WHERE "userId" = ? AND "status" IN ('PENDING', 'REVIEWING') LIMIT 1`,
      [userId]
    );
    return row ? mapTeachingApp(row) : null;
  },

  async create(data: {
    userId: number;
    fullName: string;
    email: string;
    phone: string;
    qualification: string;
    specialization: string;
    experience: string;
    motivation: string;
  }): Promise<DbTeachingApplication> {
    const db = await getDb();
    const now = new Date().toISOString();
    const res = await db.execute(
      `INSERT INTO "TeachingApplication" ("userId", "fullName", "email", "phone", "qualification", "specialization", "experience", "motivation", "status", "createdAt", "updatedAt") VALUES (?, ?, ?, ?, ?, ?, ?, ?, 'PENDING', ?, ?)`,
      [
        data.userId,
        data.fullName.trim(),
        data.email.trim().toLowerCase(),
        data.phone.trim(),
        data.qualification.trim(),
        data.specialization.trim(),
        data.experience.trim(),
        data.motivation.trim(),
        now,
        now,
      ]
    );
    const created = await db.queryFirst<Record<string, unknown>>(
      `SELECT * FROM "TeachingApplication" WHERE "id" = ?`,
      [res.lastRowId]
    );
    if (!created) throw new Error("Failed to read created teaching application");
    return mapTeachingApp(created);
  },

  async updatePending(
    id: number,
    userId: number,
    data: { phone?: string; qualification?: string; specialization?: string; experience?: string; motivation?: string }
  ): Promise<DbTeachingApplication | null> {
    const db = await getDb();
    const existing = await db.queryFirst<Record<string, unknown>>(
      `SELECT * FROM "TeachingApplication" WHERE "id" = ? AND "userId" = ?`,
      [id, userId]
    );
    if (!existing || existing.status !== "PENDING") return null;
    const now = new Date().toISOString();
    await db.execute(
      `UPDATE "TeachingApplication" SET "phone" = ?, "qualification" = ?, "specialization" = ?, "experience" = ?, "motivation" = ?, "updatedAt" = ? WHERE "id" = ? AND "userId" = ?`,
      [
        (data.phone ?? String(existing.phone)).trim(),
        (data.qualification ?? String(existing.qualification)).trim(),
        (data.specialization ?? String(existing.specialization)).trim(),
        (data.experience ?? String(existing.experience)).trim(),
        (data.motivation ?? String(existing.motivation)).trim(),
        now,
        id,
        userId,
      ]
    );
    const updated = await db.queryFirst<Record<string, unknown>>(
      `SELECT * FROM "TeachingApplication" WHERE "id" = ?`,
      [id]
    );
    return updated ? mapTeachingApp(updated) : null;
  },

  async deletePending(id: number, userId: number): Promise<boolean> {
    const db = await getDb();
    const res = await db.execute(
      `DELETE FROM "TeachingApplication" WHERE "id" = ? AND "userId" = ? AND "status" = 'PENDING'`,
      [id, userId]
    );
    return res.changes > 0;
  },
};

export const dbProjectRequests = {
  async findByUserOrEmail(userId: number, email: string): Promise<DbProjectRequest[]> {
    const db = await getDb();
    const rows = await db.queryAll<Record<string, unknown>>(
      `SELECT * FROM "ProjectRequest" WHERE "userId" = ? OR "email" = ? ORDER BY "createdAt" DESC`,
      [userId, email.toLowerCase().trim()]
    );
    return rows.map(mapProjectRequest);
  },

  async create(data: {
    userId: number | null;
    fullName: string;
    email: string;
    phone: string;
    track: string;
    domain: string;
    projectCode: string | null;
    title: string;
    requirements: string;
  }): Promise<DbProjectRequest> {
    const db = await getDb();
    const now = new Date().toISOString();
    const res = await db.execute(
      `INSERT INTO "ProjectRequest" ("userId", "fullName", "email", "phone", "track", "domain", "projectCode", "title", "requirements", "status", "createdAt", "updatedAt") VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, 'SUBMITTED', ?, ?)`,
      [
        data.userId,
        data.fullName.trim(),
        data.email.trim().toLowerCase(),
        data.phone.trim(),
        data.track.trim(),
        data.domain.trim(),
        data.projectCode ? data.projectCode.trim() : null,
        data.title.trim(),
        data.requirements.trim(),
        now,
        now,
      ]
    );
    const created = await db.queryFirst<Record<string, unknown>>(
      `SELECT * FROM "ProjectRequest" WHERE "id" = ?`,
      [res.lastRowId]
    );
    if (!created) throw new Error("Failed to read created project request");
    return mapProjectRequest(created);
  },

  async deleteSubmitted(id: number, userId: number, email: string): Promise<boolean> {
    const db = await getDb();
    const res = await db.execute(
      `DELETE FROM "ProjectRequest" WHERE "id" = ? AND ("userId" = ? OR "email" = ?) AND "status" = 'SUBMITTED'`,
      [id, userId, email.toLowerCase().trim()]
    );
    return res.changes > 0;
  },
};

export const dbContactInquiries = {
  async create(data: {
    name: string;
    email: string;
    phone: string | null;
    subject: string;
    message: string;
  }): Promise<DbContactInquiry> {
    const db = await getDb();
    const now = new Date().toISOString();
    const res = await db.execute(
      `INSERT INTO "ContactInquiry" ("name", "email", "phone", "subject", "message", "status", "createdAt", "updatedAt") VALUES (?, ?, ?, ?, ?, 'PENDING', ?, ?)`,
      [
        data.name.trim(),
        data.email.trim().toLowerCase(),
        data.phone ? data.phone.trim() : null,
        data.subject.trim() || "General Inquiry",
        data.message.trim(),
        now,
        now,
      ]
    );
    const created = await db.queryFirst<Record<string, unknown>>(
      `SELECT * FROM "ContactInquiry" WHERE "id" = ?`,
      [res.lastRowId]
    );
    if (!created) throw new Error("Failed to read created contact inquiry");
    return mapContactInquiry(created);
  },

  async findByEmail(email: string): Promise<DbContactInquiry[]> {
    const db = await getDb();
    const rows = await db.queryAll<Record<string, unknown>>(
      `SELECT * FROM "ContactInquiry" WHERE "email" = ? ORDER BY "createdAt" DESC`,
      [email.toLowerCase().trim()]
    );
    return rows.map(mapContactInquiry);
  },
};

export const dbCatalog = {
  async listServices(): Promise<DbServiceRow[]> {
    const db = await getDb();
    return db.queryAll<DbServiceRow>(`SELECT * FROM "Service" WHERE "isActive" = 1 ORDER BY "id" ASC`);
  },

  async listNewsArticles(category?: string): Promise<DbNewsArticleRow[]> {
    const db = await getDb();
    if (category && category !== "all") {
      return db.queryAll<DbNewsArticleRow>(
        `SELECT * FROM "NewsArticle" WHERE LOWER("category") = LOWER(?) ORDER BY "id" ASC`,
        [category]
      );
    }
    return db.queryAll<DbNewsArticleRow>(`SELECT * FROM "NewsArticle" ORDER BY "id" ASC`);
  },

  async getHealthSnapshot() {
    const db = await getDb();
    const [u, s, p, n, c, t, pr] = await Promise.all([
      db.queryFirst<{ cnt: number }>(`SELECT count(*) AS cnt FROM "User"`),
      db.queryFirst<{ cnt: number }>(`SELECT count(*) AS cnt FROM "Service"`),
      db.queryFirst<{ cnt: number }>(`SELECT count(*) AS cnt FROM "Project"`),
      db.queryFirst<{ cnt: number }>(`SELECT count(*) AS cnt FROM "NewsArticle"`),
      db.queryFirst<{ cnt: number }>(`SELECT count(*) AS cnt FROM "ContactInquiry"`),
      db.queryFirst<{ cnt: number }>(`SELECT count(*) AS cnt FROM "TeachingApplication"`),
      db.queryFirst<{ cnt: number }>(`SELECT count(*) AS cnt FROM "ProjectRequest"`),
    ]);
    return {
      engine: db.engine,
      counts: {
        users: Number(u?.cnt ?? 0),
        services: Number(s?.cnt ?? 0),
        projects: Number(p?.cnt ?? 0),
        newsArticles: Number(n?.cnt ?? 0),
        contactInquiries: Number(c?.cnt ?? 0),
        teachingApplications: Number(t?.cnt ?? 0),
        projectRequests: Number(pr?.cnt ?? 0),
      },
    };
  },
};
