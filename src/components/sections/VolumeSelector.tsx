import type { VolumeBracket } from '@/types';
import { SectionLabel } from '@/components/ui/SectionLabel';
import { ScorebookRule } from '@/components/ui/ScorebookRule';
import { InstantFrame } from '@/components/media/InstantFrame';
import { CtaLink } from '@/components/ui/CtaLink';
import { Reveal } from '@/components/ui/Reveal';
import { cn } from '@/lib/utils';

interface VolumeSelectorProps {
  label?: string;
  heading: string;
  intro?: string;
  brackets: VolumeBracket[];
  note?: string;
  cta?: { label: string; href: string };
  imageId?: string;
}

/**
 * Volumes (surface: green). Mode B. One of the two places a small label above a
 * heading is kept (Revision 2). A compact four-part ruled row answering
 * minimum-order queries, a framed image and one primary CTA. Prices are never
 * invented.
 */
export function VolumeSelector({
  label,
  heading,
  intro,
  brackets,
  note,
  cta,
  imageId,
}: VolumeSelectorProps) {
  return (
    <section id="volumes" data-surface="green" aria-labelledby="volumes-heading" className="bg-green">
      <div className="shell section-pad">
        <div className="max-w-[68ch]">
          {label && <SectionLabel>{label}</SectionLabel>}
          <Reveal>
            <h2 id="volumes-heading" className={cn('type-heading-l', label && 'mt-4')}>
              {heading}
            </h2>
          </Reveal>
          {intro && (
            <Reveal delay={80}>
              <p className="type-body-l mt-4 md:mt-6 text-on-surface-secondary">{intro}</p>
            </Reveal>
          )}
        </div>

        <div className="mt-8 md:mt-12">
          <ScorebookRule />
          <div className="grid grid-cols-2 lg:grid-cols-4">
            {brackets.map((bracket, index) => (
              <Reveal
                key={bracket.value}
                delay={index * 70}
                className={cn(
                  'py-8',
                  index % 2 === 1 && 'border-l border-[color:var(--rule)] pl-6',
                  'lg:border-l lg:border-[color:var(--rule)] lg:px-6',
                  index === 0 && 'lg:border-l-0 lg:pl-0',
                )}
              >
                <span className="type-heading-m tabular block">{bracket.display}</span>
                <p className="type-body-s mt-3 text-on-surface-secondary">{bracket.description}</p>
              </Reveal>
            ))}
          </div>
          <ScorebookRule />
        </div>

        {note && <p className="type-body-s mt-6 text-on-surface-secondary">{note}</p>}

        {imageId && (
          <div className="mt-8 md:mt-12">
            <InstantFrame imageId={imageId} sizes="(max-width: 1023px) 100vw, 1000px" />
          </div>
        )}

        {cta && (
          <div className="mt-8 md:mt-10 lg:mt-12">
            <CtaLink
              href={cta.href}
              event="cta_section_click"
              params={{ section: 'volumes' }}
              className="btn btn-primary"
            >
              {cta.label}
            </CtaLink>
          </div>
        )}
      </div>
    </section>
  );
}
