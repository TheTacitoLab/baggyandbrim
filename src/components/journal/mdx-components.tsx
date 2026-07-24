import fs from 'node:fs';
import path from 'node:path';
import Image from 'next/image';
import Link from 'next/link';
import type { ReactNode } from 'react';
import { slugify, cn } from '@/lib/utils';
import { aspectToCss } from '@/lib/utils';
import type { CSSProperties } from 'react';
import { ScorebookRule } from '@/components/ui/ScorebookRule';
import { RelatedLinks } from '@/components/ui/RelatedLinks';

// The deliberately small MDX component set (build spec 14.4). No component can be
// used to invent data, so there is no Statistic, Rating or Testimonial.

function textOf(node: ReactNode): string {
  if (typeof node === 'string' || typeof node === 'number') return String(node);
  if (Array.isArray(node)) return node.map(textOf).join('');
  if (node && typeof node === 'object' && 'props' in node) {
    return textOf((node as { props: { children?: ReactNode } }).props.children);
  }
  return '';
}

function Figure({
  src,
  alt,
  caption,
  ratio = '3:2',
}: {
  src?: string;
  alt: string;
  caption?: string;
  ratio?: string;
}) {
  const exists =
    !!src && fs.existsSync(path.join(process.cwd(), 'public', src.replace(/^\//, '')));
  const frameStyle = { '--ar-d': aspectToCss(ratio) } as CSSProperties;
  return (
    <figure className="my-10">
      <div className="media-frame" style={frameStyle}>
        {exists ? (
          <Image src={src!} alt={alt} fill sizes="(max-width: 767px) 100vw, 68ch" className="object-cover" />
        ) : (
          <div
            aria-hidden="true"
            className="absolute inset-0 flex items-end p-4"
            style={{ outline: '1px solid var(--colour-rule)', outlineOffset: '-1px' }}
          >
            <span className="type-body-s text-[color:var(--colour-grey)]">{alt}</span>
          </div>
        )}
      </div>
      {caption && (
        <figcaption className="type-body-s mt-3 text-on-surface-secondary">{caption}</figcaption>
      )}
    </figure>
  );
}

function PullQuote({ children }: { children: ReactNode }) {
  return (
    <blockquote className="my-10 border-l border-[color:var(--rule)] pl-6">
      <p className="type-display-m">{children}</p>
    </blockquote>
  );
}

// items is a pipe-delimited string. MDX passes string attributes reliably, where
// array-expression attributes do not always survive compilation.
function KeyPoints({ heading = 'Key points', items = '' }: { heading?: string; items?: string }) {
  const points = items
    .split('|')
    .map((point) => point.trim())
    .filter(Boolean);
  if (points.length === 0) return null;
  return (
    <aside className="my-10">
      <p className="type-label text-on-surface-secondary">{heading}</p>
      <ul className="mt-4">
        {points.map((point) => (
          <li key={point}>
            <ScorebookRule animate={false} />
            <p className="type-body py-3">{point}</p>
          </li>
        ))}
        <ScorebookRule animate={false} />
      </ul>
    </aside>
  );
}

function InlineCTA({
  line = 'If a cap is on your mind, the quickest way to an answer is to send us a brief.',
}: {
  line?: string;
}) {
  return (
    <aside className="my-12">
      <ScorebookRule animate={false} />
      <div className="flex flex-col gap-4 py-6 sm:flex-row sm:items-center sm:justify-between">
        <p className="type-body-l max-w-[44ch]">{line}</p>
        <Link href="/enquire" className="btn btn-primary shrink-0">
          Start Your Cap Brief
        </Link>
      </div>
      <ScorebookRule animate={false} />
    </aside>
  );
}

function Anchor({ href, children }: { href?: string; children?: ReactNode }) {
  const external = !!href && /^https?:\/\//.test(href);
  return (
    <Link
      href={href ?? '#'}
      className="text-link"
      rel={external ? 'noopener noreferrer' : undefined}
      target={external ? '_blank' : undefined}
    >
      {children}
    </Link>
  );
}

export const mdxComponents = {
  h2: ({ children }: { children?: ReactNode }) => (
    <h2 id={slugify(textOf(children))} className="type-heading-m mt-14 scroll-mt-32">
      {children}
    </h2>
  ),
  h3: ({ children }: { children?: ReactNode }) => (
    <h3 id={slugify(textOf(children))} className="type-heading-s mt-10 scroll-mt-32">
      {children}
    </h3>
  ),
  p: ({ children }: { children?: ReactNode }) => (
    <p className="type-body my-5 text-on-surface">{children}</p>
  ),
  ul: ({ children }: { children?: ReactNode }) => (
    <ul className="my-5 flex list-disc flex-col gap-2 pl-6">{children}</ul>
  ),
  ol: ({ children }: { children?: ReactNode }) => (
    <ol className="my-5 flex list-decimal flex-col gap-2 pl-6">{children}</ol>
  ),
  li: ({ children }: { children?: ReactNode }) => <li className="type-body">{children}</li>,
  blockquote: ({ children }: { children?: ReactNode }) => <PullQuote>{children}</PullQuote>,
  a: Anchor,
  strong: ({ children }: { children?: ReactNode }) => (
    <strong className={cn('font-semibold')}>{children}</strong>
  ),
  hr: () => (
    <div className="my-10">
      <ScorebookRule animate={false} />
    </div>
  ),
  Figure,
  PullQuote,
  KeyPoints,
  InlineCTA,
  RelatedLinks,
};
