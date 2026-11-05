import { useState } from 'react';
import { useForm, type FieldPath } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

import {
  jobApplicationSchema,
  type JobApplication,
} from '../schemas/job-application.schema';

export const wizardSteps = [
  {
    id: 1,
    title: 'Personal Details',
    description: 'Tell us about yourself',
  },
  {
    id: 2,
    title: 'Education',
    description: 'Add your educational background',
  },
  {
    id: 3,
    title: 'Experience',
    description: 'Share your work experience',
  },
  {
    id: 4,
    title: 'Application Details',
    description: 'Tell us about the position',
  },
  {
    id: 5,
    title: 'Review & Submit',
    description: 'Review your application',
  },
] as const;

const stepFields: FieldPath<JobApplication>[][] = [
  [
    'firstName',
    'lastName',
    'email',
    'phone',
    'dateOfBirth',
    'address',
  ],
  ['education'],
  ['experience'],
  [
    'position',
    'expectedSalary',
    'joiningDate',
    'coverLetter',
    'resumeFileName',
  ],
  [],
];

export function useJobApplicationWizard() {
  const [currentStep, setCurrentStep] = useState(0);

  const methods = useForm<JobApplication>({
    resolver: zodResolver(jobApplicationSchema),
    mode: 'onTouched',
    reValidateMode: 'onChange',
    shouldUnregister: false,
    defaultValues: {
      firstName: '',
      lastName: '',
      email: '',
      phone: '',
      dateOfBirth: '',
      address: '',
      education: [
        {
          degree: '',
          institution: '',
          fieldOfStudy: '',
          startDate: '',
          endDate: '',
          grade: '',
        },
      ],
      experience: {
        experienceType: 'fresher',
      },
      position: '',
      expectedSalary: 0,
      joiningDate: '',
      coverLetter: '',
      resumeFileName: '',
      resumeFile: undefined,
    },
  });

  const nextStep = async () => {
    const fields = stepFields[currentStep];

    const isValid = await methods.trigger(fields, {
        shouldFocus: true,
    });

    if (!isValid) {
      return false;
    }

    setCurrentStep((step) =>
      Math.min(step + 1, wizardSteps.length - 1),
    );

    return true;
  };

  const previousStep = () => {
    setCurrentStep((step) => Math.max(step - 1, 0));
  };

  const goToStep = (step: number) => {
    if (step >= 0 && step < wizardSteps.length) {
      setCurrentStep(step);
    }
  };

  return {
    methods,
    currentStep,
    nextStep,
    previousStep,
    goToStep,
    wizardSteps,
  };
}