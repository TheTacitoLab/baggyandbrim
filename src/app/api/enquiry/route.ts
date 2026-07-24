import type { NextRequest } from 'next/server';
import { enquirySchema, fieldErrors, isUrgentDate } from '@/lib/validation/enquiry';
import { env } from '@/lib/env';
import { formatDateLong } from '@/lib/utils';
import type { EnquiryResponse } from '@/types';

// Route handler, not a Server Action, for cleaner control over rate limiting,
// status codes and third-party error handling (build spec Section 15.5).

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

// Simple in-memory rate limit: 5 submissions per IP per 10 minutes. Resets on
// deploy, which is adequate for the expected volume. Not a security control.
const WINDOW_MS = 10 * 60 * 1000;
const MAX_PER_WINDOW = 5;
const hits = new Map<string, number[]>();

function rateLimited(ip: string): boolean {
  const now = Date.now();
  const recent = (hits.get(ip) ?? []).filter((t) => now - t < WINDOW_MS);
  recent.push(now);
  hits.set(ip, recent);
  return recent.length > MAX_PER_WINDOW;
}

function json(body: EnquiryResponse, status: number) {
  return Response.json(body, { status });
}

export async function POST(request: NextRequest) {
  let payload: unknown;
  try {
    payload = await request.json();
  } catch {
    return json({ ok: false, kind: 'validation', errors: { form: 'Invalid request.' } }, 400);
  }

  // Honeypot: any value in botcheck is a bot. Return success without forwarding.
  if (payload && typeof payload === 'object' && 'botcheck' in payload) {
    const bot = (payload as { botcheck?: unknown }).botcheck;
    if (typeof bot === 'string' && bot.length > 0) {
      return json({ ok: true }, 200);
    }
  }

  const ip = request.headers.get('x-forwarded-for')?.split(',')[0]?.trim() || 'unknown';
  if (rateLimited(ip)) {
    return json(
      {
        ok: false,
        kind: 'rate-limit',
        message: 'That is a few briefs in quick succession. Give it ten minutes, or email us directly.',
      },
      429,
    );
  }

  const parsed = enquirySchema.safeParse(payload);
  if (!parsed.success) {
    return json({ ok: false, kind: 'validation', errors: fieldErrors(parsed.error) }, 400);
  }
  const data = parsed.data;

  // The access key is never exposed to the browser. A missing key is a config
  // error at runtime, not a build failure, so previews still render.
  if (!env.web3formsKey) {
    console.error('Enquiry route: WEB3FORMS_ACCESS_KEY is not configured.');
    return json(
      { ok: false, kind: 'config', message: 'The enquiry form is not fully configured yet.' },
      500,
    );
  }

  const subject = `New cap brief: ${data.organisation || data.fullName}, ${data.volume} caps, ${data.hatTypes.join(', ')}`;

  const lines = [
    `Full name: ${data.fullName}`,
    `Email: ${data.email}`,
    `Phone: ${data.phone}`,
    `Club or organisation: ${data.organisation || 'Not given'}`,
    `Hat type: ${data.hatTypes.join(', ')}`,
    `Volume required: ${data.volume} caps`,
    `Target delivery date: ${formatDateLong(data.targetDate)}`,
    `Anything else: ${data.message || 'Not given'}`,
  ];
  if (isUrgentDate(data.targetDate)) {
    lines.push('', 'Requested date is within 14 days');
  }

  const web3Payload = {
    access_key: env.web3formsKey,
    subject,
    from_name: data.fullName,
    replyto: data.email,
    ...(env.enquiryEmail ? { to: env.enquiryEmail } : {}),
    message: lines.join('\n'),
  };

  try {
    const res = await fetch('https://api.web3forms.com/submit', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
      body: JSON.stringify(web3Payload),
      signal: AbortSignal.timeout(10_000),
    });

    if (res.ok) {
      const result = (await res.json().catch(() => ({}))) as { success?: boolean };
      if (result.success) return json({ ok: true }, 200);
    }
    // Log status only, never personal data.
    console.error(`Enquiry route: Web3Forms responded with status ${res.status}.`);
  } catch (error) {
    console.error('Enquiry route: Web3Forms request failed or timed out.', (error as Error).name);
  }

  return json(
    {
      ok: false,
      kind: 'upstream',
      message: 'That did not send. Check your connection and try again.',
    },
    502,
  );
}
