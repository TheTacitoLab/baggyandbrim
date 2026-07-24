import { CtaLink } from '@/components/ui/CtaLink';

interface EnquiryCtaBandProps {
  heading: string;
  line: string;
  section: string; // analytics attribution
  labelledById?: string;
}

/**
 * The ink enquiry CTA that closes commercial, journal and article pages
 * (build spec 13.1 step 12). The full form appears only on / and /enquire, so
 * these pages stay fast and form analytics stay concentrated.
 */
export function EnquiryCtaBand({ heading, line, section, labelledById = 'enquiry-cta-heading' }: EnquiryCtaBandProps) {
  return (
    <section
      data-surface="ink"
      data-enquiry-anchor
      aria-labelledby={labelledById}
      className="bg-ink text-paper"
    >
      <div className="shell section-pad">
        <div className="mx-auto flex max-w-[52ch] flex-col items-center gap-6 text-center">
          <h2 id={labelledById} className="type-heading-l">
            {heading}
          </h2>
          <p className="type-body-l text-on-surface-secondary">{line}</p>
          <CtaLink
            href="/enquire"
            event="cta_section_click"
            params={{ section }}
            className="btn btn-primary"
          >
            Start Your Cap Brief
          </CtaLink>
        </div>
      </div>
    </section>
  );
}
