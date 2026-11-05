import { useFormContext } from 'react-hook-form';

import type { JobApplication } from '../schemas/job-application.schema';

type ReviewStepProps = {
  onEdit: (step: number) => void;
};

export default function ReviewStep({ onEdit }: ReviewStepProps) {
  const { getValues } = useFormContext<JobApplication>();
  const values = getValues();

  return (
    <section className="wizard-step" aria-labelledby="review-heading">
      <h3 id="review-heading">Review your application</h3>
      <p>Please check your details before submitting.</p>

      <section className="review-section">
        <div className="review-section-header">
          <h4>Personal Details</h4>
          <button type="button" onClick={() => onEdit(0)}>
            Edit
          </button>
        </div>

        <p><strong>Name:</strong> {values.firstName} {values.lastName}</p>
        <p><strong>Email:</strong> {values.email}</p>
        <p><strong>Phone:</strong> {values.phone}</p>
        <p><strong>Date of Birth:</strong> {values.dateOfBirth}</p>
        <p><strong>Address:</strong> {values.address}</p>
      </section>

      <section className="review-section">
        <div className="review-section-header">
          <h4>Education</h4>
          <button type="button" onClick={() => onEdit(1)}>
            Edit
          </button>
        </div>

        {values.education.map((entry, index) => (
          <div className="review-entry" key={`${entry.degree}-${index}`}>
            <p><strong>Education {index + 1}</strong></p>
            <p><strong>Degree:</strong> {entry.degree}</p>
            <p><strong>Institution:</strong> {entry.institution}</p>
            <p><strong>Field of Study:</strong> {entry.fieldOfStudy}</p>
            <p><strong>Duration:</strong> {entry.startDate} to {entry.endDate}</p>
            <p><strong>Grade:</strong> {entry.grade}</p>
          </div>
        ))}
      </section>

      <section className="review-section">
        <div className="review-section-header">
          <h4>Experience</h4>
          <button type="button" onClick={() => onEdit(2)}>
            Edit
          </button>
        </div>

        {values.experience.experienceType === 'fresher' ? (
          <p>Fresher – No previous work experience.</p>
        ) : (
          <>
            <p>
              <strong>Total Experience:</strong>{' '}
              {values.experience.totalExperience} years
            </p>

            {values.experience.previousCompanies.map((company, index) => (
              <div
                className="review-entry"
                key={`${company.companyName}-${index}`}
              >
                <p><strong>Previous Company {index + 1}</strong></p>
                <p><strong>Company:</strong> {company.companyName}</p>
                <p><strong>Job Title:</strong> {company.jobTitle}</p>
                <p><strong>Duration:</strong> {company.from} to {company.to}</p>
              </div>
            ))}
          </>
        )}
      </section>

      <section className="review-section">
        <div className="review-section-header">
          <h4>Application Details</h4>
          <button type="button" onClick={() => onEdit(3)}>
            Edit
          </button>
        </div>

        <p><strong>Position:</strong> {values.position}</p>
        <p><strong>Expected Salary:</strong> ₹{values.expectedSalary}</p>
        <p><strong>Expected Joining Date:</strong> {values.joiningDate}</p>
        <p><strong>Resume:</strong> {values.resumeFileName}</p>
        <p><strong>Cover Letter:</strong></p>
        <p className="review-cover-letter">{values.coverLetter}</p>
      </section>
    </section>
  );
}