export type ClassValue =
  | string
  | number
  | boolean
  | undefined
  | null
  | ClassValue[];

/**
 * Combines Tailwind CSS class names (manual implementation without clsx — just filter and join).
 */
export function cn(...inputs: ClassValue[]): string {
  const result: string[] = [];

  const extract = (val: unknown): void => {
    if (!val) return;
    if (Array.isArray(val)) {
      val.forEach(extract);
    } else if (typeof val === "string") {
      const trimmed = val.trim();
      if (trimmed) result.push(trimmed);
    } else if (typeof val === "number") {
      result.push(String(val));
    }
  };

  inputs.forEach(extract);
  return result.join(" ");
}

/**
 * Formats a Date object, timestamp, or date string into a localized readable date.
 */
export function formatDate(
  date: Date | string | number,
  options?: Intl.DateTimeFormatOptions
): string {
  const d = typeof date === "object" ? date : new Date(date);
  if (isNaN(d.getTime())) return "";
  return d.toLocaleDateString(
    "en-US",
    options || {
      month: "short",
      day: "numeric",
      year: "numeric",
    }
  );
}

/**
 * Truncates text to a specified maximum length, appending an ellipsis if truncated.
 */
export function truncateText(
  text: string,
  maxLength: number,
  ellipsis: string = "..."
): string {
  if (!text) return "";
  if (text.length <= maxLength) return text;
  return text.slice(0, maxLength) + ellipsis;
}

/**
 * Converts a string into a URL-friendly slug.
 */
export function slugify(text: string): string {
  if (!text) return "";
  return text
    .toString()
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, "")
    .replace(/[\s_-]+/g, "-")
    .replace(/^-+|-+$/g, "");
}
