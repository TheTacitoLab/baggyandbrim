import type { MetadataRoute } from 'next';
import { SITE } from '@/content/site';

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: SITE.name,
    short_name: SITE.name,
    description: SITE.description,
    start_url: '/',
    display: 'standalone',
    theme_color: '#11110F',
    background_color: '#F7F6F1',
    icons: [{ src: '/icon.svg', type: 'image/svg+xml', sizes: 'any' }],
  };
}
