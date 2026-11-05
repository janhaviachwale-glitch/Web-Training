import { z } from 'zod';

export const previousCompanySchema = z.object({
  companyName: z.string().trim().min(2, 'Company name is required'),
  jobTitle: z.string().trim().min(2, 'Job title is required'),
  from: z.iso.date('Enter a valid start date'),
  to: z.iso.date('Enter a valid end date'),
}).refine(
  (data) => data.to > data.from,
  {
    message: 'End date must be after start date',
    path: ['to'],
  },
);

export const fresherSchema = z.object({
  experienceType: z.literal('fresher'),
});

export const experiencedSchema = z.object({
  experienceType: z.literal('experienced'),
  totalExperience: z.number().min(0.1, 'Enter your experience'),
  previousCompanies: z.array(previousCompanySchema)
    .min(1, 'Add at least one previous company'),
});

export const experienceSchema = z.discriminatedUnion('experienceType', [
  fresherSchema,
  experiencedSchema,
]);

export type ExperienceDetails = z.infer<typeof experienceSchema>;
export type PreviousCompany = z.infer<typeof previousCompanySchema>;