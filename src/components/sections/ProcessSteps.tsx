import { Fragment } from 'react';
import type { ProcessStep } from '@/types';
import { SectionLabel } from '@/components/ui/SectionLabel';
import { ScorebookRule } from '@/components/ui/ScorebookRule';
import { ImageReveal } from '@/components/media/ImageReveal';
import { Reveal } from '@/components/ui/Reveal';
import { CtaLink } from '@/components/ui/CtaLink';
import { TextLink } from '@/components/ui/TextLink';
import { ProcessCounter } from './ProcessCounter';

interface ProcessStepsProps {
  label?: string;
  number?: string;
  heading: string;
  steps: ProcessStep[];
  variant?: 'full' | 'compact';
  showCounter?: boolean;
  note?: string;
  closingLine?: string;
  imageId?: string;
  cta?: { label: string; href: string };
  fullProcessHref?: string; // compact mode link to the full sequence
}

/** Section 8 (homepage) and the compact process block on landing pages. */
export function ProcessSteps({
  label,
  number,
  heading,
  steps,
  variant = 'full',
  showCounter = true,
  note,
  closingLine,
  imageId,
  cta,
  fullProcessHref,
}: ProcessStepsProps) {
  if (variant === 'compact') {
    return (
      <section aria-labelledby="process-compact-heading" className="bg-surface">
        <div className="shell section-pad">
          <div className="flex items-baseline justify-between gap-6">
            <h2 id="process-compact-heading" className="type-heading-m">
              {heading}
            </h2>
            {fullProcessHref && <TextLink href={fullProcessHref}>See the full process</TextLink>}
          </div>
          <ol className="mt-10">
            {steps.map((step) => (
              <li key={step.number}>
                <ScorebookRule />
                <div className="flex flex-col gap-2 py-5 sm:flex-row sm:items-baseline sm:gap-8">
                  <span className="type-number w-10 shrink-0 text-on-surface-secondary">
                    {step.number}
                  </span>
                  <span className="type-heading-s w-56 shrink-0">{step.title}</span>
                  <span className="type-body text-on-surface-secondary">
                    {step.compactDescription}
                  </span>
                </div>
              </li>
            ))}
            <li aria-hidden="true">
              <ScorebookRule />
            </li>
          </ol>
        </div>
      </section>
    );
  }

  const midpoint = Math.floor(steps.length / 2);

  return (
    <section
      id="process"
      data-surface="paper"
      aria-labelledby="process-heading"
      tabIndex={-1}
      className="bg-paper outline-none"
    >
      <div className="shell section-pad">
        <div className="flex items-start justify-between gap-6">
          <div className="max-w-[42ch]">
            {label && <SectionLabel number={number}>{label}</SectionLabel>}
            <Reveal>
              <h2 id="process-heading" className="type-heading-l mt-5">
                {heading}
              </h2>
            </Reveal>
          </div>
          {showCounter && (
            <div className="hidden lg:block">
              <ProcessCounter total={steps.length} />
            </div>
          )}
        </div>

        <ol className="mt-12">
          {steps.map((step, index) => (
            <Fragment key={step.number}>
              <li data-process-step={index} className="scroll-mt-32">
                <ScorebookRule delay={index * 80} />
                <div className="grid grid-cols-1 gap-2 py-8 lg:grid-cols-12 lg:gap-8">
                  <span className="type-display-m font-display lg:col-span-2">{step.number}</span>
                  <h3 className="type-heading-s self-center lg:col-span-3">{step.title}</h3>
                  <p className="type-body self-center text-on-surface lg:col-span-6 lg:col-start-6">
                    {step.description}
                  </p>
                </div>
              </li>
              {imageId && index === midpoint - 1 && (
                <li className="flex justify-end py-6">
                  <div className="w-full lg:w-1/2">
                    <ImageReveal imageId={imageId} sizes="(max-width: 1023px) 100vw, 50vw" />
                  </div>
                </li>
              )}
            </Fragment>
          ))}
          <li aria-hidden="true">
            <ScorebookRule />
          </li>
        </ol>

        {note && <p className="type-body-s mt-6 max-w-[60ch] text-on-surface-secondary">{note}</p>}
        {closingLine && (
          <Reveal delay={80}>
            <p className="type-body-l mt-12 max-w-[48ch]">{closingLine}</p>
          </Reveal>
        )}
        {cta && (
          <div className="mt-10">
            <CtaLink
              href={cta.href}
              event="cta_section_click"
              params={{ section: 'process' }}
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
