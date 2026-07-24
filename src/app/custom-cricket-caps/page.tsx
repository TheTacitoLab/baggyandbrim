import type { Metadata } from 'next';
import { buildMetadata } from '@/content/seo';
import { CommercialPage } from '@/components/templates/CommercialPage';
import { customCricketCaps } from '@/content/pages/custom-cricket-caps';

export const metadata: Metadata = buildMetadata({ path: '/custom-cricket-caps' });

export default function Page() {
  return <CommercialPage content={customCricketCaps} />;
}
