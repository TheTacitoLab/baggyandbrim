import type { ImageAsset } from '@/types';

/**
 * Renders while an image has no real file (build spec 9.3). A solid cream block
 * with a hairline rule, the asset ID and the intended subject. No external
 * placeholder services, no random images. Fills its parent .media-frame, which
 * owns the aspect ratio.
 */
export function Placeholder({ asset }: { asset: ImageAsset }) {
  return (
    <div
      aria-hidden="true"
      className="absolute inset-0 flex flex-col justify-between p-4"
      style={{ backgroundColor: 'var(--colour-cream)', outline: '1px solid var(--colour-rule)', outlineOffset: '-1px' }}
    >
      <span className="type-label" style={{ color: 'var(--colour-ink)' }}>
        {asset.id}
      </span>
      <span className="type-body-s" style={{ color: 'var(--colour-grey)', maxWidth: '32ch' }}>
        {asset.subject}
      </span>
    </div>
  );
}
