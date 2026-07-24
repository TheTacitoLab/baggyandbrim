import { cn } from '@/lib/utils';

interface PageIntroProps {
  eyebrow?: string;
  heading: string;
  intro?: string;
  as?: 'h1' | 'h2';
  align?: 'left' | 'centre';
  maxWidth?: 'narrow' | 'wide';
  id?: string;
  className?: string;
}

/** A reusable heading block for landing, journal and legal pages. */
export function PageIntro({
  eyebrow,
  heading,
  intro,
  as: Heading = 'h1',
  align = 'left',
  maxWidth = 'wide',
  id,
  className,
}: PageIntroProps) {
  return (
    <div
      className={cn(
        maxWidth === 'narrow' ? 'max-w-[46ch]' : 'max-w-[62ch]',
        align === 'centre' && 'mx-auto text-center',
        className,
      )}
    >
      {eyebrow && <p className="type-label text-on-surface-secondary">{eyebrow}</p>}
      <Heading id={id} className={cn(eyebrow && 'mt-5', Heading === 'h1' ? 'type-heading-l' : 'type-heading-m')}>
        {heading}
      </Heading>
      {intro && <p className="type-body-l mt-5 text-on-surface-secondary">{intro}</p>}
    </div>
  );
}
