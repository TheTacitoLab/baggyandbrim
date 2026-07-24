import type { ReactNode } from 'react';
import { cn } from '@/lib/utils';
import { FormError } from './FormError';

interface FormFieldProps {
  id: string;
  name: string;
  label: string;
  type?: 'text' | 'email' | 'tel' | 'date';
  required?: boolean;
  value: string;
  error?: string;
  autoComplete?: string;
  inputMode?: 'text' | 'email' | 'tel' | 'numeric';
  maxLength?: number;
  min?: string;
  multiline?: boolean;
  rows?: number;
  className?: string;
  onChange: (value: string) => void;
  onBlur: () => void;
  notice?: ReactNode; // e.g. the urgent-date notice, wired via aria-describedby
  noticeId?: string;
}

/** A labelled single input. Label always visible above the field; no
 *  placeholder-as-label. Errors associated via aria-describedby (Section 15.8). */
export function FormField({
  id,
  name,
  label,
  type = 'text',
  required = false,
  value,
  error,
  autoComplete,
  inputMode,
  maxLength,
  min,
  multiline = false,
  rows = 4,
  className,
  onChange,
  onBlur,
  notice,
  noticeId,
}: FormFieldProps) {
  const errorId = `${id}-error`;
  const describedBy =
    [error ? errorId : null, notice && noticeId ? noticeId : null].filter(Boolean).join(' ') ||
    undefined;

  return (
    <div className={className}>
      <label htmlFor={id} className="type-label block">
        {label}
        {required && (
          <span aria-hidden="true" className="ml-1">
            *
          </span>
        )}
      </label>
      {multiline ? (
        <textarea
          id={id}
          name={name}
          required={required}
          value={value}
          rows={rows}
          maxLength={maxLength}
          aria-invalid={error ? true : undefined}
          aria-describedby={describedBy}
          onChange={(event) => onChange(event.target.value)}
          onBlur={onBlur}
          className={cn('field-textarea mt-3')}
        />
      ) : (
        <input
          id={id}
          name={name}
          type={type}
          required={required}
          value={value}
          autoComplete={autoComplete}
          inputMode={inputMode}
          maxLength={maxLength}
          min={min}
          aria-invalid={error ? true : undefined}
          aria-describedby={describedBy}
          onChange={(event) => onChange(event.target.value)}
          onBlur={onBlur}
          className={cn('field-input mt-3')}
        />
      )}
      {notice}
      {error && <FormError id={errorId}>{error}</FormError>}
    </div>
  );
}
