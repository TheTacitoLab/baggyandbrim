'use client';

import { useEffect, useState } from 'react';

/** The right-margin step counter (build spec Section 8). Instant text swap, no
 *  animated numerals. aria-hidden because it duplicates visible step content. */
export function ProcessCounter({ total }: { total: number }) {
  const [active, setActive] = useState(0);

  useEffect(() => {
    const steps = Array.from(document.querySelectorAll<HTMLElement>('[data-process-step]'));
    if (steps.length === 0) return;
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setActive(Number((entry.target as HTMLElement).dataset.processStep));
          }
        }
      },
      { rootMargin: '-45% 0px -50% 0px' },
    );
    steps.forEach((step) => observer.observe(step));
    return () => observer.disconnect();
  }, []);

  const pad = (n: number) => String(n).padStart(2, '0');
  return (
    <div aria-hidden="true" className="type-number text-on-surface-secondary">
      {pad(active + 1)} / {pad(total)}
    </div>
  );
}
