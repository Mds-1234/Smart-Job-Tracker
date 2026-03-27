import { useContext } from 'react';
import { ApplicationContext } from '../context/ApplicationContext';
import { generateId } from '../utils/constants';
import toast from 'react-hot-toast';

export const useApplications = () => {
  const context = useContext(ApplicationContext);

  if (!context) {
    throw new Error('useApplications must be used within ApplicationProvider');
  }

  const { applications, setApplications } = context;

  const addApplication = (data) => {
    const newApp = {
      ...data,
      id: generateId(),
      bookmarked: false,
      createdAt: new Date().toISOString(),
    };
    setApplications((prev) => [newApp, ...prev]);
    toast.success('Application added successfully!');
    return newApp;
  };

  const updateApplication = (id, data) => {
    setApplications((prev) =>
      prev.map((app) => (app.id === id ? { ...app, ...data } : app))
    );
    toast.success('Application updated!');
  };

  const deleteApplication = (id) => {
    setApplications((prev) => prev.filter((app) => app.id !== id));
    toast.success('Application deleted!');
  };

  const toggleBookmark = (id) => {
    setApplications((prev) =>
      prev.map((app) =>
        app.id === id ? { ...app, bookmarked: !app.bookmarked } : app
      )
    );
  };

  const getApplicationById = (id) => {
    return applications.find((app) => app.id === id) || null;
  };

  return {
    applications,
    addApplication,
    updateApplication,
    deleteApplication,
    toggleBookmark,
    getApplicationById,
  };
};
