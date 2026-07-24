import { HOMEPAGE } from '@/content/homepage';
import { SectionLabel } from '@/components/ui/SectionLabel';
import { ScorebookRule } from '@/components/ui/ScorebookRule';
import { ImageReveal } from '@/components/media/ImageReveal';
import { Reveal } from '@/components/ui/Reveal';

const { brand } = HOMEPAGE;

/** Section 3. Wide editorial statement, generous white space, letterboxed image. */
export function BrandStatement() {
  return (
    <section data-surface="paper" aria-labelledby="brand-heading" className="bg-paper">
      <div className="shell section-pad">
        <ScorebookRule />
        <div className="mt-10 grid grid-cols-1 gap-x-8 gap-y-8 lg:grid-cols-12">
          <div className="lg:col-span-3">
            <SectionLabel number={brand.number}>{brand.label}</SectionLabel>
          </div>
          <div className="lg:col-span-8">
            <Reveal>
              <h2 id="brand-heading" className="type-display-l max-w-[16ch]">
                {brand.headline}
              </h2>
            </Reveal>
          </div>
          <div className="lg:col-span-7 lg:col-start-5">
            <div className="sm:columns-2 sm:gap-x-8 [&>p+p]:mt-4 sm:[&>p]:break-inside-avoid">
              {brand.body.map((paragraph, index) => (
                <Reveal key={index} as="p" delay={index * 90} className="type-body text-on-surface">
                  {paragraph}
                </Reveal>
              ))}
            </div>
            <Reveal delay={120}>
              <p className="type-body-l mt-10 text-green">{brand.closingLine}</p>
            </Reveal>
          </div>
        </div>
      </div>

      <div className="mt-4">
        <ImageReveal imageId={brand.imageId} sizes="100vw" />
      </div>
    </section>
  );
}
