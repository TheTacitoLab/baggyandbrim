import { z } from 'zod';
import { HAT_TYPES } from '@/content/site';
import { daysUntil } from '@/lib/utils';

// One Zod schema, imported by both the client component and the server route
// (build spec Section 15.4). Client validation is a convenience; the server is
// the authority. Written for Zod 4.

export const VOLUME_VALUES = ['12–24', '25–49', '50–100', '100+'] as const;

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const PHONE_RE = /^[+]?[0-9\s().-]{7,30}$/;

export function isFutureDate(iso: string): boolean {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(iso)) return false;
  return daysUntil(iso) >= 0;
}

export function isWithinThreeYears(iso: string): boolean {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(iso)) return false;
  return daysUntil(iso) <= 366 * 3;
}

export function isUrgentDate(iso: string): boolean {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(iso)) return false;
  const days = daysUntil(iso);
  return days >= 0 && days < 14;
}

export const enquirySchema = z.object({
  fullName: z.string().trim().min(2, 'Enter your full name').max(100),
  email: z
    .string()
    .trim()
    .min(1, 'Enter your email address')
    .max(254)
    .regex(EMAIL_RE, 'Enter a valid email address'),
  phone: z
    .string()
    .trim()
    .min(7, 'Enter a phone number we can reach you on')
    .max(30)
    .regex(PHONE_RE, 'Enter a phone number using digits, spaces and + only'),
  organisation: z.string().trim().max(120).optional(),
  hatTypes: z.array(z.enum(HAT_TYPES)).min(1, 'Choose at least one type of headwear'),
  volume: z.enum(VOLUME_VALUES, { error: 'Choose a quantity bracket' }),
  targetDate: z
    .string()
    .refine(isFutureDate, 'Choose a date in the future')
    .refine(isWithinThreeYears, 'Check the year on that date'),
  message: z.string().trim().max(2000).optional(),
  consent: z.literal(true, { error: 'Tick the box so we can respond to your enquiry' }),
  botcheck: z.string().max(0).optional(),
});

export type EnquiryInput = z.infer<typeof enquirySchema>;

/** Flatten a Zod error into a field → first-message record. */
export function fieldErrors(error: z.ZodError): Record<string, string> {
  const result: Record<string, string> = {};
  for (const issue of error.issues) {
    const key = issue.path[0];
    if (typeof key === 'string' && !(key in result)) {
      result[key] = issue.message;
    }
  }
  return result;
}
