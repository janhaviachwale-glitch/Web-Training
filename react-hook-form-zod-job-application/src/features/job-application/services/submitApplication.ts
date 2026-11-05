import type { JobApplication } from '../schemas/job-application.schema';

export type SubmissionScenario =
  | 'success'
  | 'validation-error'
  | 'server-error';

export type SubmissionResult =
  | {
      status: 200;
      message: string;
    }
  | {
      status: 400;
      field: 'position';
      message: string;
    }
  | {
      status: 500;
      message: string;
    };

export async function submitApplication(
  application: JobApplication,
  scenario: SubmissionScenario,
): Promise<SubmissionResult> {
  // Simulate API processing time.
  await new Promise((resolve) => setTimeout(resolve, 1500));

  // Simulate a server-side field validation error.
  if (scenario === 'validation-error') {
    return {
      status: 400,
      field: 'position',
      message: 'This position is currently unavailable. Please select another position.',
    };
  }

  // Simulate a general server error.
  if (scenario === 'server-error') {
    return {
      status: 500,
      message: 'Something went wrong on the server. Please try again.',
    };
  }

  // Simulate successful submission.
  console.log('Mock application submitted:', application);

  return {
    status: 200,
    message: 'Your job application has been submitted successfully!',
  };
}