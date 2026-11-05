import { z } from 'zod';

export const educationEntrySchema = z.object({
  degree: z.string().trim().min(2, 'Degree is required'),
  institution: z.string().trim().min(2, 'Institution is required'),
  fieldOfStudy: z.string().trim().min(2, 'Field of study is required'),
  startDate: z.iso.date('Enter a valid start date'),
  endDate: z.iso.date('Enter a valid end date'),
  grade: z.string().trim().min(1, 'Grade or percentage is required'),
}).refine(
  (data) => data.endDate > data.startDate,
  {
    message: 'End date must be after the start date',
    path: ['endDate'],
  },
);

export const educationSchema = z.object({
  education: z.array(educationEntrySchema)
    .min(1, 'Add at least one education entry'),
});

export type EducationEntry = z.infer<typeof educationEntrySchema>;
export type EducationDetails = z.infer<typeof educationSchema>;