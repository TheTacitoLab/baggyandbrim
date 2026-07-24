'use client';

import Link from 'next/link';
import { useEffect } from 'react';

export default function Error({ error, reset }: { error: Error & { digest?: string }; reset: () => void }) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <section data-surface="ink" className="min-h-[75vh] bg-ink text-paper">
      <div className="shell section-pad pt-[calc(var(--header-height)+4rem)]">
        <p className="type-display-l">Something slipped.</p>
        <p className="type-body-l mt-8 max-w-[42ch] text-on-surface-secondary">
          That did not load as it should. Try again, or head back to the homepage and pick the thread
          up from there.
        </p>
        <div className="mt-10 flex flex-col gap-4 sm:flex-row sm:items-center sm:gap-6">
          <button type="button" onClick={reset} className="btn btn-primary">
            Try again
          </button>
          <Link href="/" className="text-link">
            Back to the homepage
          </Link>
        </div>
      </div>
    </section>
  );
}
