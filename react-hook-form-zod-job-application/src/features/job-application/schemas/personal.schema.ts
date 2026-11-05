import { z } from 'zod';

export const personalSchema = z.object({
  firstName: z.string().trim().min(2, 'First name must contain at least 2 characters'),
  lastName: z.string().trim().min(2, 'Last name must contain at least 2 characters'),
  email: z.email('Enter a valid email address'),
  phone: z.string().regex(/^\+?[0-9\s()-]{10,15}$/, 'Enter a valid phone number'),
  dateOfBirth: z.iso.date('Enter a valid date of birth'),
  address: z.string().trim().min(10, 'Address must contain at least 10 characters'),
}).refine(
  (data) => {
    const today = new Date();
    const birthDate = new Date(`${data.dateOfBirth}T00:00:00`);
    let age = today.getFullYear() - birthDate.getFullYear();

    const birthdayNotReached =
      today.getMonth() < birthDate.getMonth() ||
      (today.getMonth() === birthDate.getMonth() &&
        today.getDate() < birthDate.getDate());

    if (birthdayNotReached) age--;

    return birthDate <= today && age >= 18;
  },
  {
    message: 'You must be at least 18 years old',
    path: ['dateOfBirth'],
  },
);

export type PersonalDetails = z.infer<typeof personalSchema>;