import { HOMEPAGE } from '@/content/homepage';
import { SectionLabel } from '@/components/ui/SectionLabel';
import { ScorebookRule } from '@/components/ui/ScorebookRule';
import { ImageReveal } from '@/components/media/ImageReveal';
import { Reveal } from '@/components/ui/Reveal';
import { cn } from '@/lib/utils';

const { product } = HOMEPAGE;

/** Section 6. Split composition: large construction image left, ruled
 *  specification list right, second image cropping off the right page edge. */
export function ProductDetail() {
  return (
    <section
      id="detail"
      data-surface="paper"
      aria-labelledby="product-heading"
      className="bg-paper"
    >
      <div className="shell section-pad">
        <div className="max-w-[46ch]">
          <SectionLabel number={product.number}>{product.label}</SectionLabel>
          <Reveal>
            <h2 id="product-heading" className="type-heading-l mt-5">
              {product.heading}
            </h2>
          </Reveal>
          <Reveal delay={80}>
            <p className="type-body-l mt-5 text-on-surface-secondary">{product.intro}</p>
          </Reveal>
        </div>

        <div className="mt-14 grid grid-cols-1 gap-x-8 gap-y-10 lg:grid-cols-12">
          <div className="lg:col-span-6 lg:-mt-16">
            <ImageReveal
              imageId={product.imageIdPrimary}
              sizes="(max-width: 1023px) 100vw, 50vw"
            />
          </div>
          <ul className="lg:col-span-6 lg:col-start-7">
            {product.options.map((option, index) => (
              <li key={option.name}>
                <ScorebookRule delay={index * 60} />
                <div className="py-5">
                  <p className="type-heading-s">{option.name}</p>
                  <p
                    className={cn(
                      'type-body-s mt-1',
                      option.detail
                        ? 'text-on-surface-secondary'
                        : 'text-[color:var(--colour-grey-muted)]',
                    )}
                  >
                    {option.detail ?? 'Details confirmed on enquiry'}
                  </p>
                </div>
              </li>
            ))}
            <ScorebookRule />
          </ul>
        </div>

        <Reveal delay={80}>
          <p className="type-body-l mt-12 max-w-[44ch]">{product.closingLine}</p>
        </Reveal>
      </div>

      {/* Second image bleeds off the right page edge on desktop. */}
      <div className="mt-8 flex justify-end">
        <div className="w-full sm:w-3/4 lg:w-1/2">
          <ImageReveal imageId={product.imageIdSecondary} sizes="(max-width: 1023px) 75vw, 50vw" />
        </div>
      </div>
    </section>
  );
}
