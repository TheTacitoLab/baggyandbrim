interface FormSuccessProps {
  heading: string;
  body: string;
  urgentNote?: string;
}

/** Replaces the form in place on success. Focus is moved to the heading by the
 *  form; the region is announced politely (build spec 15.6, 15.7). */
export function FormSuccess({ heading, body, urgentNote }: FormSuccessProps) {
  return (
    <div>
      <h3
        id="enquiry-success-heading"
        tabIndex={-1}
        className="type-heading-m max-w-[20ch] outline-none"
      >
        {heading}
      </h3>
      <p className="type-body mt-5 max-w-[48ch] text-on-surface-secondary">{body}</p>
      {urgentNote && (
        <p className="type-body-s mt-4 max-w-[48ch] text-[color:var(--colour-cream)]">
          {urgentNote}
        </p>
      )}
    </div>
  );
}
