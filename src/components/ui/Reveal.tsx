import type { CSSProperties, ElementType, ReactNode } from 'react';

export type RevealDirection = 'up' | 'down' | 'fade' | 'mask' | 'rule' | 'rule-v';

interface RevealProps {
  children?: ReactNode;
  as?: ElementType;
  direction?: RevealDirection;
  delay?: number; // milliseconds
  className?: string;
  style?: CSSProperties;
  id?: string;
}

/**
 * Marks an element for entry animation. The work is done by the single
 * RevealObserver (build spec 26.3.1) — this stays a Server Component so it ships
 * no JavaScript. With JS disabled the element renders at its final state.
 */
export function Reveal({
  children,
  as: Tag = 'div',
  direction = 'up',
  delay = 0,
  className,
  style,
  id,
}: RevealProps) {
  const revealStyle = delay
    ? ({ ...style, '--reveal-delay': `${delay}ms` } as CSSProperties)
    : style;
  return (
    <Tag id={id} data-reveal={direction} style={revealStyle} className={className}>
      {children}
    </Tag>
  );
}
