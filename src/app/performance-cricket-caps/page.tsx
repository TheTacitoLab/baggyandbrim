import type { Metadata } from 'next';
import { buildMetadata } from '@/content/seo';
import { CommercialPage } from '@/components/templates/CommercialPage';
import { performanceCricketCaps } from '@/content/pages/performance-cricket-caps';

export const metadata: Metadata = buildMetadata({ path: '/performance-cricket-caps' });

export default function Page() {
  return <CommercialPage content={performanceCricketCaps} />;
}
