import { useState } from 'react';
import { FormProvider } from 'react-hook-form';

import PersonalDetailsStep from './PersonalDetailsStep';
import EducationStep from './EducationStep';
import ExperienceStep from './ExperienceStep';
import ApplicationDetailsStep from './ApplicationDetailsStep';
import ReviewStep from './ReviewStep';

import { useJobApplicationWizard } from '../hooks/useJobApplicationWizard';
import {
  submitApplication,
  type SubmissionScenario,
} from '../services/submitApplication';
import type { JobApplication } from '../schemas/job-application.schema';

function JobApplicationFormContent() {
  const {
    methods,
    currentStep,
    nextStep,
    previousStep,
    goToStep,
    wizardSteps,
  } = useJobApplicationWizard();

  const [scenario, setScenario] =
    useState<SubmissionScenario>('success');

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submissionError, setSubmissionError] = useState('');
  const [submissionSuccess, setSubmissionSuccess] = useState('');

  const activeStep = wizardSteps[currentStep];

  const handleApplicationSubmit = async (data: JobApplication) => {
    setIsSubmitting(true);
    setSubmissionError('');
    setSubmissionSuccess('');

    try {
      const result = await submitApplication(data, scenario);

      if (result.status === 400) {
        methods.setError(result.field, {
          type: 'server',
          message: result.message,
        });

        goToStep(3);
        return;
      }

      if (result.status === 500) {
        setSubmissionError(result.message);
        return;
      }

      setSubmissionSuccess(result.message);
      methods.reset();
    } catch {
      setSubmissionError(
        'Unable to submit your application. Please try again.',
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <FormProvider {...methods}>
      {submissionSuccess ? (
        <section className="submission-success" aria-live="polite">
          <h2>Application Submitted!</h2>
          <p>{submissionSuccess}</p>

          <button
            type="button"
            onClick={() => {
              setSubmissionSuccess('');
              setScenario('success');
              goToStep(0);
            }}
          >
            Start New Application
          </button>
        </section>
      ) : (
        <form
          className="job-application-form"
          noValidate
          onSubmit={methods.handleSubmit(handleApplicationSubmit)}
        >
          <header>
            <p>Step {currentStep + 1} of {wizardSteps.length}</p>
            <h2>{activeStep.title}</h2>
            <p>{activeStep.description}</p>
          </header>

          <div className="wizard-step-content">
            {currentStep === 0 && <PersonalDetailsStep />}

            {currentStep === 1 && <EducationStep />}

            {currentStep === 2 && <ExperienceStep />}

            {currentStep === 3 && <ApplicationDetailsStep />}

            {currentStep === 4 && (
              <>
                <div className="form-field">
                  <label htmlFor="submission-scenario">
                    Mock API Response (Testing)
                  </label>

                  <select
                    id="submission-scenario"
                    value={scenario}
                    onChange={(event) =>
                      setScenario(event.target.value as SubmissionScenario)
                    }
                  >
                    <option value="success">200 – Success</option>
                    <option value="validation-error">
                      400 – Validation Error
                    </option>
                    <option value="server-error">
                      500 – Server Error
                    </option>
                  </select>

                  <p className="field-help">
                    Select a response to test the submission behaviour.
                  </p>
                </div>

                <ReviewStep onEdit={goToStep} />
              </>
            )}
          </div>

          {submissionError && (
            <p className="field-error" role="alert">
              {submissionError}
            </p>
          )}

          <footer className="wizard-navigation">
            <button
              type="button"
              onClick={previousStep}
              disabled={currentStep === 0 || isSubmitting}
            >
              Previous
            </button>

            {currentStep < wizardSteps.length - 1 && (
              <button
                type="button"
                onClick={nextStep}
                disabled={isSubmitting}
              >
                Continue
              </button>
            )}

            {currentStep === wizardSteps.length - 1 && (
              <button type="submit" disabled={isSubmitting}>
                {isSubmitting ? 'Submitting...' : 'Submit Application'}
              </button>
            )}
          </footer>
        </form>
      )}
    </FormProvider>
  );
}

export default JobApplicationFormContent;