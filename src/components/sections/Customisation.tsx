import { HOMEPAGE } from '@/content/homepage';
import { ScorebookRule } from '@/components/ui/ScorebookRule';
import { Reveal } from '@/components/ui/Reveal';
import { cn } from '@/lib/utils';

const { customisation } = HOMEPAGE;

/** Custom for Your Club (surface: cream). Mode B: heading and intro flush left,
 *  a six-row ruled list of customisation decisions, and one closing line. No
 *  imagery — the homepage carries only the hero and the three product images. */
export function Customisation() {
  return (
    <section
      id="customisation"
      data-surface="cream"
      aria-labelledby="customisation-heading"
      className="bg-cream"
    >
      <div className="shell section-pad">
        <div className="max-w-[68ch]">
          <Reveal>
            <h2 id="customisation-heading" className="type-heading-l">
              {customisation.heading}
            </h2>
          </Reveal>
          <Reveal delay={80}>
            <p className="type-body-l mt-4 md:mt-6 text-on-surface-secondary">
              {customisation.intro}
            </p>
          </Reveal>
        </div>

        <ul className="mt-8 md:mt-12 lg:columns-2 lg:gap-x-12">
          {customisation.options.map((option, index) => (
            <li key={option.name} className="break-inside-avoid">
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
        </ul>
      </div>
    </section>
  );
}
