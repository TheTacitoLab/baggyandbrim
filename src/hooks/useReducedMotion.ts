'use client';

import { useSyncExternalStore } from 'react';

const QUERY = '(prefers-reduced-motion: reduce)';

function subscribe(callback: () => void): () => void {
  const query = window.matchMedia(QUERY);
  query.addEventListener('change', callback);
  return () => query.removeEventListener('change', callback);
}

/**
 * True when the user has requested reduced motion. Uses useSyncExternalStore so
 * there is no setState-in-effect and no hydration mismatch (server assumes no
 * reduced-motion preference). Independent of the Motion library (build spec 26.4).
 */
export function useReducedMotion(): boolean {
  return useSyncExternalStore(
    subscribe,
    () => window.matchMedia(QUERY).matches,
    () => false,
  );
}
