import { z } from 'zod';

// Environment access is centralised here (build spec Section 31). No other module
// reads process.env directly. Each NEXT_PUBLIC_ var is referenced statically so
// Next.js can inline it into the client bundle. Nothing throws at import time:
// a missing WEB3FORMS_ACCESS_KEY must not fail the build, so the enquiry route can
// return a clean 500 at runtime and preview deployments still render (Section 15.5).

const clean = (v: string | undefined): string | undefined =>
  v && v.trim().length > 0 ? v.trim() : undefined;

const schema = z.object({
  NEXT_PUBLIC_SITE_URL: z.string().url().default('https://baggyandbrim.com'),
  NEXT_PUBLIC_GA_ID: z.string().optional(),
  NEXT_PUBLIC_GSC_VERIFICATION: z.string().optional(),
  NEXT_PUBLIC_ENABLE_CONSENT_BANNER: z.string().optional(),
  WEB3FORMS_ACCESS_KEY: z.string().optional(),
  ENQUIRY_NOTIFICATION_EMAIL: z.string().optional(),
  VERCEL_ENV: z.string().optional(),
});

const raw = {
  NEXT_PUBLIC_SITE_URL: clean(process.env.NEXT_PUBLIC_SITE_URL),
  NEXT_PUBLIC_GA_ID: clean(process.env.NEXT_PUBLIC_GA_ID),
  NEXT_PUBLIC_GSC_VERIFICATION: clean(process.env.NEXT_PUBLIC_GSC_VERIFICATION),
  NEXT_PUBLIC_ENABLE_CONSENT_BANNER: clean(process.env.NEXT_PUBLIC_ENABLE_CONSENT_BANNER),
  WEB3FORMS_ACCESS_KEY: clean(process.env.WEB3FORMS_ACCESS_KEY),
  ENQUIRY_NOTIFICATION_EMAIL: clean(process.env.ENQUIRY_NOTIFICATION_EMAIL),
  VERCEL_ENV: clean(process.env.VERCEL_ENV),
};

const parsed = schema.safeParse(raw);
const values = parsed.success
  ? parsed.data
  : { NEXT_PUBLIC_SITE_URL: 'https://baggyandbrim.com' as const };

const siteUrl = (values.NEXT_PUBLIC_SITE_URL ?? 'https://baggyandbrim.com').replace(/\/$/, '');

export const env = {
  siteUrl,
  gaId: values.NEXT_PUBLIC_GA_ID,
  gscVerification: values.NEXT_PUBLIC_GSC_VERIFICATION,
  consentBannerEnabled: values.NEXT_PUBLIC_ENABLE_CONSENT_BANNER === 'true',
  web3formsKey: values.WEB3FORMS_ACCESS_KEY,
  enquiryEmail: values.ENQUIRY_NOTIFICATION_EMAIL,
  vercelEnv: values.VERCEL_ENV,
  // Only Vercel production is indexable. Every other environment — preview,
  // and local — is noindex, guarding against the single most common avoidable
  // SEO failure: a preview deployment indexing before launch (Section 18.2).
  shouldIndex: values.VERCEL_ENV === 'production',
} as const;
