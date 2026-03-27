import { useState } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { ApplicationProvider } from './context/ApplicationContext';
import Sidebar from './components/layout/Sidebar';
import TopBar from './components/layout/TopBar';
import Dashboard from './pages/Dashboard';
import ApplicationsList from './pages/ApplicationsList';
import NewApplication from './pages/NewApplication';
import ApplicationDetail from './pages/ApplicationDetail';
import Analytics from './pages/Analytics';

const App = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <BrowserRouter>
      <ApplicationProvider>
        <div className="flex min-h-screen bg-surface-50">
          {/* Main Content */}
          <div className="flex-1 flex flex-col min-w-0">
            {/* Top Navigation */}
            <TopBar onOpenSidebar={() => setIsSidebarOpen(true)} />

            {/* Drawer Sidebar */}
            <Sidebar isOpen={isSidebarOpen} setIsOpen={setIsSidebarOpen} />

            {/* Routes */}
            <Routes>
              <Route path="/" element={<Navigate to="/dashboard" replace />} />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/applications" element={<ApplicationsList />} />
              <Route path="/applications/new" element={<NewApplication />} />
              <Route path="/applications/:id" element={<ApplicationDetail />} />
              <Route path="/analytics" element={<Analytics />} />
            </Routes>
          </div>
        </div>

        {/* Toast Notifications */}
        <Toaster
          position="top-right"
          toastOptions={{
            duration: 3000,
            style: {
              background: '#fff',
              color: '#1e293b',
              borderRadius: '12px',
              border: '1px solid #e2e8f0',
              padding: '12px 16px',
              fontSize: '13px',
              fontWeight: 500,
              boxShadow: '0 10px 40px rgba(0,0,0,0.08)',
            },
            success: {
              iconTheme: {
                primary: '#22c55e',
                secondary: '#fff',
              },
            },
            error: {
              iconTheme: {
                primary: '#ef4444',
                secondary: '#fff',
              },
            },
          }}
        />
      </ApplicationProvider>
    </BrowserRouter>
  );
};

export default App;
