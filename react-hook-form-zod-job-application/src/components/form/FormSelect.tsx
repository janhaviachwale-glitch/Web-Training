import {
  useFormContext,
  useFormState,
  type FieldPath,
  type FieldValues,
} from 'react-hook-form';

type FormSelectProps<T extends FieldValues> = {
  name: FieldPath<T>;
  label: string;
  options: { label: string; value: string }[];
  placeholder?: string;
  required?: boolean;
};

export default function FormSelect<T extends FieldValues>({
  name,
  label,
  options,
  placeholder = 'Select an option',
  required = false,
}: FormSelectProps<T>) {
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

      <select
        id={id}
        aria-invalid={Boolean(message)}
        aria-describedby={message ? `${id}-error` : undefined}
        {...register(name)}
      >
        <option value="">{placeholder}</option>

        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>

      {message && (
        <p id={`${id}-error`} className="field-error" role="alert">
          {message}
        </p>
      )}
    </div>
  );
}