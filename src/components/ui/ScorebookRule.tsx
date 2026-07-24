import type { CSSProperties } from 'react';
import { cn } from '@/lib/utils';

interface ScorebookRuleProps {
  orientation?: 'horizontal' | 'vertical';
  animate?: boolean; // draws in on entry. Default true (Section 6.2)
  delay?: number; // milliseconds, for staggered ledger rows
  className?: string;
}

/**
 * The hairline ledger rule. Colour follows the current data-surface via
 * var(--rule), so no inverse prop is needed. When animated it draws left-to-right
 * (or top-down), the site's signature motion, and never reverses.
 */
export function ScorebookRule({
  orientation = 'horizontal',
  animate = true,
  delay = 0,
  className,
}: ScorebookRuleProps) {
  const isHorizontal = orientation === 'horizontal';
  const reveal = animate ? (isHorizontal ? 'rule' : 'rule-v') : undefined;
  return (
    <div
      role="presentation"
      className={cn(isHorizontal ? 'rule-h' : 'rule-v', className)}
      data-reveal={reveal}
      style={delay ? ({ '--reveal-delay': `${delay}ms` } as CSSProperties) : undefined}
    />
  );
}
