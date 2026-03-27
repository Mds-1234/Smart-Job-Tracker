import { useContext, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import {
  HiOutlineDocumentText,
  HiOutlineChatAlt2,
  HiOutlineBadgeCheck,
  HiOutlineXCircle,
  HiOutlinePlusCircle,
  HiOutlineStar,
} from 'react-icons/hi';
import { ApplicationContext } from '../context/ApplicationContext';
import PageWrapper from '../components/layout/PageWrapper';
import StatsCard from '../components/ui/StatsCard';
import ApplicationCard from '../components/applications/ApplicationCard';
import Button from '../components/ui/Button';
import LoadingSkeleton from '../components/ui/LoadingSkeleton';
import { useApplications } from '../hooks/useApplications';

const Dashboard = () => {
  const { stats, loading } = useContext(ApplicationContext);
  const { applications, toggleBookmark, deleteApplication } = useApplications();
  const navigate = useNavigate();

  const recentApps = useMemo(
    () =>
      [...applications]
        .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
        .slice(0, 6),
    [applications]
  );

  const statsCards = [
    {
      icon: HiOutlineDocumentText,
      label: 'Total Applied',
      value: stats.total,
      color: 'primary',
      trend: 'All time applications',
    },
    {
      icon: HiOutlineChatAlt2,
      label: 'Interviews',
      value: stats.interviews,
      color: 'warning',
      trend: 'Scheduled interviews',
    },
    {
      icon: HiOutlineBadgeCheck,
      label: 'Offers',
      value: stats.offers,
      color: 'success',
      trend: 'Received offers',
    },
    {
      icon: HiOutlineXCircle,
      label: 'Rejected',
      value: stats.rejected,
      color: 'danger',
      trend: 'Declined',
    },
    {
      icon: HiOutlineStar,
      label: 'Bookmarked',
      value: stats.bookmarked,
      color: 'info',
      trend: 'Saved roles',
    },
  ];

  return (
    <PageWrapper
      title="Dashboard"
      subtitle="Welcome back! Here's your job application overview."
      action={
        <Button icon={HiOutlinePlusCircle} onClick={() => navigate('/applications/new')}>
          Add Application
        </Button>
      }
    >
      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4 mb-8">
        {statsCards.map((card, i) => (
          <StatsCard key={card.label} {...card} delay={i * 0.07} />
        ))}
      </div>

      {/* Recent Applications */}
      <div className="mb-4">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold text-surface-900">
            Recent Applications
          </h2>
          <button
            onClick={() => navigate('/applications')}
            className="text-xs font-medium text-primary-600 hover:text-primary-700 cursor-pointer transition-colors"
          >
            View all →
          </button>
        </div>

        {loading ? (
          <LoadingSkeleton count={6} />
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
            <AnimatePresence mode="popLayout">
              {recentApps.map((app) => (
                <ApplicationCard
                  key={app.id}
                  application={app}
                  onToggleBookmark={toggleBookmark}
                  onDelete={deleteApplication}
                />
              ))}
            </AnimatePresence>
          </div>
        )}
      </div>
    </PageWrapper>
  );
};

export default Dashboard;
