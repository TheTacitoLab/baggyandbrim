import { HOMEPAGE } from '@/content/homepage';
import type { HeadwearCategory } from '@/types';
import { SectionLabel } from '@/components/ui/SectionLabel';
import { ScorebookRule } from '@/components/ui/ScorebookRule';
import { ImageReveal } from '@/components/media/ImageReveal';
import { CtaLink } from '@/components/ui/CtaLink';
import { Reveal } from '@/components/ui/Reveal';
import { cn } from '@/lib/utils';

const { headwear } = HOMEPAGE;

const OFFSET_CLASS = ['lg:mt-0', 'lg:mt-12', 'lg:mt-24'];
const CARD_SIZES = '(max-width: 767px) 100vw, (max-width: 1023px) 50vw, 33vw';

function HeadwearCategoryCard({
  category,
  offset,
  delay,
}: {
  category: HeadwearCategory;
  offset: number;
  delay: number;
}) {
  return (
    <Reveal
      as="article"
      delay={delay}
      className={cn('group relative flex flex-col', OFFSET_CLASS[offset])}
    >
      <div className="overflow-hidden">
        <ImageReveal
          imageId={category.imageId}
          sizes={CARD_SIZES}
          revealDirection="none"
          frameClassName="transition-transform duration-[600ms] ease-out group-hover:scale-[1.03] motion-reduce:transform-none"
        />
      </div>
      <h3 className="type-heading-s mt-6">{category.title}</h3>
      <p className="type-label mt-2 text-on-surface-secondary">{category.positioning}</p>
      <p className="type-body mt-4 max-w-[38ch] text-on-surface">{category.body}</p>
      <div className="mt-6">
        <ScorebookRule animate={false} />
      </div>
      <div className="mt-5">
        <CtaLink
          href={category.href}
          event="headwear_category_click"
          params={{ category: category.slug, location: 'homepage' }}
          className="text-link after:absolute after:inset-0 after:content-['']"
        >
          {category.linkLabel}
        </CtaLink>
      </div>
    </Reveal>
  );
}

/** Section 4. Three-column editorial image grid; the primary internal-link path. */
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
        <div className="max-w-[42ch]">
          <SectionLabel number={headwear.number}>{headwear.label}</SectionLabel>
          <Reveal>
            <h2 id="headwear-heading" className="type-heading-l mt-5">
              {headwear.heading}
            </h2>
          </Reveal>
          <Reveal delay={80}>
            <p className="type-body-l mt-5 text-on-surface-secondary">{headwear.intro}</p>
          </Reveal>
        </div>

        <div className="mt-14 grid grid-cols-1 gap-x-8 gap-y-16 md:grid-cols-2 lg:grid-cols-3 lg:items-start">
          {headwear.categories.map((category, index) => (
            <HeadwearCategoryCard
              key={category.slug}
              category={category}
              offset={index}
              delay={index * 120}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
