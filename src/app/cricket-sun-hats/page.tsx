import type { Metadata } from 'next';
import { buildMetadata } from '@/content/seo';
import { CommercialPage } from '@/components/templates/CommercialPage';
import { cricketSunHats } from '@/content/pages/cricket-sun-hats';

export const metadata: Metadata = buildMetadata({ path: '/cricket-sun-hats' });

export default function Page() {
  return <CommercialPage content={cricketSunHats} />;
}
