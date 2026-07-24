import Image from 'next/image';
import type { CSSProperties } from 'react';
import { getImageAsset } from '@/content/assets/image-manifest';
import { aspectToCss, cn } from '@/lib/utils';

interface InstantFrameProps {
  imageId: string; // manifest key; resolves src, alt, ratio and shot note
  sizes: string; // mandatory on every responsive image
  priority?: boolean;
  quality?: number;
  className?: string;
  revealDirection?: 'up' | 'down' | 'mask' | 'none';
  /** Live-state caption. When a real file exists the chin shows this; when it is
   *  absent the chin collapses to the reduced empty height. */
  caption?: string;
  /** Layout-row aspect overrides. The manifest holds the true art direction; a
   *  row can force one shared ratio so every image in it aligns (Revision 5.1). */
  ratioDesktop?: string;
  ratioMobile?: string;
}

/** A small viewfinder mark for the placeholder state. */
function CameraGlyph() {
  return (
    <svg width="26" height="26" viewBox="0 0 28 28" aria-hidden="true" fill="none">
      <rect x="2.5" y="6.5" width="23" height="16" rx="2" stroke="currentColor" strokeWidth="1.1" />
      <circle cx="14" cy="14.5" r="4.3" stroke="currentColor" strokeWidth="1.1" />
      <path d="M9.2 6.5 10.7 4h6.6l1.5 2.5" stroke="currentColor" strokeWidth="1.1" />
    </svg>
  );
}

/** The cream placeholder fill shown inside the well while an image has no file:
 *  a camera glyph and the intended subject (Revision 8.2). Shared so every frame,
 *  including journal cards, reads identically. */
export function FramePlaceholder({ subject }: { subject: string }) {
  return (
    <div className="instant-frame__placeholder" aria-hidden="true">
      <CameraGlyph />
      <span className="type-label">{subject}</span>
    </div>
  );
}

/**
 * The site's signature media device (Revision 8). Every image consumer renders
 * through it, so there is no route by which a photographic image appears
 * unframed. It reads the manifest by ID, enforces the aspect ratio via the image
 * well, renders next/image when a real file exists and the placeholder state
 * otherwise, and writes the photographer's shot note into the film chin.
 */
export function InstantFrame({
  imageId,
  sizes,
  priority = false,
  quality = 78,
  className,
  revealDirection = 'mask',
  caption,
  ratioDesktop,
  ratioMobile,
}: InstantFrameProps) {
  const asset = getImageAsset(imageId);
  const effectiveDesktop = ratioDesktop ?? asset.aspectDesktop;
  const effectiveMobile =
    ratioMobile ?? (asset.aspectMobile === 'hidden' ? asset.aspectDesktop : asset.aspectMobile);
  const arDesktop = aspectToCss(effectiveDesktop);
  const arMobile = aspectToCss(effectiveMobile);
  const alt = asset.decorative ? '' : asset.alt;
  const hasImage = !!asset.src;

  const frameStyle = {
    '--ar-d': arDesktop,
    ...(arMobile ? { '--ar-m': arMobile } : {}),
  } as CSSProperties;

  // A working note for the photographer while the image is a placeholder: the
  // subject, the crop and the aspect ratio (Revision 8.2). Once a real file
  // lands the chin carries the caption instead, or collapses when there is none.
  const shotNote = [asset.subject, asset.crop, effectiveDesktop]
    .map((value) => value?.trim())
    .filter(Boolean)
    .join(' ');
  const chinText = hasImage ? caption : shotNote;

  return (
    <div className={cn('instant-frame', className)}>
      <div
        className="media-frame instant-frame__well"
        data-reveal={revealDirection === 'none' ? undefined : revealDirection}
        style={frameStyle}
      >
        {hasImage ? (
          <Image
            src={asset.src!}
            alt={alt}
            fill
            sizes={sizes}
            preload={priority}
            quality={quality}
            placeholder={asset.blurDataURL ? 'blur' : 'empty'}
            blurDataURL={asset.blurDataURL}
            className="object-cover"
          />
        ) : (
          <FramePlaceholder subject={asset.subject} />
        )}
      </div>
      <p className={cn('instant-frame__chin', !chinText && 'instant-frame__chin--empty')}>
        {chinText}
      </p>
    </div>
  );
}
