import FormInput from '../../../components/form/FormInput';
import FormTextarea from '../../../components/form/FormTextarea';
import type { JobApplication } from '../schemas/job-application.schema';

export default function PersonalDetailsStep() {
  return (
    <section className="wizard-step" aria-labelledby="personal-details-heading">
      <div className="step-section-heading">
        <h3 id="personal-details-heading">Personal Information</h3>
        <p>Enter your basic contact and personal details.</p>
      </div>

      <div className="form-grid">
        <FormInput<JobApplication>
          name="firstName"
          label="First Name"
          placeholder="Enter your first name"
          required
        />

        <FormInput<JobApplication>
          name="lastName"
          label="Last Name"
          placeholder="Enter your last name"
          required
        />

        <FormInput<JobApplication>
          name="email"
          label="Email Address"
          type="email"
          placeholder="you@example.com"
          required
        />

        <FormInput<JobApplication>
          name="phone"
          label="Phone Number"
          type="tel"
          placeholder="Enter your phone number"
          required
        />

        <FormInput<JobApplication>
          name="dateOfBirth"
          label="Date of Birth"
          type="date"
          required
        />
      </div>

      <FormTextarea<JobApplication>
        name="address"
        label="Address"
        placeholder="Enter your complete address"
        rows={4}
        required
      />
    </section>
  );
}