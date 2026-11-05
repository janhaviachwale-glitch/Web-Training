import { useFieldArray, useFormContext } from 'react-hook-form';
import FormInput from '../../../components/form/FormInput';
import type { JobApplication } from '../schemas/job-application.schema';

export default function EducationStep() {
  const { control } = useFormContext<JobApplication>();

  const { fields, append, remove } = useFieldArray({
    control,
    name: 'education',
  });

  return (
    <section className="wizard-step" aria-labelledby="education-heading">
      <div className="step-section-heading">
        <h3 id="education-heading">Education Details</h3>
        <p>Add your academic qualifications. You can add multiple entries.</p>
      </div>

      {fields.map((field, index) => (
        <div className="dynamic-entry" key={field.id}>
          <div className="dynamic-entry-header">
            <h4>Education {index + 1}</h4>

            {fields.length > 1 && (
              <button
                type="button"
                className="remove-button"
                onClick={() => remove(index)}
                aria-label={`Remove education entry ${index + 1}`}
              >
                Remove
              </button>
            )}
          </div>

          <div className="form-grid">
            <FormInput<JobApplication>
              name={`education.${index}.degree`}
              label="Degree"
              placeholder="e.g. Bachelor's Degree"
              required
            />

            <FormInput<JobApplication>
              name={`education.${index}.institution`}
              label="Institution"
              placeholder="Enter institution name"
              required
            />

            <FormInput<JobApplication>
              name={`education.${index}.fieldOfStudy`}
              label="Field of Study"
              placeholder="e.g. Computer Science"
              required
            />

            <FormInput<JobApplication>
              name={`education.${index}.grade`}
              label="Grade / Percentage"
              placeholder="e.g. 8.5 CGPA or 85%"
              required
            />

            <FormInput<JobApplication>
              name={`education.${index}.startDate`}
              label="Start Date"
              type="date"
              required
            />

            <FormInput<JobApplication>
              name={`education.${index}.endDate`}
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
        onClick={() =>
          append({
            degree: '',
            institution: '',
            fieldOfStudy: '',
            startDate: '',
            endDate: '',
            grade: '',
          })
        }
      >
        + Add Another Education
      </button>
    </section>
  );
}