import type { ReactNode } from 'react';
import type { JournalArticle } from '@/types';
import { JournalCard } from './JournalCard';
import { cn } from '@/lib/utils';

interface JournalGridProps {
  articles: JournalArticle[];
  columns?: 2 | 3;
  showExcerpt?: boolean;
  location?: string;
  emptyState?: ReactNode;
  headingLevel?: 'h2' | 'h3';
}

export function JournalGrid({
  articles,
  columns = 3,
  showExcerpt = true,
  location = 'journal',
  emptyState,
  headingLevel = 'h3',
}: JournalGridProps) {
  if (articles.length === 0) return <>{emptyState ?? null}</>;
  return (
    <div
      className={cn(
        'grid grid-cols-1 gap-x-8 gap-y-12 md:grid-cols-2',
        columns === 3 && 'lg:grid-cols-3',
      )}
    >
      {articles.map((article) => (
        <JournalCard
          key={article.slug}
          article={article}
          showExcerpt={showExcerpt}
          location={location}
          headingLevel={headingLevel}
        />
      ))}
    </div>
  );
}
