import {
  useFormContext,
  useFormState,
  type FieldPath,
  type FieldValues,
} from 'react-hook-form';

type FormCheckboxProps<T extends FieldValues> = {
  name: FieldPath<T>;
  label: string;
};

export default function FormCheckbox<T extends FieldValues>({
  name,
  label,
}: FormCheckboxProps<T>) {
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
      <div className="checkbox-field">
        <input
          id={id}
          type="checkbox"
          aria-invalid={Boolean(message)}
          aria-describedby={message ? `${id}-error` : undefined}
          {...register(name)}
        />

        <label htmlFor={id}>{label}</label>
      </div>

      {message && (
        <p id={`${id}-error`} className="field-error" role="alert">
          {message}
        </p>
      )}
    </div>
  );
}