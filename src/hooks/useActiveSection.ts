'use client';

import { useEffect, useState } from 'react';

/**
 * Watches the given section IDs and returns the one currently in the reading
 * band. If two sections intersect, the later one wins (build spec Section 1,
 * active section indication). One IntersectionObserver, not a scroll listener.
 */
export function useActiveSection(ids: string[]): string | null {
  const [active, setActive] = useState<string | null>(null);

  useEffect(() => {
    if (ids.length === 0) return;

    const visible = new Set<string>();
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) visible.add(entry.target.id);
          else visible.delete(entry.target.id);
        }
        // The later section in document order wins when several intersect.
        let next: string | null = null;
        for (const id of ids) {
          if (visible.has(id)) next = id;
        }
        if (next) setActive(next);
      },
      { rootMargin: '-45% 0px -50% 0px', threshold: 0 },
    );

    const elements = ids
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => el !== null);
    elements.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, [ids]);

  return active;
}
