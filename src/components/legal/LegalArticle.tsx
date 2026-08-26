import type { ComponentPropsWithoutRef } from 'react';
import { MDXRemote } from 'next-mdx-remote/rsc';
import remarkGfm from 'remark-gfm';

// Renderer for the privacy and terms documents (build spec 3.6): headings at
// the normal scale, no display type, body copy at the reading measure set by
// the page container. Tables scroll inside their own container on narrow
// screens rather than widening the page.
const components = {
  h2: ({ children, ...props }: ComponentPropsWithoutRef<'h2'>) => (
    <h2 className="type-heading-m mt-14 first:mt-0" {...props}>
      {children}
    </h2>
  ),
  h3: ({ children, ...props }: ComponentPropsWithoutRef<'h3'>) => (
    <h3 className="type-heading-s mt-10" {...props}>
      {children}
    </h3>
  ),
  h4: ({ children, ...props }: ComponentPropsWithoutRef<'h4'>) => (
    <h4 className="type-body-l mt-8 font-semibold" {...props}>
      {children}
    </h4>
  ),
  p: (props: ComponentPropsWithoutRef<'p'>) => (
    <p className="type-body mt-4 text-on-surface" {...props} />
  ),
  ul: (props: ComponentPropsWithoutRef<'ul'>) => (
    <ul className="mt-4 flex list-disc flex-col gap-2 pl-5" {...props} />
  ),
  ol: (props: ComponentPropsWithoutRef<'ol'>) => (
    <ol className="mt-4 flex list-decimal flex-col gap-2 pl-5" {...props} />
  ),
  li: (props: ComponentPropsWithoutRef<'li'>) => <li className="type-body" {...props} />,
  strong: (props: ComponentPropsWithoutRef<'strong'>) => (
    <strong className="font-semibold" {...props} />
  ),
  hr: () => <hr className="mt-12 border-0 border-t border-[color:var(--rule)]" />,
  table: (props: ComponentPropsWithoutRef<'table'>) => (
    <div className="mt-6 overflow-x-auto">
      <table className="w-full border-collapse text-left" {...props} />
    </div>
  ),
  th: (props: ComponentPropsWithoutRef<'th'>) => (
    <th
      className="type-body-s border-b border-[color:var(--rule)] py-3 pr-6 align-top font-semibold"
      {...props}
    />
  ),
  td: (props: ComponentPropsWithoutRef<'td'>) => (
    <td className="type-body-s border-b border-[color:var(--rule)] py-3 pr-6 align-top" {...props} />
  ),
};

export function LegalArticle({ source }: { source: string }) {
  return (
    <MDXRemote
      source={source}
      components={components}
      options={{ mdxOptions: { remarkPlugins: [remarkGfm] } }}
    />
  );
}
