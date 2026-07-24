// GA4 event wrapper (build spec Section 30). No component calls gtag directly.
// When NEXT_PUBLIC_GA_ID is absent no script loads and every call here is a no-op.

export type AnalyticsEvent =
  | 'cta_hero_click'
  | 'cta_header_click'
  | 'cta_sticky_click'
  | 'cta_section_click'
  | 'headwear_category_click'
  | 'journal_article_click'
  | 'enquiry_start'
  | 'enquiry_hat_type_select'
  | 'enquiry_volume_select'
  | 'enquiry_date_urgent'
  | 'enquiry_validation_error'
  | 'enquiry_submit'
  | 'enquiry_submit_failed'
  | 'contact_email_click'
  | 'contact_phone_click';

type GtagWindow = Window & {
  gtag?: (command: 'event', event: string, params?: Record<string, unknown>) => void;
};

export function track(event: AnalyticsEvent, params: Record<string, string | number> = {}): void {
  if (typeof window === 'undefined') return;
  const gtag = (window as GtagWindow).gtag;
  if (typeof gtag !== 'function') return;
  gtag('event', event, params);
}
