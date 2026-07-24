import { renderBrandOg, ogSize, ogContentType } from '@/lib/og';
import { performanceCricketCaps } from '@/content/pages/performance-cricket-caps';

export const alt = performanceCricketCaps.h1;
export const size = ogSize;
export const contentType = ogContentType;

export default function Image() {
  return renderBrandOg({ eyebrow: performanceCricketCaps.heroEyebrow, title: performanceCricketCaps.h1 });
}
