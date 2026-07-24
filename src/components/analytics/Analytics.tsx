'use client';

import Link from 'next/link';
import { GoogleAnalytics } from '@next/third-parties/google';
import { useSyncExternalStore } from 'react';

// GA4 gated behind NEXT_PUBLIC_GA_ID. When the consent banner is enabled
// (NEXT_PUBLIC_ENABLE_CONSENT_BANNER=true), GA loads only after acceptance and
// the choice is stored in localStorage rather than a cookie (build spec 30).
// The banner is left disabled until the legal position is confirmed (TODO-16).

const KEY = 'bb-consent';
const EVENT = 'bb-consent-change';
type Choice = 'accepted' | 'rejected';

// The consent choice as an external store — no setState-in-effect, no hydration
// mismatch (server snapshot is null).
function subscribe(callback: () => void): () => void {
  window.addEventListener(EVENT, callback);
  window.addEventListener('storage', callback);
  return () => {
    window.removeEventListener(EVENT, callback);
    window.removeEventListener('storage', callback);
  };
}
function readChoice(): Choice | null {
  const value = localStorage.getItem(KEY);
  return value === 'accepted' || value === 'rejected' ? value : null;
}

export function Analytics({ gaId, consentRequired }: { gaId?: string; consentRequired: boolean }) {
  const choice = useSyncExternalStore(subscribe, readChoice, () => null);

  if (!gaId) return null;
  if (!consentRequired) return <GoogleAnalytics gaId={gaId} />;

  const decide = (value: Choice) => {
    localStorage.setItem(KEY, value);
    window.dispatchEvent(new Event(EVENT));
  };

  return (
    <>
      {choice === 'accepted' && <GoogleAnalytics gaId={gaId} />}
      {choice === null && (
        <div
          role="dialog"
          aria-label="Analytics consent"
          data-surface="ink"
          className="fixed inset-x-0 bottom-0 z-40 bg-ink text-paper"
          style={{ paddingBottom: 'env(safe-area-inset-bottom)' }}
        >
          <div className="shell flex flex-col gap-4 py-4 sm:flex-row sm:items-center sm:justify-between">
            <p className="type-body-s max-w-[60ch]">
              This site can use analytics to understand how it is used. You choose whether to allow
              it. See the{' '}
              <Link href="/privacy" className="text-link">
                Privacy Policy
              </Link>
              .
            </p>
            <div className="flex shrink-0 gap-3">
              <button type="button" onClick={() => decide('rejected')} className="btn btn-secondary">
                Reject
              </button>
              <button type="button" onClick={() => decide('accepted')} className="btn btn-primary">
                Accept
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
