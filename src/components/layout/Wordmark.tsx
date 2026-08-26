import Image from 'next/image';
import Link from 'next/link';
import { SITE } from '@/content/site';
import { cn } from '@/lib/utils';

interface WordmarkProps {
  as?: 'span' | 'h1' | 'div';
  size?: 'sm' | 'md' | 'lg' | 'xl';
  href?: string; // renders as a link when set
  /** Surface the mark sits on: 'ink' logo on light surfaces (default), 'paper'
   *  logo on the dark green and black surfaces, footer included. */
  variant?: 'ink' | 'paper';
  className?: string;
}

// Intrinsic pixel dimensions of /public/brand/baggy-and-brim.png (930x143,
// trimmed tight to the wordmark, transparent background). Passed as hints for
// next/image; the height classes below win for rendering — height only, width
// auto, so the aspect ratio holds whatever the source dimensions are.
const LOGO_WIDTH = 930;
const LOGO_HEIGHT = 143;

const LOGO_SRC: Record<NonNullable<WordmarkProps['variant']>, string> = {
  ink: '/brand/baggy-and-brim.png',
  paper: '/brand/baggy-and-brim-light.png',
};

// sm is the header mark: the original 24/28/32px lockup sizing reduced by 20
// percent. lg is the large footer sign-off.
const SIZE_CLASS: Record<NonNullable<WordmarkProps['size']>, string> = {
  sm: 'h-[19px] sm:h-[22px] lg:h-[26px]',
  md: 'h-7 lg:h-8',
  lg: 'h-12 md:h-16 lg:h-20',
  xl: 'h-16 md:h-24',
};

/** The Baggy & Brim wordmark, now the supplied logo image. */
export function Wordmark({
  as: Tag = 'span',
  size = 'md',
  href,
  variant = 'ink',
  className,
}: WordmarkProps) {
  const mark = (
    <Tag className={cn('block', className)}>
      <Image
        src={LOGO_SRC[variant]}
        alt={SITE.name}
        width={LOGO_WIDTH}
        height={LOGO_HEIGHT}
        preload={size === 'sm'}
        className={cn('w-auto', SIZE_CLASS[size])}
      />
    </Tag>
  );

  if (href) {
    return (
      <Link
        href={href}
        aria-label={`${SITE.name} home`}
        className="inline-flex min-h-11 items-center"
      >
        {mark}
      </Link>
    );
  }
  return mark;
}
