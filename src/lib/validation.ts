export const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function isValidEmail(email: unknown): email is string {
  return typeof email === "string" && email.trim().length <= 254 && EMAIL_REGEX.test(email.trim());
}

export function cleanText(value: unknown, maxLength = 2000): string {
  if (typeof value !== "string") return "";
  return value.trim().slice(0, maxLength);
}

export async function parseJsonBody<T = Record<string, unknown>>(
  request: Request
): Promise<{ ok: true; data: T } | { ok: false; error: string }> {
  try {
    const raw = await request.json();
    if (!raw || typeof raw !== "object" || Array.isArray(raw)) {
      return { ok: false, error: "Invalid JSON payload object" };
    }
    return { ok: true, data: raw as T };
  } catch {
    return { ok: false, error: "Malformed JSON request body" };
  }
}

export function logStructured(
  level: "info" | "warn" | "error",
  event: string,
  meta: Record<string, unknown> = {}
) {
  const entry = JSON.stringify({
    level,
    event,
    timestamp: new Date().toISOString(),
    ...meta,
  });
  if (level === "error") {
    console.error(entry);
  } else if (level === "warn") {
    console.warn(entry);
  } else {
    console.log(entry);
  }
}
