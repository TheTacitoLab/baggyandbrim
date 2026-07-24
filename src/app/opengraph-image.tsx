import { renderBrandOg, ogSize, ogContentType } from '@/lib/og';

export const alt = 'Baggy & Brim, custom cricket headwear';
export const size = ogSize;
export const contentType = ogContentType;

export default function Image() {
  return renderBrandOg({
    eyebrow: 'Custom cricket headwear',
    title: 'Old Heads. New Game.',
  });
}
