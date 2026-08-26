import Image from 'next/image';
import type { SitePhoto } from '@/types';
import { cn } from '@/lib/utils';

/** One instant print: square crop, warm white stock, a deep chin carrying a
 *  small Baggy & Brim watermark. */
function Polaroid({ photo, className }: { photo: SitePhoto; className?: string }) {
  return (
    <figure className={cn('polaroid', className)}>
      <div className="relative aspect-square w-full overflow-hidden">
        <Image
          src={photo.src}
          alt={photo.alt}
          fill
          sizes="(min-width: 1024px) 22vw, 70vw"
          className="object-cover"
          style={photo.objectPosition ? { objectPosition: photo.objectPosition } : undefined}
        />
      </div>
      <div className="flex items-center justify-center py-[7%]">
        <Image
          src="/brand/baggy-and-brim.png"
          alt=""
          width={930}
          height={143}
          className="h-2.5 w-auto opacity-40"
        />
      </div>
    </figure>
  );
}

/** Two prints laid casually together: each at a slight angle, the front one
 *  resting on the back with soft shadowing. */
export function PolaroidPair({ front, back }: { front: SitePhoto; back: SitePhoto }) {
  return (
    <div className="relative mx-auto aspect-[11/10] w-full max-w-[520px]">
      <Polaroid photo={back} className="absolute right-0 top-0 w-[63%] rotate-[3.5deg]" />
      <Polaroid photo={front} className="absolute bottom-0 left-0 w-[65%] -rotate-[2.5deg]" />
    </div>
  );
}
