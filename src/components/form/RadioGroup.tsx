import { FormError } from './FormError';

interface RadioGroupProps {
  legend: string;
  name: string;
  options: readonly string[];
  value: string;
  required?: boolean;
  error?: string;
  errorId: string;
  onChange: (value: string) => void;
}

/** Radio group in a fieldset with a visible legend, a single ruled row on
 *  desktop and two-by-two on mobile (build spec 15.2). */
export function RadioGroup({
  legend,
  name,
  options,
  value,
  required = false,
  error,
  errorId,
  onChange,
}: RadioGroupProps) {
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
      <div className="mt-4 grid grid-cols-2 lg:grid-cols-4">
        {options.map((option) => {
          const id = `${name}-${option.replace(/[^a-z0-9]+/gi, '-').toLowerCase()}`;
          return (
            <label
              key={option}
              htmlFor={id}
              className="field-check border-t border-[color:var(--colour-rule-inverse)] py-1"
            >
              <input
                id={id}
                type="radio"
                name={name}
                value={option}
                checked={value === option}
                onChange={() => onChange(option)}
              />
              <span className="type-body tabular">{option}</span>
            </label>
          );
        })}
      </div>
      {error && <FormError id={errorId}>{error}</FormError>}
    </fieldset>
  );
}
