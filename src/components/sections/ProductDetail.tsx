import { HOMEPAGE } from '@/content/homepage';
import { ScorebookRule } from '@/components/ui/ScorebookRule';
import { InstantFrame } from '@/components/media/InstantFrame';
import { Reveal } from '@/components/ui/Reveal';
import { cn } from '@/lib/utils';

const { product } = HOMEPAGE;

/** The Cap (surface: cream). Mode B: heading and intro flush left, a framed
 *  construction image beside a six-row ruled specification list, a second framed
 *  image inside the container, and one closing sentence. No negative margins, no
 *  image cropping off the page edge. */
export function ProductDetail() {
  return (
    <section id="detail" data-surface="cream" aria-labelledby="product-heading" className="bg-cream">
      <div className="shell section-pad">
        <div className="max-w-[68ch]">
          <Reveal>
            <h2 id="product-heading" className="type-heading-l">
              {product.heading}
            </h2>
          </Reveal>
          <Reveal delay={80}>
            <p className="type-body-l mt-4 md:mt-6 text-on-surface-secondary">{product.intro}</p>
          </Reveal>
        </div>

        <div className="mt-8 grid grid-cols-1 gap-x-8 gap-y-8 md:mt-12 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <InstantFrame
              imageId={product.imageIdPrimary}
              sizes="(max-width: 1023px) 100vw, 42vw"
            />
          </div>
          <ul className="lg:col-span-7">
            {product.options.map((option, index) => (
              <li key={option.name}>
                <ScorebookRule delay={index * 60} />
                <div className="py-6">
                  <p className="type-heading-s">{option.name}</p>
                  <p
                    className={cn(
                      'type-body-s mt-2',
                      option.detail ? 'text-on-surface' : 'text-on-surface-secondary',
                    )}
                  >
                    {option.detail ?? 'Details confirmed on enquiry'}
                  </p>
                </div>
              </li>
            ))}
            <li aria-hidden="true">
              <ScorebookRule />
            </li>
          </ul>
        </div>

        <div className="mt-8 md:mt-12">
          <InstantFrame
            imageId={product.imageIdSecondary}
            sizes="(max-width: 1023px) 100vw, 1000px"
          />
        </div>

        <Reveal delay={80}>
          <p className="type-body-l mt-8 md:mt-12 max-w-[68ch]">{product.closingLine}</p>
        </Reveal>
      </div>
    </section>
  );
}
