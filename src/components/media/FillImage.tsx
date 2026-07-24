import Image from 'next/image';
import { getImageAsset } from '@/content/assets/image-manifest';
import { cn } from '@/lib/utils';
import { Placeholder } from './Placeholder';

interface FillImageProps {
  imageId: string;
  sizes: string;
  className?: string; // sizes the box; the image covers it
  priority?: boolean;
  quality?: number;
}

/** An image that covers its box rather than imposing an aspect ratio. For hero,
 *  overlaps and full-bleed placements where the container controls dimensions. */
export function FillImage({ imageId, sizes, className, priority = false, quality = 78 }: FillImageProps) {
  const asset = getImageAsset(imageId);
  return (
    <div className={cn('relative overflow-hidden bg-cream', className)}>
      {asset.src ? (
        <Image
          src={asset.src}
          alt={asset.decorative ? '' : asset.alt}
          fill
          sizes={sizes}
          preload={priority}
          quality={quality}
          className="object-cover"
        />
      ) : (
        <Placeholder asset={asset} />
      )}
    </div>
  );
}
