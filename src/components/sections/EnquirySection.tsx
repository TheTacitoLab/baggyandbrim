import { HOMEPAGE } from '@/content/homepage';
import { SectionLabel } from '@/components/ui/SectionLabel';
import { ScorebookRule } from '@/components/ui/ScorebookRule';
import { EnquiryForm } from '@/components/form/EnquiryForm';
import { Reveal } from '@/components/ui/Reveal';

const { enquiry } = HOMEPAGE;

/** Section 11. The conversion point. First fully dark section; the contrast
 *  change signals arrival. Copy left, form right. */
export function EnquirySection() {
  return (
    <section
      id="enquire"
      data-surface="ink"
      data-enquiry-anchor
      aria-labelledby="enquire-heading"
      tabIndex={-1}
      className="bg-ink text-paper outline-none"
    >
      <div className="shell section-pad grid grid-cols-1 gap-x-8 gap-y-12 lg:grid-cols-12">
        <div className="lg:col-span-5">
          <SectionLabel number={enquiry.number}>{enquiry.label}</SectionLabel>
          <Reveal>
            <h2 id="enquire-heading" className="type-heading-l mt-5">
              {enquiry.heading}
            </h2>
          </Reveal>
          <div className="mt-6 flex flex-col gap-4">
            {enquiry.supporting.map((paragraph, index) => (
              <p key={index} className="type-body max-w-[42ch] text-on-surface-secondary">
                {paragraph}
              </p>
            ))}
          </div>
          <ul className="mt-10">
            {enquiry.reassurance.map((item) => (
              <li key={item}>
                <ScorebookRule />
                <p className="type-body-s py-4">{item}</p>
              </li>
            ))}
            <ScorebookRule />
          </ul>
        </div>

        <div className="lg:col-span-6 lg:col-start-7">
          <EnquiryForm source="homepage" />
        </div>
      </div>
    </section>
  );
}
