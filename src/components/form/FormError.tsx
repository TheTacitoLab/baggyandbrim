import type { ReactNode } from 'react';

/** An inline field error. Prefixed with a warning glyph so the error is never
 *  signalled by colour alone (build spec 15.4). */
export function FormError({ id, children }: { id: string; children: ReactNode }) {
  return (
    <p id={id} className="type-body-s mt-2 flex items-start gap-2 text-[color:var(--colour-cream)]">
      <svg
        width="16"
        height="16"
        viewBox="0 0 16 16"
        aria-hidden="true"
        fill="none"
        className="mt-0.5 shrink-0"
      >
        <path d="M8 1L15 14H1L8 1Z" stroke="currentColor" strokeWidth="1.3" />
        <path d="M8 6v3.5" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" />
        <circle cx="8" cy="11.5" r="0.8" fill="currentColor" />
      </svg>
      <span>{children}</span>
    </p>
  );
}
