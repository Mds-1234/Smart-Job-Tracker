import { createContext, useMemo } from 'react';
import { useLocalStorage } from '../hooks/useLocalStorage';

export const ApplicationContext = createContext(null);

export const ApplicationProvider = ({ children }) => {
  const [applications, setApplications] = useLocalStorage('tracker-app-strict-empty-v1', []);

  // Computed stats
  const stats = useMemo(() => {
    const total = applications.length;
    const applied = applications.filter((a) => a.status === 'applied').length;
    const interviews = applications.filter((a) => a.status === 'interview').length;
    const offers = applications.filter((a) => a.status === 'offer').length;
    const rejected = applications.filter((a) => a.status === 'rejected').length;
    const bookmarked = applications.filter((a) => a.bookmarked).length;

    return { total, applied, interviews, offers, rejected, bookmarked };
  }, [applications]);

  const value = useMemo(
    () => ({
      applications,
      setApplications,
      loading: false,
      stats,
    }),
    [applications, setApplications, stats]
  );

  return (
    <ApplicationContext.Provider value={value}>
      {children}
    </ApplicationContext.Provider>
  );
};
