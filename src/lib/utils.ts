import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

/** Merge Tailwind classes with conflict resolution. */
export function cn(...inputs: ClassValue[]): string {
  return twMerge(clsx(inputs));
}

/** '24 July 2026' — en-GB, UTC to avoid shifting a date-only ISO string. */
export function formatDate(iso: string): string {
  return new Intl.DateTimeFormat('en-GB', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
    timeZone: 'UTC',
  }).format(new Date(`${iso}T00:00:00Z`));
}

/** 'Friday 24 July 2026' — used in the enquiry email body (Section 15.5). */
export function formatDateLong(iso: string): string {
  return new Intl.DateTimeFormat('en-GB', {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
    year: 'numeric',
    timeZone: 'UTC',
  }).format(new Date(`${iso}T00:00:00Z`));
}

/** Lowercase, hyphenated slug. */
export function slugify(input: string): string {
  return input
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/[\s-]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

/** Reading time in minutes at 220 words per minute, minimum 1 (Section 14.2). */
export function readingTime(text: string): number {
  const words = text.trim().split(/\s+/).filter(Boolean).length;
  return Math.max(1, Math.round(words / 220));
}

/** 'a:b' → 'a / b' for CSS aspect-ratio. Returns undefined for 'hidden'. */
export function aspectToCss(value: string): string | undefined {
  if (value === 'hidden') return undefined;
  const [w, h] = value.split(':');
  return `${w} / ${h}`;
}

/** Whole days from today (UTC) to a YYYY-MM-DD date. Negative if in the past. */
export function daysUntil(iso: string, from: Date = new Date()): number {
  const target = new Date(`${iso}T00:00:00Z`).getTime();
  const start = Date.UTC(from.getUTCFullYear(), from.getUTCMonth(), from.getUTCDate());
  return Math.round((target - start) / 86_400_000);
}
