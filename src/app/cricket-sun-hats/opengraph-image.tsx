import { renderBrandOg, ogSize, ogContentType } from '@/lib/og';
import { cricketSunHats } from '@/content/pages/cricket-sun-hats';

export const alt = cricketSunHats.h1;
export const size = ogSize;
export const contentType = ogContentType;

export default function Image() {
  return renderBrandOg({ eyebrow: cricketSunHats.heroEyebrow, title: cricketSunHats.h1 });
}
