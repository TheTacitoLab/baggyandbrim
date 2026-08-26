import { HOMEPAGE } from '@/content/homepage';
import { EnquiryForm } from '@/components/form/EnquiryForm';
import { ScorebookRule } from '@/components/ui/ScorebookRule';
import { Reveal } from '@/components/ui/Reveal';

const { enquiry } = HOMEPAGE;

/**
 * Enquiry (surface: ink). The conversion point and the last ink block, read as
 * one continuous dark passage with the footer. Heading and supporting copy sit
 * left of the section with the form on the right; the two stack on mobile,
 * copy first.
 */
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
      <div className="shell section-pad">
        <div className="grid grid-cols-1 gap-x-8 gap-y-12 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <Reveal>
              <h2 id="enquire-heading" className="type-heading-l max-w-[14ch]">
                {enquiry.heading}
              </h2>
            </Reveal>
            <div className="mt-4 flex max-w-[42ch] flex-col gap-4 md:mt-6">
              {enquiry.supporting.map((paragraph, index) => (
                <p key={index} className="type-body-l text-on-surface-secondary">
                  {paragraph}
                </p>
              ))}
            </div>
            <ul className="mt-10 max-w-[42ch]">
              {enquiry.reassurance.map((item) => (
                <li key={item}>
                  <ScorebookRule />
                  <p className="type-body-s py-4">{item}</p>
                </li>
              ))}
              <li aria-hidden="true">
                <ScorebookRule />
              </li>
            </ul>
          </div>

          <div className="lg:col-span-6 lg:col-start-7">
            <EnquiryForm source="homepage" />
          </div>
        </div>
      </div>
    </section>
  );
}
