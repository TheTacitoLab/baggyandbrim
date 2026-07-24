import Link from 'next/link';
import { SITE } from '@/content/site';
import { cn } from '@/lib/utils';

interface WordmarkProps {
  as?: 'span' | 'h1' | 'div';
  size?: 'sm' | 'md' | 'lg' | 'xl';
  href?: string; // renders as a link when set
  className?: string;
}

const SIZE_CLASS: Record<NonNullable<WordmarkProps['size']>, string> = {
  sm: 'text-[1.15rem]',
  md: 'text-[1.5rem]',
  lg: 'type-display-m',
  xl: 'type-display-l',
};

/** The Baggy & Brim wordmark, always in the display face. Ampersand in prose. */
export function Wordmark({ as: Tag = 'span', size = 'md', href, className }: WordmarkProps) {
  const mark = (
    <Tag
      className={cn(
        'font-display font-black leading-none tracking-[-0.02em]',
        SIZE_CLASS[size],
        className,
      )}
    >
      {SITE.name}
    </Tag>
  );

  if (href) {
    return (
      <Link href={href} aria-label={`${SITE.name}, home`} className="inline-block">
        {mark}
      </Link>
    );
  }
  return mark;
}
