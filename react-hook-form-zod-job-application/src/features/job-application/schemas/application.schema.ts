import { z } from 'zod';

export const applicationSchema = z.object({
  position: z.string().min(1, 'Please select a position'),
  expectedSalary: z.number().positive('Salary must be greater than zero'),
  joiningDate: z.iso.date('Enter a valid joining date'),
  coverLetter: z.string()
    .trim()
    .min(50, 'Cover letter must contain at least 50 characters')
    .max(1000, 'Cover letter cannot exceed 1000 characters'),
  resumeFileName: z.string().min(1, 'Please upload your resume'),
  resumeFile: z.custom<File>(
    (value) => typeof File !== 'undefined' && value instanceof File,
    { message: 'Please upload your resume' },
  ).optional(),
}).refine(
  (data) => {
    const joiningDate = new Date(`${data.joiningDate}T00:00:00`);
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    return joiningDate > today;
  },
  {
    message: 'Expected joining date must be in the future',
    path: ['joiningDate'],
  },
);

export type ApplicationDetails = z.infer<typeof applicationSchema>;