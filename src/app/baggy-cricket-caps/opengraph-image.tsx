import { renderBrandOg, ogSize, ogContentType } from '@/lib/og';
import { baggyCricketCaps } from '@/content/pages/baggy-cricket-caps';

export const alt = baggyCricketCaps.h1;
export const size = ogSize;
export const contentType = ogContentType;

export default function Image() {
  return renderBrandOg({ eyebrow: baggyCricketCaps.heroEyebrow, title: baggyCricketCaps.h1 });
}
