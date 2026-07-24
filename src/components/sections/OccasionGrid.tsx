import { Fragment } from 'react';
import { HOMEPAGE } from '@/content/homepage';
import { ScorebookRule } from '@/components/ui/ScorebookRule';
import { InstantFrame } from '@/components/media/InstantFrame';
import { CtaLink } from '@/components/ui/CtaLink';
import { Reveal } from '@/components/ui/Reveal';

const { occasions: content } = HOMEPAGE;

/** Occasions (surface: green). Mode B: a flush-left ruled ledger where the rules
 *  do the structural work, one framed editorial image inside the container, and
 *  one primary CTA. No overlapping image, no offset columns. */
export function OccasionGrid() {
  return (
    <section
      id="occasions"
      data-surface="green"
      aria-labelledby="occasions-heading"
      tabIndex={-1}
      className="bg-green text-on-surface outline-none"
    >
      <div className="shell section-pad">
        <div className="max-w-[68ch]">
          <Reveal>
            <h2 id="occasions-heading" className="type-heading-l">
              {content.heading}
            </h2>
          </Reveal>
          <Reveal delay={80}>
            <p className="type-body-l mt-4 md:mt-6 text-on-surface-secondary">{content.intro}</p>
          </Reveal>
        </div>

        <div className="mt-8 md:mt-12">
          {content.occasions.map((occasion, index) => (
            <Fragment key={occasion.name}>
              <ScorebookRule delay={index * 60} />
              <div className="grid grid-cols-1 gap-1 py-6 md:grid-cols-12 md:gap-8">
                <div className="flex items-baseline justify-between md:col-span-3 md:block">
                  <h3 className="type-heading-s md:type-heading-m">{occasion.name}</h3>
                  <span className="type-number text-on-surface-secondary md:hidden">
                    {occasion.number}
                  </span>
                </div>
                <p className="type-body text-on-surface md:col-span-7">{occasion.description}</p>
                <span className="hidden type-number text-on-surface-secondary md:col-span-2 md:block md:text-right">
                  {occasion.number}
                </span>
              </div>
            </Fragment>
          ))}
          <ScorebookRule />
        </div>

        <div className="mt-8 md:mt-12">
          <InstantFrame imageId={content.imageId} sizes="(max-width: 1023px) 100vw, 1000px" />
        </div>

        <div className="mt-8 md:mt-10 lg:mt-12">
          <CtaLink
            href={content.cta.href}
            event="cta_section_click"
            params={{ section: 'occasions' }}
            className="btn btn-primary"
          >
            {content.cta.label}
          </CtaLink>
        </div>
      </div>
    </section>
  );
}
