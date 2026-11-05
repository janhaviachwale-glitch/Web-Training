# Job Application Wizard

A multi-step job application form built using React, TypeScript, React Hook Form and Zod. The application guides candidates through five steps, validates each step, preserves form data while navigating and provides a review screen before submission.

## Features

- Five-step job application wizard:
  1. Personal Details
  2. Education
  3. Experience
  4. Application Details
  5. Review & Submit
- Step-by-step validation using React Hook Form and Zod.
- Shared form state across all steps.
- Dynamic education and previous-company entries.
- Conditional Fresher and Experienced sections.
- Cross-field validation for dates and age.
- Resume upload validation for PDF, DOC and DOCX files, with a 5 MB limit.
- Review screen with Edit actions for individual sections.
- Mock submission scenarios for success, validation failure and server failure.
- Accessible form labels, validation messages and field descriptions.
- Responsive layout.

## Tech Stack

- React 19
- TypeScript
- Vite
- React Hook Form
- Zod
- @hookform/resolvers
- Oxlint

## Getting Started

### Prerequisites

- Node.js
- npm

### Installation

Clone the repository and navigate to the project directory:

```bash
git clone <repository-url>
cd Web-Training/react-hook-form-zod-job-application
```

Install dependencies:

```bash
npm install
```

### Start the development server

```bash
npm run dev
```

Open the local URL displayed by Vite, usually:

`http://localhost:5173`

### Production build

```bash
npm run build
```

### Lint

```bash
npm run lint
```

## Form Architecture

### Shared Form State

A single `useForm` instance is created in `useJobApplicationWizard.ts`.

The `FormProvider` component makes the form methods available to all wizard steps. Individual fields access the shared form using `useFormContext`.

The configuration uses:

- `shouldUnregister: false` to preserve values when a step unmounts.
- `mode: 'onTouched'` for validation after a field is touched.
- `reValidateMode: 'onChange'` to revalidate fields when their values change.

### Schema Validation

Zod schemas are maintained separately for each section:

- Personal details schema
- Education schema
- Experience schema
- Application details schema

The schemas are combined into a single job application schema and connected to React Hook Form using `zodResolver`.

TypeScript types are inferred from the Zod schemas using `z.infer`.

### Conditional Experience Fields

The experience schema uses `z.discriminatedUnion` with `experienceType`:

- Fresher: does not require previous-company information.
- Experienced: requires total experience and at least one previous-company entry.

### Dynamic Form Fields

`useFieldArray` manages repeatable education and previous-company entries. Users can add or remove entries while maintaining the form state.

### Validation Rules

The application includes:

- Required personal and application fields.
- Valid email and phone number formats.
- Minimum age of 18 years.
- Valid education and employment date ranges.
- At least one education entry.
- At least one previous-company entry for experienced candidates.
- Positive expected salary.
- Future expected joining date.
- Cover letter length between 50 and 1000 characters.
- Resume file type and size validation.

## Performance Considerations

- Uses `useWatch` for specific field subscriptions instead of broad form-wide watching.
- Uses `useFormState` with individual field names to scope validation-state subscriptions.
- Keeps form state inside React Hook Form instead of duplicating it in another global state library.
- Preserves values between wizard steps to avoid unnecessary data re-entry.

## Submission Behaviour

The project uses a mock submission service with a 1.5-second delay. The Review & Submit step provides a testing selector for three deterministic responses.

| Scenario | Behaviour |
|---|---|
| 200 – Success | Displays a success confirmation and resets the form. |
| 400 – Validation Error | Maps the server validation error to the relevant field and returns to Application Details. |
| 500 – Server Error | Displays a general error message and preserves entered form data for retry. |

No external backend is required for these mock scenarios.

## Accessibility

- Form controls have associated labels.
- Validation errors are connected to fields using `aria-describedby`.
- Invalid fields expose `aria-invalid`.
- Error messages use `role="alert"`.
- Required fields expose required-state information.
- Form controls support keyboard interaction and visible focus styling.

## Testing

The application is verified through manual testing.

The manual testing checklist and testing video should be maintained as submission evidence.

Key scenarios to verify:

- Required-field and individual-field validation.
- Navigation between steps without losing entered values.
- Dynamic education and previous-company entries.
- Fresher and Experienced conditional behaviour.
- Date and resume validation.
- Review screen values and Edit navigation.
- Mock API success, validation failure and server failure.
- Retry after server failure.
- Starting a new application after successful submission.

## Automated Checks

Run the following commands before submitting changes:

```bash
npm run lint
npm run build
```

Both commands should complete without errors.