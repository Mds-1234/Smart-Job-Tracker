import { useState, useMemo, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import { HiOutlinePlusCircle, HiOutlineDocumentText } from 'react-icons/hi';
import { ApplicationContext } from '../context/ApplicationContext';
import { useApplications } from '../hooks/useApplications';
import { useDebounce } from '../hooks/useDebounce';
import PageWrapper from '../components/layout/PageWrapper';
import SearchBar from '../components/ui/SearchBar';
import FilterBar from '../components/applications/FilterBar';
import PipelineTabs from '../components/applications/PipelineTabs';
import ApplicationCard from '../components/applications/ApplicationCard';
import Button from '../components/ui/Button';
import EmptyState from '../components/ui/EmptyState';
import LoadingSkeleton from '../components/ui/LoadingSkeleton';

const ApplicationsList = () => {
  const { loading } = useContext(ApplicationContext);
  const { applications, toggleBookmark, deleteApplication } = useApplications();
  const navigate = useNavigate();

  // State
  const [searchQuery, setSearchQuery] = useState('');
  const [activeTab, setActiveTab] = useState('all');
  const [statusFilter, setStatusFilter] = useState('');
  const [platformFilter, setPlatformFilter] = useState('');
  const [locationFilter, setLocationFilter] = useState('');
  const [sortBy, setSortBy] = useState('appliedDate-desc');

  const debouncedSearch = useDebounce(searchQuery, 500);

  // Tab counts
  const tabCounts = useMemo(() => {
    return {
      all: applications.length,
      applied: applications.filter((a) => a.status === 'applied').length,
      interview: applications.filter((a) => a.status === 'interview').length,
      offer: applications.filter((a) => a.status === 'offer').length,
      rejected: applications.filter((a) => a.status === 'rejected').length,
      bookmarked: applications.filter((a) => a.bookmarked).length,
    };
  }, [applications]);

  // Filtered and sorted data
  const filteredApps = useMemo(() => {
    let result = [...applications];

    // Tab filter
    if (activeTab === 'bookmarked') {
      result = result.filter((a) => a.bookmarked);
    } else if (activeTab !== 'all') {
      result = result.filter((a) => a.status === activeTab);
    }

    // Additional filters
    if (statusFilter) {
      result = result.filter((a) => a.status === statusFilter);
    }
    if (platformFilter) {
      result = result.filter((a) => a.platform === platformFilter);
    }
    if (locationFilter) {
      result = result.filter((a) => a.location === locationFilter);
    }

    // Search
    if (debouncedSearch) {
      const query = debouncedSearch.toLowerCase();
      result = result.filter(
        (a) =>
          a.company.toLowerCase().includes(query) ||
          a.role.toLowerCase().includes(query)
      );
    }

    // Sort
    const [sortField, sortDir] = sortBy.split('-');
    result.sort((a, b) => {
      let valA, valB;
      if (sortField === 'company') {
        valA = a.company.toLowerCase();
        valB = b.company.toLowerCase();
      } else if (sortField === 'salary') {
        valA = a.salary || 0;
        valB = b.salary || 0;
      } else {
        valA = new Date(a.appliedDate);
        valB = new Date(b.appliedDate);
      }

      if (valA < valB) return sortDir === 'asc' ? -1 : 1;
      if (valA > valB) return sortDir === 'asc' ? 1 : -1;
      return 0;
    });

    return result;
  }, [applications, activeTab, statusFilter, platformFilter, locationFilter, debouncedSearch, sortBy]);

  return (
    <PageWrapper
      title="Applications"
      subtitle={`${filteredApps.length} application${filteredApps.length !== 1 ? 's' : ''} found`}
      action={
        <Button icon={HiOutlinePlusCircle} onClick={() => navigate('/applications/new')}>
          Add New
        </Button>
      }
    >
      {/* Pipeline Tabs */}
      <div className="bg-white rounded-2xl border border-surface-100 px-4 py-3 mb-4">
        <PipelineTabs activeTab={activeTab} onChange={setActiveTab} counts={tabCounts} />
      </div>

      {/* Search & Filters */}
      <div className="space-y-3 mb-6">
        <div className="flex flex-col sm:flex-row gap-3">
          <SearchBar
            value={searchQuery}
            onChange={setSearchQuery}
            placeholder="Search by company or role..."
          />
        </div>
        <FilterBar
          statusFilter={statusFilter}
          onStatusFilterChange={setStatusFilter}
          platformFilter={platformFilter}
          onPlatformFilterChange={setPlatformFilter}
          locationFilter={locationFilter}
          onLocationFilterChange={setLocationFilter}
          sortBy={sortBy}
          onSortChange={setSortBy}
        />
      </div>

      {/* Results */}
      {loading ? (
        <LoadingSkeleton count={6} />
      ) : filteredApps.length === 0 ? (
        <EmptyState
          icon={HiOutlineDocumentText}
          title="No applications found"
          description={
            debouncedSearch
              ? `No results for "${debouncedSearch}". Try a different search term.`
              : 'Start tracking your job applications by adding your first one.'
          }
          action={
            <Button icon={HiOutlinePlusCircle} onClick={() => navigate('/applications/new')}>
              Add Application
            </Button>
          }
        />
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
          <AnimatePresence mode="popLayout">
            {filteredApps.map((app) => (
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
    </PageWrapper>
  );
};

export default ApplicationsList;
