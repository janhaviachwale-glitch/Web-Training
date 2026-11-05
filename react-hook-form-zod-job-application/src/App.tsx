import JobApplicationFormContent from './features/job-application/components/JobApplicationForm';

import './App.css';

function App() {
  return (
    <main className="app">
      <header className="app-header">
        <h1>Job Application</h1>
        <p>Complete the form to submit your application.</p>
      </header>

      <JobApplicationFormContent />
    </main>
  );
}

export default App;