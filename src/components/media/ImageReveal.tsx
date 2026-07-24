import Image from 'next/image';
import type { CSSProperties } from 'react';
import { getImageAsset } from '@/content/assets/image-manifest';
import { aspectToCss, cn } from '@/lib/utils';
import { Placeholder } from './Placeholder';

interface ImageRevealProps {
  imageId: string; // manifest key; resolves src, alt, ratio
  sizes: string; // mandatory on every responsive image (Section 9.5)
  priority?: boolean;
  quality?: number;
  className?: string;
  frameClassName?: string;
  revealDirection?: 'up' | 'down' | 'mask' | 'none';
  caption?: string;
  /** Reserved (Section 24). Scroll parallax is deliberately not applied here so
   * ImageReveal stays a Server Component; the hero owns its own parallax. */
  parallax?: number;
}

/**
 * The single image consumer. Reads the manifest by ID, enforces the aspect ratio
 * via .media-frame, renders next/image when a real file exists and the local
 * Placeholder otherwise (build spec 9.3, 9.5).
 */
export function ImageReveal({
  imageId,
  sizes,
  priority = false,
  quality = 78,
  className,
  frameClassName,
  revealDirection = 'mask',
  caption,
}: ImageRevealProps) {
  const asset = getImageAsset(imageId);
  const arDesktop = aspectToCss(asset.aspectDesktop);
  const arMobile = asset.aspectMobile === 'hidden' ? undefined : aspectToCss(asset.aspectMobile);
  const mobileHidden = asset.aspectMobile === 'hidden';
  const alt = asset.decorative ? '' : asset.alt;

  const frameStyle = {
    '--ar-d': arDesktop,
    ...(arMobile ? { '--ar-m': arMobile } : {}),
  } as CSSProperties;

  const frame = (
    <div
      className={cn('media-frame', frameClassName)}
      data-reveal={revealDirection === 'none' ? undefined : revealDirection}
      data-mobile-hidden={mobileHidden ? 'true' : undefined}
      style={frameStyle}
    >
      {asset.src ? (
        <Image
          src={asset.src}
          alt={alt}
          fill
          sizes={sizes}
          // Next 16: `preload` replaces the deprecated `priority` prop.
          preload={priority}
          quality={quality}
          placeholder={asset.blurDataURL ? 'blur' : 'empty'}
          blurDataURL={asset.blurDataURL}
          className="object-cover"
        />
      ) : (
        <Placeholder asset={asset} />
      )}
    </div>
  );

  if (caption) {
    return (
      <figure className={cn('flex flex-col gap-3', className)}>
        {frame}
        <figcaption className="type-body-s text-on-surface-secondary">{caption}</figcaption>
      </figure>
    );
  }

  return className ? <div className={className}>{frame}</div> : frame;
}
