import {
  useFormContext,
  useFormState,
  type FieldPath,
  type FieldValues,
} from 'react-hook-form';

type FormInputProps<T extends FieldValues> = {
  name: FieldPath<T>;
  label: string;
  type?: 'text' | 'email' | 'tel' | 'date' | 'number';
  placeholder?: string;
  required?: boolean;
  min?: string | number;
};

export default function FormInput<T extends FieldValues>({
  name,
  label,
  type = 'text',
  placeholder,
  required = false,
  min,
}: FormInputProps<T>) {
  const { register, control } = useFormContext<T>();
  const { errors } = useFormState({ control, name });

  const error = name
    .split('.')
    .reduce<unknown>((current, key) => {
      if (current && typeof current === 'object') {
        return (current as Record<string, unknown>)[key];
      }
      return undefined;
    }, errors);

  const message =
    error && typeof error === 'object' && 'message' in error
      ? String(error.message)
      : undefined;

  const inputId = `field-${String(name).replaceAll('.', '-')}`;
  const errorId = `${inputId}-error`;

  return (
    <div className="form-field">
      <label htmlFor={inputId}>
        {label}
        {required && <span aria-hidden="true"> *</span>}
      </label>

      <input
        id={inputId}
        type={type}
        placeholder={placeholder}
        min={min}
        aria-invalid={Boolean(message)}
        aria-describedby={message ? errorId : undefined}
        {...register(
            name,
            type === 'number' ? { valueAsNumber: true } : undefined,
        )}
      />

      {message && (
        <p id={errorId} className="field-error" role="alert">
          {message}
        </p>
      )}
    </div>
  );
}