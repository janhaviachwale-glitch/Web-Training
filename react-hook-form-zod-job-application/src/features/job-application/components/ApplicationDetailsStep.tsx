import { useFormContext, useFormState, useWatch } from 'react-hook-form';
import FormInput from '../../../components/form/FormInput';
import FormSelect from '../../../components/form/FormSelect';
import FormTextarea from '../../../components/form/FormTextarea';
import type { JobApplication } from '../schemas/job-application.schema';

const positionOptions = [
  { label: 'Frontend Developer', value: 'frontend-developer' },
  { label: 'Backend Developer', value: 'backend-developer' },
  { label: 'Full Stack Developer', value: 'full-stack-developer' },
  { label: 'React Developer', value: 'react-developer' },
  { label: 'Software Engineer', value: 'software-engineer' },
];

const MAX_RESUME_SIZE = 5 * 1024 * 1024;

const allowedResumeTypes = [
  'application/pdf',
  'application/msword',
  'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
];

const allowedExtensions = ['.pdf', '.doc', '.docx'];

export default function ApplicationDetailsStep() {
  const {
    control,
    setValue,
    setError,
    clearErrors,
  } = useFormContext<JobApplication>();

  const resumeFileName = useWatch({
  control,
  name: 'resumeFileName',
});

  const { errors } = useFormState({
    control,
    name: 'resumeFileName',
  });

  const resumeError = errors.resumeFileName?.message;

  const handleResumeChange = (file?: File) => {
  clearErrors(['resumeFileName', 'resumeFile']);

  if (!file) {
    setValue('resumeFile', undefined, {
      shouldDirty: true,
      shouldValidate: false,
    });

    setValue('resumeFileName', '', {
      shouldDirty: true,
      shouldValidate: false,
    });

    return;
  }

  const extension = file.name
    .slice(file.name.lastIndexOf('.'))
    .toLowerCase();

  if (
    !allowedExtensions.includes(extension) ||
    (file.type !== '' && !allowedResumeTypes.includes(file.type))
  ) {
    setValue('resumeFile', undefined);
    setValue('resumeFileName', '');

    setError('resumeFileName', {
      type: 'manual',
      message: 'Upload your resume in PDF, DOC or DOCX format.',
    });

    return;
  }

  if (file.size > MAX_RESUME_SIZE) {
    setValue('resumeFile', undefined);
    setValue('resumeFileName', '');

    setError('resumeFileName', {
      type: 'manual',
      message: 'Resume size must not exceed 5 MB.',
    });

    return;
  }

  setValue('resumeFile', file, {
    shouldDirty: true,
    shouldValidate: false,
  });

  setValue('resumeFileName', file.name, {
    shouldDirty: true,
    shouldValidate: false,
  });
};

  return (
    <section
      className="wizard-step"
      aria-labelledby="application-details-heading"
    >
      <div className="step-section-heading">
        <h3 id="application-details-heading">Application Details</h3>
        <p>Tell us about the position you are applying for.</p>
      </div>

      <FormSelect<JobApplication>
        name="position"
        label="Position Applying For"
        placeholder="Select a position"
        options={positionOptions}
        required
      />

      <FormInput<JobApplication>
        name="expectedSalary"
        label="Expected Salary (₹ per year)"
        type="number"
        placeholder="Enter expected annual salary"
        min={1}
        required
      />

      <FormInput<JobApplication>
        name="joiningDate"
        label="Expected Joining Date"
        type="date"
        required
      />

      <FormTextarea<JobApplication>
        name="coverLetter"
        label="Cover Letter"
        placeholder="Introduce yourself and explain why you are suitable for this position..."
        rows={6}
        maxLength={1000}
        required
      />

      <div className="form-field">
        <label htmlFor="resume-upload">
          Upload Resume <span aria-hidden="true">*</span>
        </label>

        <input
          id="resume-upload"
          type="file"
          accept=".pdf,.doc,.docx"
          aria-invalid={Boolean(resumeError)}
          aria-describedby={
            resumeError ? 'resume-upload-error' : 'resume-upload-help'
          }
          onChange={(event) => handleResumeChange(event.target.files?.[0])}
        />

        {resumeFileName && (
            <p className="field-help">
                Selected resume: {resumeFileName}
            </p>
        )}

        <p id="resume-upload-help" className="field-help">
          Accepted formats: PDF, DOC and DOCX. Maximum file size: 5 MB.
        </p>

        {resumeError && (
          <p
            id="resume-upload-error"
            className="field-error"
            role="alert"
          >
            {String(resumeError)}
          </p>
        )}
      </div>
    </section>
  );
}