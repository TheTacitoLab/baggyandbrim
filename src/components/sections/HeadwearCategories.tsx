import { HOMEPAGE } from '@/content/homepage';
import type { HeadwearCategory } from '@/types';
import { ScorebookRule } from '@/components/ui/ScorebookRule';
import { InstantFrame } from '@/components/media/InstantFrame';
import { CtaLink } from '@/components/ui/CtaLink';
import { Reveal } from '@/components/ui/Reveal';

const { headwear } = HOMEPAGE;

const CARD_SIZES = '(max-width: 767px) 100vw, 33vw';

/** One category card. The card is a four-row grid — frame, title, body, link —
 *  that adopts the parent's rows as a subgrid from tablet up, so titles, body
 *  and links share baselines across the row regardless of copy length. */
function HeadwearCategoryCard({ category, delay }: { category: HeadwearCategory; delay: number }) {
  return (
    <Reveal
      as="article"
      delay={delay}
      className="grid grid-rows-[auto_auto_1fr_auto] gap-0 md:row-span-4 md:grid-rows-subgrid"
    >
      <InstantFrame imageId={category.imageId} sizes={CARD_SIZES} revealDirection="none" />
      <div className="mt-6">
        <h3 className="type-heading-s">{category.title}</h3>
        <p className="type-label mt-2 text-on-surface-secondary">{category.positioning}</p>
      </div>
      <p className="type-body mt-4 text-on-surface">{category.body}</p>
      <div>
        <div className="mt-6">
          <ScorebookRule animate={false} />
        </div>
        <div className="mt-5">
          <CtaLink
            href={category.href}
            event="headwear_category_click"
            params={{ category: category.slug, location: 'homepage' }}
            className="text-link"
          >
            {category.linkLabel}
          </CtaLink>
        </div>
      </div>
    </Reveal>
  );
}

/** Headwear (Revision surface: paper). Mode B: flush-left heading and intro, a
 *  perfectly aligned three-across image row, and one primary CTA. */
export function HeadwearCategories() {
  return (
    <section
      id="headwear"
      data-surface="paper"
      aria-labelledby="headwear-heading"
      tabIndex={-1}
      className="bg-paper outline-none"
    >
      <div className="shell section-pad">
        <div className="max-w-[68ch]">
          <Reveal>
            <h2 id="headwear-heading" className="type-heading-l">
              {headwear.heading}
            </h2>
          </Reveal>
          <Reveal delay={80}>
            <p className="type-body-l mt-4 md:mt-6 text-on-surface-secondary">{headwear.intro}</p>
          </Reveal>
        </div>

        <div className="mt-8 grid grid-cols-1 gap-x-4 gap-y-12 md:mt-12 md:grid-cols-3 md:gap-x-6 md:grid-rows-[auto_auto_1fr_auto] lg:gap-x-8">
          {headwear.categories.map((category, index) => (
            <HeadwearCategoryCard key={category.slug} category={category} delay={index * 120} />
          ))}
        </div>

        <div className="mt-8 md:mt-10 lg:mt-12">
          <CtaLink
            href={headwear.cta.href}
            event="cta_section_click"
            params={{ section: 'headwear' }}
            className="btn btn-primary"
          >
            {headwear.cta.label}
          </CtaLink>
        </div>
      </div>
    </section>
  );
}
