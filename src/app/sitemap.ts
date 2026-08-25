import type { MetadataRoute } from 'next';
import { env } from '@/lib/env';
import { getAllArticles } from '@/lib/journal';

type Freq = MetadataRoute.Sitemap[number]['changeFrequency'];

// Exactly the indexable routes in build spec Section 11. Draft articles excluded.
const STATIC: { path: string; priority: number; changeFrequency: Freq }[] = [
  { path: '/', priority: 1.0, changeFrequency: 'monthly' },
  { path: '/custom-cricket-caps', priority: 0.9, changeFrequency: 'monthly' },
  { path: '/baggy-cricket-caps', priority: 0.9, changeFrequency: 'monthly' },
  { path: '/cricket-sun-hats', priority: 0.9, changeFrequency: 'monthly' },
  { path: '/cricket-presentation-caps', priority: 0.9, changeFrequency: 'monthly' },
  { path: '/journal', priority: 0.7, changeFrequency: 'weekly' },
  { path: '/enquire', priority: 0.8, changeFrequency: 'yearly' },
  { path: '/privacy', priority: 0.2, changeFrequency: 'yearly' },
  { path: '/terms', priority: 0.2, changeFrequency: 'yearly' },
];

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  const staticEntries = STATIC.map((route) => ({
    url: `${env.siteUrl}${route.path}`,
    lastModified: now,
    changeFrequency: route.changeFrequency,
    priority: route.priority,
  }));

  const articleEntries = getAllArticles().map((article) => ({
    url: `${env.siteUrl}/journal/${article.slug}`,
    lastModified: new Date(`${article.updatedDate ?? article.publishedDate}T00:00:00Z`),
    changeFrequency: 'monthly' as Freq,
    priority: 0.6,
  }));

  return [...staticEntries, ...articleEntries];
}
