import { useFieldArray, useFormContext, useWatch } from 'react-hook-form';
import type { FieldArrayPath } from 'react-hook-form';

import FormInput from '../../../components/form/FormInput';
import type { JobApplication } from '../schemas/job-application.schema';
import type { PreviousCompany } from '../schemas/experience.schema';

const emptyCompany: PreviousCompany = {
  companyName: '',
  jobTitle: '',
  from: '',
  to: '',
};

type ExperienceValues = {
  experienceType: 'fresher' | 'experienced';
  totalExperience?: number;
  previousCompanies?: PreviousCompany[];
};

export default function ExperienceStep() {
  const { control, setValue, getValues } =
    useFormContext<JobApplication>();

  const experienceType = useWatch({
    control,
    name: 'experience.experienceType',
  });

  const { fields, append, remove, replace } = useFieldArray({
    control,
    name: 'experience.previousCompanies' as FieldArrayPath<JobApplication>,
  });

    const handleExperienceChange = (
        nextType: 'fresher' | 'experienced',
    ) => {
    const current = getValues('experience') as ExperienceValues;

    if (nextType === 'experienced') {
        const companies =
        current.previousCompanies?.length
            ? current.previousCompanies
            : [{ ...emptyCompany }];

        setValue(
        'experience',
        {
            experienceType: 'experienced',
            totalExperience: current.totalExperience ?? 0,
            previousCompanies: companies,
        },
        { shouldValidate: false },
        );

        // Synchronize the visible field array with the form values.
        replace(companies);
    } else {
        setValue(
        'experience',
        {
            ...current,
            experienceType: 'fresher',
        } as JobApplication['experience'],
        { shouldValidate: false },
        );
    }
    };

  return (
    <section className="wizard-step" aria-labelledby="experience-heading">
      <div className="step-section-heading">
        <h3 id="experience-heading">Work Experience</h3>
        <p>Tell us about your professional experience.</p>
      </div>

      <fieldset className="experience-type-fieldset">
        <legend>Are you a fresher or an experienced candidate?</legend>

        <div className="experience-type-options">
          <label className="experience-option">
            <input
              type="radio"
              name="experienceType"
              value="fresher"
              checked={experienceType === 'fresher'}
              onChange={() => handleExperienceChange('fresher')}
            />
            <span>Fresher</span>
          </label>

          <label className="experience-option">
            <input
              type="radio"
              name="experienceType"
              value="experienced"
              checked={experienceType === 'experienced'}
              onChange={() => handleExperienceChange('experienced')}
            />
            <span>Experienced</span>
          </label>
        </div>
      </fieldset>

      {experienceType === 'fresher' && (
        <div className="fresher-message">
          <h4>Welcome, Future Professional!</h4>
          <p>
            Since you are applying as a fresher, you don't need to
            provide previous work experience.
          </p>
        </div>
      )}

      {experienceType === 'experienced' && (
        <div className="experienced-section">
          <div className="step-section-heading">
            <h3>Professional Experience</h3>
            <p>Provide your total experience and previous employment details.</p>
          </div>

          <FormInput<JobApplication>
            name="experience.totalExperience"
            label="Total Experience (Years)"
            type="number"
            placeholder="e.g. 2"
            min={0.1}
            required
          />

          <div className="dynamic-section-heading">
            <h3>Previous Companies</h3>
            <p>Add details of your previous employment.</p>
          </div>

          {fields.map((field, index) => (
            <div className="dynamic-entry" key={field.id}>
              <div className="dynamic-entry-header">
                <h4>Company {index + 1}</h4>

                {fields.length > 1 && (
                  <button
                    type="button"
                    className="remove-button"
                    onClick={() => remove(index)}
                    aria-label={`Remove company ${index + 1}`}
                  >
                    Remove
                  </button>
                )}
              </div>

              <div className="form-grid">
                <FormInput<JobApplication>
                  name={`experience.previousCompanies.${index}.companyName`}
                  label="Company Name"
                  placeholder="Enter company name"
                  required
                />

                <FormInput<JobApplication>
                  name={`experience.previousCompanies.${index}.jobTitle`}
                  label="Job Title"
                  placeholder="Enter your job title"
                  required
                />

                <FormInput<JobApplication>
                  name={`experience.previousCompanies.${index}.from`}
                  label="Start Date"
                  type="date"
                  required
                />

                <FormInput<JobApplication>
                  name={`experience.previousCompanies.${index}.to`}
                  label="End Date"
                  type="date"
                  required
                />
              </div>
            </div>
          ))}

          <button
            type="button"
            className="add-button"
            onClick={() => append({ ...emptyCompany })}
          >
            + Add Another Company
          </button>
        </div>
      )}
    </section>
  );
}