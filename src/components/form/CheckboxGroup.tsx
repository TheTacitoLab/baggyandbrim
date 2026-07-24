import { FormError } from './FormError';

interface CheckboxGroupProps {
  legend: string;
  name: string;
  options: readonly string[];
  values: string[];
  required?: boolean;
  error?: string;
  errorId: string;
  onToggle: (value: string, checked: boolean) => void;
}

/** Checkbox group in a fieldset with a visible legend, rendered as a ruled
 *  two-by-two grid on desktop (build spec 15.2). */
export function CheckboxGroup({
  legend,
  name,
  options,
  values,
  required = false,
  error,
  errorId,
  onToggle,
}: CheckboxGroupProps) {
  return (
    <fieldset aria-describedby={error ? errorId : undefined}>
      <legend className="type-label">
        {legend}
        {required && (
          <span aria-hidden="true" className="ml-1">
            *
          </span>
        )}
      </legend>
      <div className="mt-4 grid grid-cols-1 sm:grid-cols-2">
        {options.map((option) => {
          const id = `${name}-${option.replace(/\s+/g, '-').toLowerCase()}`;
          return (
            <label
              key={option}
              htmlFor={id}
              className="field-check border-t border-[color:var(--colour-rule-inverse)] py-1"
            >
              <input
                id={id}
                type="checkbox"
                name={name}
                value={option}
                checked={values.includes(option)}
                onChange={(event) => onToggle(option, event.target.checked)}
              />
              <span className="type-body">{option}</span>
            </label>
          );
        })}
      </div>
      {error && <FormError id={errorId}>{error}</FormError>}
    </fieldset>
  );
}
