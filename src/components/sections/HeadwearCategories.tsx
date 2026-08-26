import Image from 'next/image';
import { HOMEPAGE } from '@/content/homepage';
import type { HeadwearCategory } from '@/types';
import { CtaLink } from '@/components/ui/CtaLink';
import { Reveal } from '@/components/ui/Reveal';

const { headwear } = HOMEPAGE;

/** One product tile. The stretched link (after:absolute after:inset-0 on a
 *  relative parent) makes the whole tile clickable while keeping exactly one
 *  link in the accessibility tree; the title is the accessible name and the
 *  only call to action, so it carries display weight. */
function HeadwearTile({ category, delay }: { category: HeadwearCategory; delay: number }) {
  return (
    <Reveal as="li" delay={delay} className="group relative">
      <div className="relative aspect-[4/5] w-full overflow-hidden">
        <Image
          src={category.image.src}
          alt={category.image.alt}
          fill
          sizes="(min-width: 640px) 33vw, 100vw"
          className="object-cover transition-transform duration-500 motion-safe:group-hover:scale-[1.03]"
          style={
            category.image.objectPosition
              ? { objectPosition: category.image.objectPosition }
              : undefined
          }
        />
      </div>

      <h3 className="type-heading-l mt-5">
        <CtaLink
          href={category.href}
          event="headwear_category_click"
          params={{ category: category.slug, location: 'homepage' }}
          className="after:absolute after:inset-0 after:content-[''] focus-visible:outline-2 focus-visible:outline-offset-4"
        >
          {category.title}
        </CtaLink>
      </h3>

      <p className="type-body-s mt-2 text-on-surface-secondary">{category.body}</p>
    </Reveal>
  );
}

/** Headwear (surface: paper). Three clean portrait tiles, titles as the links,
 *  no buttons. */
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

        <ul className="mt-8 grid grid-cols-1 gap-10 sm:grid-cols-3 sm:gap-6 md:mt-12 lg:gap-8">
          {headwear.categories.map((category, index) => (
            <HeadwearTile key={category.slug} category={category} delay={index * 120} />
          ))}
        </ul>
      </div>
    </section>
  );
}
