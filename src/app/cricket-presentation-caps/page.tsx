import type { Metadata } from 'next';
import { buildMetadata } from '@/content/seo';
import { CommercialPage } from '@/components/templates/CommercialPage';
import { cricketPresentationCaps } from '@/content/pages/cricket-presentation-caps';

export const metadata: Metadata = buildMetadata({ path: '/cricket-presentation-caps' });

export default function Page() {
  return <CommercialPage content={cricketPresentationCaps} />;
}
