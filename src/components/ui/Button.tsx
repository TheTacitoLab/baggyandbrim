import Link from 'next/link';
import type { ReactNode } from 'react';
import { cn } from '@/lib/utils';

interface ButtonProps {
  variant?: 'primary' | 'secondary';
  href?: string; // renders a Link when set, otherwise a <button>
  type?: 'button' | 'submit';
  fullWidth?: boolean;
  disabled?: boolean;
  className?: string;
  children: ReactNode;
  'aria-label'?: string;
}

/**
 * Primary is a solid ink/cream fill; secondary is an outlined fill. 2px radius,
 * no shadow (build spec 6.5). Presentational Server Component — CTAs that need
 * analytics use a thin client wrapper that renders this.
 */
export function Button({
  variant = 'primary',
  href,
  type = 'button',
  fullWidth = false,
  disabled = false,
  className,
  children,
  ...rest
}: ButtonProps) {
  const classes = cn(
    'btn',
    variant === 'primary' ? 'btn-primary' : 'btn-secondary',
    fullWidth && 'w-full',
    className,
  );

  if (href) {
    return (
      <Link href={href} className={classes} {...rest}>
        {children}
      </Link>
    );
  }

  return (
    <button type={type} disabled={disabled} className={classes} {...rest}>
      {children}
    </button>
  );
}
