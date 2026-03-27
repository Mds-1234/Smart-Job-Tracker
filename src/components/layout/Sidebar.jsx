import { NavLink, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  HiOutlineViewGrid,
  HiOutlineDocumentText,
  HiOutlinePlusCircle,
  HiOutlineChartBar,
  HiOutlineBriefcase,
  HiOutlineX,
} from 'react-icons/hi';

const navItems = [
  { path: '/dashboard', label: 'Dashboard', icon: HiOutlineViewGrid },
  { path: '/applications', label: 'Applications', icon: HiOutlineDocumentText },
  { path: '/applications/new', label: 'Add New', icon: HiOutlinePlusCircle },
  { path: '/analytics', label: 'Analytics', icon: HiOutlineChartBar },
];

const Sidebar = ({ isOpen, setIsOpen }) => {
  const location = useLocation();

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/20 backdrop-blur-sm z-40"
            onClick={() => setIsOpen(false)}
          />

          {/* Sidebar Drawer */}
          <motion.aside
            initial={{ x: '-100%' }}
            animate={{ x: 0 }}
            exit={{ x: '-100%' }}
            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
            className="fixed top-0 left-0 bottom-0 w-72 bg-white shadow-2xl z-50 flex flex-col"
          >
            {/* Header */}
            <div className="flex items-center justify-between px-6 py-5 border-b border-surface-100">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-primary-500 to-primary-700 flex items-center justify-center shadow-lg shadow-primary-500/20">
                  <HiOutlineBriefcase className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h1 className="text-base font-bold text-surface-900 leading-tight">JobTracker</h1>
                  <p className="text-[11px] text-surface-400 font-medium">Smart Dashboard</p>
                </div>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="p-1.5 -mr-1.5 rounded-lg hover:bg-surface-100 transition-colors cursor-pointer"
                aria-label="Close menu"
              >
                <HiOutlineX className="w-5 h-5 text-surface-500" />
              </button>
            </div>

            {/* Navigation */}
            <nav className="flex-1 px-3 py-4 space-y-1 overflow-y-auto">
              {navItems.map((item) => {
                const isActive =
                  item.path === '/applications'
                    ? location.pathname === '/applications'
                    : location.pathname.startsWith(item.path);

                return (
                  <NavLink
                    key={item.path}
                    to={item.path}
                    className="relative block"
                    onClick={() => setIsOpen(false)}
                  >
                    <div
                      className={`flex items-center gap-3 px-3 py-3 rounded-xl text-sm font-medium transition-all duration-200 ${
                        isActive
                          ? 'text-primary-700 bg-primary-50'
                          : 'text-surface-500 hover:text-surface-800 hover:bg-surface-50'
                      }`}
                    >
                      {isActive && (
                        <motion.div
                          layoutId="sidebar-indicator"
                          className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-8 bg-primary-600 rounded-r-full"
                          transition={{ type: 'spring', stiffness: 350, damping: 30 }}
                        />
                      )}
                      <item.icon className={`w-5 h-5 flex-shrink-0 ${isActive ? 'text-primary-600' : ''}`} />
                      <span>{item.label}</span>
                    </div>
                  </NavLink>
                );
              })}
            </nav>

            {/* Footer */}
            <div className="px-4 py-4 border-t border-surface-100">
              <div className="bg-gradient-to-br from-primary-50 to-primary-100/50 rounded-xl px-4 py-3">
                <p className="text-xs font-semibold text-primary-700">Pro Tip</p>
                <p className="text-xs text-primary-600/70 mt-0.5">
                  Bookmark your top roles for quick access ⭐
                </p>
              </div>
            </div>
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
};

export default Sidebar;
