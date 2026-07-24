import { renderBrandOg, ogSize, ogContentType } from '@/lib/og';
import { cricketPresentationCaps } from '@/content/pages/cricket-presentation-caps';

export const alt = cricketPresentationCaps.h1;
export const size = ogSize;
export const contentType = ogContentType;

export default function Image() {
  return renderBrandOg({ eyebrow: cricketPresentationCaps.heroEyebrow, title: cricketPresentationCaps.h1 });
}
