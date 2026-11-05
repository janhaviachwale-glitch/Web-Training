import { z } from 'zod';

import { personalSchema } from './personal.schema';
import { educationSchema } from './education.schema';
import { experienceSchema } from './experience.schema';
import { applicationSchema } from './application.schema';

export const jobApplicationSchema = personalSchema
  .extend(educationSchema.shape)
  .extend({
    experience: experienceSchema,
  })
  .extend(applicationSchema.shape);

export type JobApplication = z.infer<typeof jobApplicationSchema>;