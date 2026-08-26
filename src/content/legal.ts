import fs from 'node:fs';
import path from 'node:path';
import { CONTACT } from '@/content/site';

// Legal documents (build spec 3.6). The square-bracket placeholders in the
// markdown are company details that have not been supplied yet; they are left
// visible so they are obvious before launch. Do not invent values.
export const LEGAL_LAST_UPDATED = '[DATE]';

/** Read a legal document and keep its inline contact address in sync with the
 *  CONTACT constant, so the email changes in one place. */
export function getLegalDocument(slug: 'privacy' | 'terms'): string {
  const raw = fs.readFileSync(path.join(process.cwd(), 'content', 'legal', `${slug}.md`), 'utf8');
  return raw.replaceAll('hello@baggyandbrim.com', CONTACT.email);
}
