import { renderBrandOg, ogSize, ogContentType } from '@/lib/og';
import { getArticleBySlug } from '@/lib/journal';

export const alt = 'Baggy & Brim Journal';
export const size = ogSize;
export const contentType = ogContentType;

export default async function Image({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const article = getArticleBySlug(slug);
  return renderBrandOg({
    eyebrow: article?.category ?? 'The Journal',
    title: article?.title ?? 'The Journal',
  });
}
