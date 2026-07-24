import Link from 'next/link';
import { COMMERCIAL_LINKS } from '@/content/navigation';
import { ScorebookRule } from '@/components/ui/ScorebookRule';

export default function NotFound() {
  const links = [
    ...COMMERCIAL_LINKS,
    { label: 'The Journal', href: '/journal', description: undefined },
    { label: 'Start Your Cap Brief', href: '/enquire', description: undefined },
  ];
  return (
    <section data-surface="ink" className="min-h-[75vh] bg-ink text-paper">
      <div className="shell section-pad pt-[calc(var(--header-height)+4rem)]">
        <p className="type-display-xl">404</p>
        <p className="type-body-l mt-8 max-w-[42ch]">
          That page has been retired. Try the headwear, the Journal, or start a brief.
        </p>
        <ul className="mt-12 max-w-[52ch]">
          {links.map((link) => (
            <li key={link.href}>
              <ScorebookRule animate={false} />
              <Link href={link.href} className="type-heading-s block py-4">
                <span className="text-link">{link.label}</span>
              </Link>
            </li>
          ))}
          <ScorebookRule animate={false} />
        </ul>
      </div>
    </section>
  );
}
