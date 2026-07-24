import { HOMEPAGE } from '@/content/homepage';
import { Reveal } from '@/components/ui/Reveal';

const { brand } = HOMEPAGE;

/**
 * Statement (Revision 9.1). A held breath between the hero and the product:
 * Mode A, centred, on the first ink interrupt. No image, no CTA, no second
 * paragraph.
 */
export function BrandStatement() {
  return (
    <section data-surface="ink" aria-labelledby="brand-heading" className="bg-ink text-paper">
      <div className="shell section-pad">
        <div className="mx-auto max-w-[52ch] text-center">
          <Reveal>
            <h2 id="brand-heading" className="type-display-m">
              {brand.heading}
            </h2>
          </Reveal>
          <Reveal delay={90}>
            <p className="type-body-l mt-6 text-on-surface-secondary">{brand.body}</p>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
