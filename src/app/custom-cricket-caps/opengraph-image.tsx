import { renderBrandOg, ogSize, ogContentType } from '@/lib/og';
import { customCricketCaps } from '@/content/pages/custom-cricket-caps';

export const alt = customCricketCaps.h1;
export const size = ogSize;
export const contentType = ogContentType;

export default function Image() {
  return renderBrandOg({ eyebrow: customCricketCaps.heroEyebrow, title: customCricketCaps.h1 });
}
