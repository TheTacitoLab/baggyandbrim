import type { VolumeBracket } from '@/types';
import { SectionLabel } from '@/components/ui/SectionLabel';
import { ScorebookRule } from '@/components/ui/ScorebookRule';
import { ImageReveal } from '@/components/media/ImageReveal';
import { Reveal } from '@/components/ui/Reveal';
import { cn } from '@/lib/utils';

interface VolumeSelectorProps {
  label?: string;
  number?: string;
  heading: string;
  intro?: string;
  brackets: VolumeBracket[];
  note?: string;
  imageId?: string;
}

/**
 * Section 9, display mode. A compact four-part ruled row answering minimum-order
 * queries. Prices are never invented. The enquiry form uses its own RadioGroup
 * for the input version of this data.
 */
export function VolumeSelector({
  label,
  number,
  heading,
  intro,
  brackets,
  note,
  imageId,
}: VolumeSelectorProps) {
  return (
    <section
      id="volumes"
      data-surface="paper"
      aria-labelledby="volumes-heading"
      className="bg-paper"
    >
      <div className="shell section-pad">
        <div className="max-w-[42ch]">
          {label && <SectionLabel number={number}>{label}</SectionLabel>}
          <Reveal>
            <h2 id="volumes-heading" className="type-heading-l mt-5">
              {heading}
            </h2>
          </Reveal>
          {intro && (
            <Reveal delay={80}>
              <p className="type-body-l mt-5 text-on-surface-secondary">{intro}</p>
            </Reveal>
          )}
        </div>

        <div className="mt-12">
          <ScorebookRule />
          <div className="grid grid-cols-2 lg:grid-cols-4">
            {brackets.map((bracket, index) => (
              <Reveal
                key={bracket.value}
                delay={index * 70}
                className={cn(
                  'py-8',
                  index % 2 === 1 && 'border-l border-[color:var(--rule)] pl-5',
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
      </div>

      {imageId && (
        <div className="mt-6">
          <ImageReveal imageId={imageId} sizes="100vw" />
        </div>
      )}
    </section>
  );
}
