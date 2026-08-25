import { HOMEPAGE } from '@/content/homepage';
import { ScorebookRule } from '@/components/ui/ScorebookRule';

const { seoContent } = HOMEPAGE;

/** Search-focused section near the bottom of the homepage (brief Section 10).
 *  Deliberately quiet: a ruled heading and flowing prose, set apart from the
 *  shorter editorial copy above it. No imagery, no CTA — the enquiry section
 *  that follows is the final call to action. */
export function SeoContent() {
  return (
    <section data-surface="cream" aria-labelledby="seo-content-heading" className="bg-cream">
      <div className="shell section-pad">
        <ScorebookRule />
        <div className="mt-8 grid grid-cols-1 gap-x-8 gap-y-6 md:mt-12 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <h2 id="seo-content-heading" className="type-heading-m max-w-[24ch]">
              {seoContent.heading}
            </h2>
          </div>
          <div className="flex flex-col gap-5 lg:col-span-7 lg:col-start-6">
            {seoContent.body.map((paragraph, index) => (
              <p key={index} className="type-body text-on-surface-secondary">
                {paragraph}
              </p>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
