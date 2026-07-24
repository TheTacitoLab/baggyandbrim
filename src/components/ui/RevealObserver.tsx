'use client';

import { useEffect } from 'react';

/**
 * The one shared reveal mechanism (build spec 26.3.1). A single
 * IntersectionObserver watches every [data-reveal] element and adds
 * [data-visible] once, in order, as each enters. A MutationObserver catches
 * elements added by client-side navigation. Reveals never reverse (26.2), so
 * elements are unobserved after firing. Reduced motion is handled entirely in
 * CSS, so this component does no work there beyond the harmless attribute flip.
 */
export function RevealObserver() {
  useEffect(() => {
    if (typeof window === 'undefined') return;

    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          const el = entry.target as HTMLElement;
          el.setAttribute('data-visible', '');
          io.unobserve(el);
        }
      },
      { rootMargin: '0px 0px -10% 0px', threshold: 0.15 },
    );

    const observe = (el: Element) => {
      if (el instanceof HTMLElement && !el.hasAttribute('data-visible')) io.observe(el);
    };

    document.querySelectorAll('[data-reveal]:not([data-visible])').forEach(observe);

    const mo = new MutationObserver((mutations) => {
      for (const mutation of mutations) {
        mutation.addedNodes.forEach((node) => {
          if (!(node instanceof HTMLElement)) return;
          if (node.matches('[data-reveal]')) observe(node);
          node.querySelectorAll('[data-reveal]:not([data-visible])').forEach(observe);
        });
      }
    });
    mo.observe(document.body, { childList: true, subtree: true });

    return () => {
      io.disconnect();
      mo.disconnect();
    };
  }, []);

  return null;
}
