import Link from 'next/link';
import { COMMERCIAL_LINKS, EXPLORE_LINKS } from '@/content/navigation';
import { COMPANY, CONTACT, SITE } from '@/content/site';
import { Wordmark } from './Wordmark';

function ContactValue({ label, value, href }: { label: string; value: string | null; href?: string }) {
  return (
    <li className="flex flex-col gap-0.5">
      <span className="type-label text-on-surface-secondary">{label}</span>
      {value && href ? (
        <Link href={href} className="type-body">
          {value}
        </Link>
      ) : (
        // Placeholders render as plain 'Coming soon' text — never broken links or
        // invented handles (build spec Section 12, 10.5).
        <span className="type-body text-on-surface-secondary">Coming soon</span>
      )}
    </li>
  );
}

/** Structured multi-column ledger footer. Site-wide crawlable links to every
 *  commercial page and the Journal from every page (build spec Section 12). */
export function SiteFooter() {
  return (
    <footer data-surface="ink" className="bg-ink text-paper">
      <div className="shell section-pad">
        {/* Hairline dividing the enquiry section from the footer on the homepage. */}
        <div aria-hidden="true" className="mb-16 h-px w-full bg-[color:var(--colour-rule-inverse)]" />

        <div className="grid grid-cols-2 gap-x-8 gap-y-12 md:grid-cols-4">
          <div className="col-span-2 flex flex-col gap-4 md:col-span-1">
            <Wordmark href="/" size="md" />
            <p className="type-label text-on-surface-secondary">{SITE.tagline}</p>
            <p className="type-body-s max-w-[34ch] text-on-surface-secondary">
              {SITE.descriptionLong}
            </p>
          </div>

          <nav aria-label="Headwear" className="flex flex-col gap-3">
            <h2 className="type-label text-on-surface-secondary">Headwear</h2>
            <ul className="flex flex-col gap-2">
              {COMMERCIAL_LINKS.map((item) => (
                <li key={item.href}>
                  <Link href={item.href} className="type-body transition-opacity hover:opacity-70">
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <nav aria-label="Explore" className="flex flex-col gap-3">
            <h2 className="type-label text-on-surface-secondary">Explore</h2>
            <ul className="flex flex-col gap-2">
              {EXPLORE_LINKS.map((item) => (
                <li key={item.href}>
                  <Link href={item.href} className="type-body transition-opacity hover:opacity-70">
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div className="flex flex-col gap-3">
            <h2 className="type-label text-on-surface-secondary">Contact</h2>
            <ul className="flex flex-col gap-3">
              <ContactValue
                label="Email"
                value={CONTACT.email}
                href={CONTACT.email ? `mailto:${CONTACT.email}` : undefined}
              />
              <ContactValue
                label="Instagram"
                value={CONTACT.instagram}
                href={CONTACT.instagram ?? undefined}
              />
              <ContactValue
                label="LinkedIn"
                value={CONTACT.linkedin}
                href={CONTACT.linkedin ?? undefined}
              />
            </ul>
          </div>
        </div>

        {/* The sign-off: the wordmark stays large. */}
        <div className="mt-20">
          <Wordmark as="div" size="lg" className="w-full" />
          <p className="type-label mt-3 text-on-surface-secondary">{SITE.tagline}</p>
        </div>

        <div className="mt-16 h-px w-full bg-[color:var(--colour-rule-inverse)]" />
        <div className="mt-6 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <p className="type-body-s text-on-surface-secondary">
            © {COMPANY.copyrightYear} {SITE.name}.
            {COMPANY.registeredDetails ? ` ${COMPANY.registeredDetails}` : ''}
          </p>
          <ul className="flex items-center gap-6">
            <li>
              <Link href="/privacy" className="type-body-s transition-opacity hover:opacity-70">
                Privacy
              </Link>
            </li>
            <li>
              <Link href="/terms" className="type-body-s transition-opacity hover:opacity-70">
                Terms
              </Link>
            </li>
            <li>
              <span className="type-body-s text-on-surface-secondary">{SITE.domain}</span>
            </li>
          </ul>
        </div>
      </div>
    </footer>
  );
}
