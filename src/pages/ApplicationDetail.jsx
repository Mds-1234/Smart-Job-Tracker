import { useParams, useNavigate } from 'react-router-dom';
import { HiOutlineArrowLeft } from 'react-icons/hi';
import PageWrapper from '../components/layout/PageWrapper';
import ApplicationForm from '../components/applications/ApplicationForm';
import Button from '../components/ui/Button';
import EmptyState from '../components/ui/EmptyState';
import { useApplications } from '../hooks/useApplications';

const ApplicationDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { getApplicationById, updateApplication } = useApplications();

  const application = getApplicationById(id);

  if (!application) {
    return (
      <PageWrapper>
        <EmptyState
          title="Application not found"
          description="The application you're looking for doesn't exist or has been deleted."
          action={
            <Button variant="secondary" onClick={() => navigate('/applications')}>
              ← Back to Applications
            </Button>
          }
        />
      </PageWrapper>
    );
  }

  const handleSubmit = async (data) => {
    updateApplication(id, data);
    navigate('/applications');
  };

  return (
    <PageWrapper
      title="Edit Application"
      subtitle={`${application.company} — ${application.role}`}
      action={
        <Button
          variant="secondary"
          icon={HiOutlineArrowLeft}
          onClick={() => navigate('/applications')}
        >
          Back
        </Button>
      }
    >
      <div className="max-w-3xl">
        <div className="bg-white rounded-2xl border border-surface-100 p-6 lg:p-8">
          <ApplicationForm
            defaultValues={application}
            onSubmit={handleSubmit}
            isEdit
          />
        </div>
      </div>
    </PageWrapper>
  );
};

export default ApplicationDetail;
