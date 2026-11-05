import {
  useFormContext,
  useFormState,
  type FieldPath,
  type FieldValues,
} from 'react-hook-form';

type FormTextareaProps<T extends FieldValues> = {
  name: FieldPath<T>;
  label: string;
  placeholder?: string;
  rows?: number;
  required?: boolean;
  maxLength?: number;
};

export default function FormTextarea<T extends FieldValues>({
  name,
  label,
  placeholder,
  rows = 5,
  required = false,
  maxLength,
}: FormTextareaProps<T>) {
  const { register, control } = useFormContext<T>();
  const { errors } = useFormState({ control, name });

  const error = name.split('.').reduce<unknown>((current, key) => {
    if (current && typeof current === 'object') {
      return (current as Record<string, unknown>)[key];
    }
    return undefined;
  }, errors);

  const message =
    error && typeof error === 'object' && 'message' in error
      ? String(error.message)
      : undefined;

  const id = `field-${String(name).replaceAll('.', '-')}`;

  return (
    <div className="form-field">
      <label htmlFor={id}>
        {label}
        {required && <span aria-hidden="true"> *</span>}
      </label>

      <textarea
        id={id}
        rows={rows}
        placeholder={placeholder}
        maxLength={maxLength}
        aria-invalid={Boolean(message)}
        aria-describedby={message ? `${id}-error` : undefined}
        {...register(name)}
      />

      {message && (
        <p id={`${id}-error`} className="field-error" role="alert">
          {message}
        </p>
      )}
    </div>
  );
}