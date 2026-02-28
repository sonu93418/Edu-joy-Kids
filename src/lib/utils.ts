import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * Safely parse a fetch Response as JSON.
 *
 * Reads the body as text first, so it never throws a raw JSON.parse error
 * even when the server returns "Internal Server Error" (plain text) with
 * a Content-Type: application/json header, which happens when Next.js or
 * Express encounters an error after setting the header.
 */
export async function safeJson<T = unknown>(res: Response): Promise<T> {
  let text = "";
  try {
    text = await res.text();
  } catch {
    throw new Error(`Server error ${res.status}: could not read response body`);
  }

  // Try JSON first regardless of content-type header
  try {
    return JSON.parse(text) as T;
  } catch {
    // Not valid JSON — surface a human-readable message
    const trimmed = text.trim();
    throw new Error(
      trimmed.length > 0 && trimmed.length < 300
        ? trimmed
        : `Server error ${res.status}: ${res.statusText || "Unexpected response format"}`,
    );
  }
}

export function formatXP(xp: number): string {
  if (xp >= 1000) return `${(xp / 1000).toFixed(1)}K`;
  return String(xp);
}

export function formatDate(date: Date | string): string {
  return new Date(date).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

export function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/\s+/g, "-")
    .replace(/[^\w-]/g, "");
}

export function getGradeLabel(grade: string): string {
  const labels: Record<string, string> = {
    playgroup: "Play Group",
    nursery: "Nursery",
    kg: "Kindergarten",
    class1: "Class 1",
    class2: "Class 2",
    class3: "Class 3",
    class4: "Class 4",
    class5: "Class 5",
  };
  return labels[grade] ?? grade;
}
