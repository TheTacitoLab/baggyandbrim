'use client';

import Link from 'next/link';
import { useEffect, useMemo, useRef, useState } from 'react';
import { HAT_TYPES, SITE } from '@/content/site';
import { ENQUIRY_FORM } from '@/content/enquiry';
import {
  VOLUME_VALUES,
  enquirySchema,
  fieldErrors,
  isUrgentDate,
} from '@/lib/validation/enquiry';
import { daysUntil } from '@/lib/utils';
import { track } from '@/lib/analytics';
import type { EnquiryResponse } from '@/types';
import { FormField } from './FormField';
import { CheckboxGroup } from './CheckboxGroup';
import { RadioGroup } from './RadioGroup';
import { FormError } from './FormError';
import { FormSuccess } from './FormSuccess';

interface EnquiryFormProps {
  source: 'homepage' | 'enquire-page';
}

interface Values {
  fullName: string;
  email: string;
  phone: string;
  organisation: string;
  hatTypes: string[];
  volume: string;
  targetDate: string;
  message: string;
  consent: boolean;
  botcheck: string;
}

const EMPTY: Values = {
  fullName: '',
  email: '',
  phone: '',
  organisation: '',
  hatTypes: [],
  volume: '',
  targetDate: '',
  message: '',
  consent: false,
  botcheck: '',
};

const FIELD_ORDER = [
  'fullName',
  'email',
  'phone',
  'organisation',
  'hatTypes',
  'volume',
  'targetDate',
  'message',
  'consent',
] as const;

const LABELS = ENQUIRY_FORM.fields;

function focusField(name: string) {
  const el =
    document.getElementById(`field-${name}`) ??
    document.querySelector<HTMLElement>(`[name="${name}"]`);
  el?.focus();
}

export function EnquiryForm({ source }: EnquiryFormProps) {
  const [values, setValues] = useState<Values>(EMPTY);
  const [touched, setTouched] = useState<Record<string, boolean>>({});
  const [serverErrors, setServerErrors] = useState<Record<string, string>>({});
  const [submitAttempted, setSubmitAttempted] = useState(false);
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success'>('idle');
  const [banner, setBanner] = useState<string | null>(null);
  const [submittedUrgent, setSubmittedUrgent] = useState(false);
  const [dateMin, setDateMin] = useState('');
  const started = useRef(false);

  // min = today, computed on the client to respect the user's timezone.
  useEffect(() => {
    const now = new Date();
    const iso = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}-${String(
      now.getDate(),
    ).padStart(2, '0')}`;
    setDateMin(iso);
  }, []);

  useEffect(() => {
    if (status === 'success') {
      document.getElementById('enquiry-success-heading')?.focus();
    }
  }, [status]);

  const clientErrors = useMemo(() => {
    const parsed = enquirySchema.safeParse({
      ...values,
      consent: values.consent,
    });
    return parsed.success ? {} : fieldErrors(parsed.error);
  }, [values]);

  const errorFor = (name: string): string | undefined => {
    if (serverErrors[name]) return serverErrors[name];
    if (touched[name] || submitAttempted) return clientErrors[name];
    return undefined;
  };

  const markStarted = () => {
    if (started.current) return;
    started.current = true;
    track('enquiry_start', { source });
  };

  const setField = <K extends keyof Values>(name: K, value: Values[K]) => {
    setValues((prev) => ({ ...prev, [name]: value }));
    setServerErrors((prev) => {
      if (!prev[name as string]) return prev;
      const next = { ...prev };
      delete next[name as string];
      return next;
    });
    markStarted();
  };

  const blur = (name: string) => setTouched((prev) => ({ ...prev, [name]: true }));

  const toggleHat = (value: string, checked: boolean) => {
    setField(
      'hatTypes',
      checked ? [...values.hatTypes, value] : values.hatTypes.filter((v) => v !== value),
    );
    setTouched((prev) => ({ ...prev, hatTypes: true }));
    track('enquiry_hat_type_select', { hat_type: value, selected: String(checked) });
  };

  const chooseVolume = (value: string) => {
    setField('volume', value);
    setTouched((prev) => ({ ...prev, volume: true }));
    track('enquiry_volume_select', { volume: value });
  };

  const changeDate = (value: string) => {
    setField('targetDate', value);
    if (isUrgentDate(value)) track('enquiry_date_urgent', { days_ahead: daysUntil(value) });
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    if (status === 'submitting') return;

    const parsed = enquirySchema.safeParse({ ...values, consent: values.consent });
    if (!parsed.success) {
      setSubmitAttempted(true);
      const errs = fieldErrors(parsed.error);
      track('enquiry_validation_error', { fields: Object.keys(errs).join(',') });
      const first = FIELD_ORDER.find((name) => errs[name]);
      if (first) requestAnimationFrame(() => focusField(first));
      return;
    }

    setStatus('submitting');
    setBanner(null);
    try {
      const res = await fetch('/api/enquiry', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(parsed.data),
      });
      const data = (await res.json().catch(() => ({}))) as EnquiryResponse;

      if (res.ok && 'ok' in data && data.ok) {
        setSubmittedUrgent(isUrgentDate(values.targetDate));
        setStatus('success');
        track('enquiry_submit', {
          source,
          volume: values.volume,
          hat_types: values.hatTypes.join('|'),
          days_ahead: daysUntil(values.targetDate),
        });
        return;
      }

      if (res.status === 400 && 'kind' in data && data.kind === 'validation') {
        setSubmitAttempted(true);
        setServerErrors(data.errors);
        const first = FIELD_ORDER.find((name) => data.errors[name]);
        if (first) requestAnimationFrame(() => focusField(first));
        setStatus('idle');
        track('enquiry_submit_failed', { source, reason: 'validation' });
        return;
      }

      if (res.status === 429) {
        setBanner(ENQUIRY_FORM.banners.rateLimit);
        setStatus('idle');
        track('enquiry_submit_failed', { source, reason: 'rate-limit' });
        return;
      }

      setBanner(ENQUIRY_FORM.banners.recoverable);
      setStatus('idle');
      track('enquiry_submit_failed', { source, reason: 'upstream' });
    } catch {
      setBanner(ENQUIRY_FORM.banners.recoverable);
      setStatus('idle');
      track('enquiry_submit_failed', { source, reason: 'network' });
    }
  };

  if (status === 'success') {
    return (
      <div aria-live="polite">
        <FormSuccess
          heading={ENQUIRY_FORM.success.heading}
          body={ENQUIRY_FORM.success.body}
          urgentNote={submittedUrgent ? ENQUIRY_FORM.success.urgentLine : undefined}
        />
      </div>
    );
  }

  const summaryErrors = submitAttempted
    ? FIELD_ORDER.filter((name) => errorFor(name)).map((name) => ({
        name,
        label: LABELS[name as keyof typeof LABELS] ?? name,
      }))
    : [];

  const submitting = status === 'submitting';

  return (
    <form onSubmit={handleSubmit} onFocusCapture={markStarted} noValidate aria-busy={submitting}>
      <p className="type-body-s text-on-surface-secondary">{ENQUIRY_FORM.requiredLegend}</p>

      {summaryErrors.length > 0 && (
        <div
          role="alert"
          className="mt-5 border-l-2 border-[color:var(--colour-cream)] pl-4 text-[color:var(--colour-cream)]"
        >
          <p className="type-body-s">
            There {summaryErrors.length === 1 ? 'is' : 'are'} {summaryErrors.length}{' '}
            {summaryErrors.length === 1 ? 'thing' : 'things'} to fix before this can be sent.
          </p>
          <ul className="mt-2 flex flex-col gap-1">
            {summaryErrors.map((item) => (
              <li key={item.name}>
                <a
                  href={`#field-${item.name}`}
                  onClick={(e) => {
                    e.preventDefault();
                    focusField(item.name);
                  }}
                  className="type-body-s underline underline-offset-4"
                >
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </div>
      )}

      {banner && (
        <div
          role="alert"
          aria-live="assertive"
          className="mt-5 border border-[color:var(--colour-rule-inverse)] p-4 text-[color:var(--colour-cream)]"
        >
          <p className="type-body-s">{banner}</p>
        </div>
      )}

      <div className="mt-8 flex flex-col gap-8">
        <FormField
          id="field-fullName"
          name="fullName"
          label={LABELS.fullName}
          required
          autoComplete="name"
          maxLength={100}
          value={values.fullName}
          error={errorFor('fullName')}
          onChange={(v) => setField('fullName', v)}
          onBlur={() => blur('fullName')}
        />

        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2">
          <FormField
            id="field-email"
            name="email"
            type="email"
            label={LABELS.email}
            required
            autoComplete="email"
            inputMode="email"
            maxLength={254}
            value={values.email}
            error={errorFor('email')}
            onChange={(v) => setField('email', v)}
            onBlur={() => blur('email')}
          />
          <FormField
            id="field-phone"
            name="phone"
            type="tel"
            label={LABELS.phone}
            required
            autoComplete="tel"
            inputMode="tel"
            maxLength={30}
            value={values.phone}
            error={errorFor('phone')}
            onChange={(v) => setField('phone', v)}
            onBlur={() => blur('phone')}
          />
        </div>

        <CheckboxGroup
          legend={LABELS.hatTypes}
          name="hatTypes"
          options={HAT_TYPES}
          values={values.hatTypes}
          required
          error={errorFor('hatTypes')}
          errorId="field-hatTypes-error"
          onToggle={toggleHat}
        />

        <RadioGroup
          legend={LABELS.volume}
          name="volume"
          options={VOLUME_VALUES}
          value={values.volume}
          required
          error={errorFor('volume')}
          errorId="field-volume-error"
          onChange={chooseVolume}
        />

        <FormField
          id="field-targetDate"
          name="targetDate"
          type="date"
          label={LABELS.targetDate}
          required
          min={dateMin}
          value={values.targetDate}
          error={errorFor('targetDate')}
          onChange={changeDate}
          onBlur={() => blur('targetDate')}
          className="max-w-[240px]"
          noticeId="field-targetDate-notice"
          notice={
            isUrgentDate(values.targetDate) ? (
              <p
                id="field-targetDate-notice"
                aria-live="polite"
                className="type-body-s mt-3 flex items-start gap-2 text-[color:var(--colour-cream)]"
              >
                <svg width="16" height="16" viewBox="0 0 16 16" aria-hidden="true" fill="none" className="mt-0.5 shrink-0">
                  <circle cx="8" cy="8" r="6.5" stroke="currentColor" strokeWidth="1.3" />
                  <path d="M8 4.5V8l2.5 1.5" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" />
                </svg>
                <span>{ENQUIRY_FORM.urgentNotice}</span>
              </p>
            ) : undefined
          }
        />

        <FormField
          id="field-organisation"
          name="organisation"
          label={LABELS.organisation}
          autoComplete="organization"
          maxLength={120}
          value={values.organisation}
          error={errorFor('organisation')}
          onChange={(v) => setField('organisation', v)}
          onBlur={() => blur('organisation')}
        />

        <FormField
          id="field-message"
          name="message"
          label={LABELS.message}
          multiline
          rows={4}
          maxLength={2000}
          value={values.message}
          error={errorFor('message')}
          onChange={(v) => setField('message', v)}
          onBlur={() => blur('message')}
        />

        <div>
          <label htmlFor="field-consent" className="field-check items-start">
            <input
              id="field-consent"
              name="consent"
              type="checkbox"
              checked={values.consent}
              aria-invalid={errorFor('consent') ? true : undefined}
              aria-describedby={errorFor('consent') ? 'field-consent-error' : undefined}
              onChange={(e) => {
                setField('consent', e.target.checked);
                setTouched((prev) => ({ ...prev, consent: true }));
              }}
            />
            <span className="type-body-s">
              I agree to {SITE.name} storing these details in order to respond to my enquiry. See the{' '}
              <Link href="/privacy" className="text-link">
                Privacy Policy
              </Link>
              .
            </span>
          </label>
          {errorFor('consent') && <FormError id="field-consent-error">{errorFor('consent')}</FormError>}
        </div>

        {/* Honeypot: off-screen, never display:none. */}
        <div className="hp-field" aria-hidden="true">
          <label htmlFor="field-botcheck">Do not fill this in</label>
          <input
            id="field-botcheck"
            name="botcheck"
            type="checkbox"
            tabIndex={-1}
            autoComplete="off"
            checked={values.botcheck === 'on'}
            onChange={(e) => setField('botcheck', e.target.checked ? 'on' : '')}
          />
        </div>

        <div>
          <button type="submit" disabled={submitting} className="btn btn-primary w-full sm:w-auto">
            {submitting ? ENQUIRY_FORM.submitBusy : ENQUIRY_FORM.submitIdle}
          </button>
        </div>
      </div>
    </form>
  );
}
