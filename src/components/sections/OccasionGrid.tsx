import { Fragment } from 'react';
import { HOMEPAGE } from '@/content/homepage';
import { SectionLabel } from '@/components/ui/SectionLabel';
import { ScorebookRule } from '@/components/ui/ScorebookRule';
import { ImageReveal } from '@/components/media/ImageReveal';
import { FillImage } from '@/components/media/FillImage';
import { TextLink } from '@/components/ui/TextLink';
import { Reveal } from '@/components/ui/Reveal';

const { occasions: content } = HOMEPAGE;

/** Section 5. The emotional centre: a tight scorebook ledger on cream, where the
 *  ruling device does the most work, with one image breaking the grid. */
export function OccasionGrid() {
  return (
    <section
      id="occasions"
      data-surface="cream"
      aria-labelledby="occasions-heading"
      tabIndex={-1}
      className="bg-cream text-on-surface outline-none"
    >
      <div className="shell section-pad">
        <div className="max-w-[42ch]">
          <SectionLabel number={content.number}>{content.label}</SectionLabel>
          <Reveal>
            <h2 id="occasions-heading" className="type-heading-l mt-5">
              {content.heading}
            </h2>
          </Reveal>
          <Reveal delay={80}>
            <p className="type-body-l mt-5 text-on-surface-secondary">{content.intro}</p>
          </Reveal>
        </div>

        {/* Desktop ledger with an overlapping image over rows two to four. */}
        <div className="relative mt-14 hidden lg:block">
          <div className="grid grid-cols-12">
            {content.occasions.map((occasion, index) => (
              <Fragment key={occasion.name}>
                <div className="col-span-12">
                  <ScorebookRule delay={index * 80} />
                </div>
                <h3 className="type-heading-m col-span-3 py-8">{occasion.name}</h3>
                <p className="type-body col-span-5 col-start-5 py-8 text-on-surface">
                  {occasion.description}
                </p>
                <span className="type-number col-span-1 col-start-12 self-start py-8 text-right text-on-surface-secondary">
                  {occasion.number}
                </span>
              </Fragment>
            ))}
            <div className="col-span-12">
              <ScorebookRule delay={content.occasions.length * 80} />
            </div>
          </div>
          <div className="pointer-events-none absolute right-0 top-[19%] z-10 h-[56%] w-[32%]">
            <FillImage imageId={content.imageId} sizes="32vw" className="h-full w-full" />
          </div>
        </div>

        {/* Mobile stack: name above description, number inline, image after row two. */}
        <div className="mt-12 lg:hidden">
          {content.occasions.map((occasion, index) => (
            <Fragment key={occasion.name}>
              <ScorebookRule />
              <div className="flex items-baseline justify-between pt-5">
                <h3 className="type-heading-s">{occasion.name}</h3>
                <span className="type-number text-on-surface-secondary">{occasion.number}</span>
              </div>
              <p className="type-body pb-6 pt-2 text-on-surface">{occasion.description}</p>
              {index === 1 && (
                <div className="pb-6">
                  <ImageReveal imageId={content.imageId} sizes="100vw" />
                </div>
              )}
            </Fragment>
          ))}
          <ScorebookRule />
        </div>

        <div className="mt-12 flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
          <Reveal>
            <p className="type-body-l max-w-[40ch]">{content.closingLine}</p>
          </Reveal>
          <TextLink href={content.footerLink.href} withArrow>
            {content.footerLink.label}
          </TextLink>
        </div>
      </div>
    </section>
  );
}
