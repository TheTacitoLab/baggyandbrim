import { CONTACT } from '@/content/site';

// Enquiry form microcopy, shared by the homepage section and /enquire
// (build spec Section 15). British English. No response-time claim is made.

export const ENQUIRY_FORM = {
  requiredLegend: 'Required fields are marked with an asterisk',
  submitIdle: 'Send My Headwear Brief',
  submitBusy: 'Sending',
  fields: {
    fullName: 'Full name',
    email: 'Email address',
    phone: 'Phone number',
    organisation: 'Club or organisation',
    hatTypes: 'Headwear type',
    volume: 'Volume required',
    targetDate: 'Target delivery date',
    message: 'Anything else',
  },
  urgentNotice:
    'That is a tight turnaround. Send the brief anyway and we will tell you honestly what is possible before you commit to anything.',
  banners: {
    // Only append an email clause when a real address exists (never a placeholder).
    recoverable: CONTACT.email
      ? `That did not send. Check your connection and try again. If it keeps failing, email us at ${CONTACT.email} and we will pick it up from there.`
      : 'That did not send. Check your connection and try again. If it keeps failing, come back to us in a little while.',
    rateLimit:
      CONTACT.email
        ? `That is a few briefs in quick succession. Give it ten minutes, or email us at ${CONTACT.email}.`
        : 'That is a few briefs in quick succession. Give it ten minutes and try again.',
  },
  success: {
    heading: 'Brief received. We are on it.',
    body: 'We will review what you have sent and come back to you to confirm the detail. Nothing is produced until you have seen and approved a design.',
    urgentLine:
      'If your date is tight, reply to us with the deadline and we will prioritise it.',
  },
} as const;
