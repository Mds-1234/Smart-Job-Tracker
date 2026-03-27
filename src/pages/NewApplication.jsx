import { useNavigate } from 'react-router-dom';
import PageWrapper from '../components/layout/PageWrapper';
import ApplicationForm from '../components/applications/ApplicationForm';
import { useApplications } from '../hooks/useApplications';

const NewApplication = () => {
  const { addApplication } = useApplications();
  const navigate = useNavigate();

  const handleSubmit = async (data) => {
    addApplication(data);
    navigate('/applications');
  };

  return (
    <PageWrapper
      title="Add New Application"
      subtitle="Track a new job application"
    >
      <div className="max-w-3xl">
        <div className="bg-white rounded-2xl border border-surface-100 p-6 lg:p-8">
          <ApplicationForm onSubmit={handleSubmit} />
        </div>
      </div>
    </PageWrapper>
  );
};

export default NewApplication;
