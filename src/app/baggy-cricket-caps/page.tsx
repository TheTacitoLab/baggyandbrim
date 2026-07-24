import type { Metadata } from 'next';
import { buildMetadata } from '@/content/seo';
import { CommercialPage } from '@/components/templates/CommercialPage';
import { baggyCricketCaps } from '@/content/pages/baggy-cricket-caps';

export const metadata: Metadata = buildMetadata({ path: '/baggy-cricket-caps' });

export default function Page() {
  return <CommercialPage content={baggyCricketCaps} />;
}
