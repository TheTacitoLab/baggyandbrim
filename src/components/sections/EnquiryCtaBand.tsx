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
      <div className="shell section-pad flex flex-col items-start gap-6 md:items-center md:text-center">
        <h2 id={labelledById} className="type-heading-l max-w-[20ch]">
          {heading}
        </h2>
        <p className="type-body-l max-w-[48ch] text-on-surface-secondary">{line}</p>
        <CtaLink
          href="/enquire"
          event="cta_section_click"
          params={{ section }}
          className="btn btn-primary"
        >
          Start Your Cap Brief
        </CtaLink>
      </div>
    </section>
  );
}
