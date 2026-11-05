import FormInput from './FormInput';
import type { FieldPath, FieldValues } from 'react-hook-form';

type FormDateInputProps<T extends FieldValues> = {
  name: FieldPath<T>;
  label: string;
  required?: boolean;
};

export default function FormDateInput<T extends FieldValues>({
  name,
  label,
  required = false,
}: FormDateInputProps<T>) {
  return (
    <FormInput<T>
      name={name}
      label={label}
      type="date"
      required={required}
    />
  );
}