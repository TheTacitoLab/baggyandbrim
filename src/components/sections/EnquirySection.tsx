import { HOMEPAGE } from '@/content/homepage';
import { EnquiryForm } from '@/components/form/EnquiryForm';
import { Reveal } from '@/components/ui/Reveal';

const { enquiry } = HOMEPAGE;

/**
 * Enquiry (surface: ink). The conversion point and the last ink block, read as
 * one continuous dark passage with the footer. Mode A heading block above a
 * centred form column. The form itself is unchanged (fields, validation, route
 * handler, states and analytics are out of scope).
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
        <div className="mx-auto max-w-[52ch] text-center">
          <Reveal>
            <h2 id="enquire-heading" className="type-heading-l">
              {enquiry.heading}
            </h2>
          </Reveal>
          <div className="mt-4 md:mt-6 flex flex-col gap-4">
            {enquiry.supporting.map((paragraph, index) => (
              <p key={index} className="type-body-l text-on-surface-secondary">
                {paragraph}
              </p>
            ))}
          </div>
          <ul className="mt-8 flex flex-col items-center gap-2 sm:flex-row sm:justify-center sm:gap-8">
            {enquiry.reassurance.map((item) => (
              <li key={item} className="type-body-s text-on-surface-secondary">
                {item}
              </li>
            ))}
          </ul>
        </div>

        <div className="mx-auto mt-8 md:mt-12 max-w-[640px]">
          <EnquiryForm source="homepage" />
        </div>
      </div>
    </section>
  );
}
