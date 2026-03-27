import { HiOutlineMenu, HiOutlineBriefcase } from 'react-icons/hi';

const TopBar = ({ onOpenSidebar }) => {
  return (
    <header className="flex items-center justify-between px-4 sm:px-6 py-3 sm:py-4 bg-white border-b border-surface-200 sticky top-0 z-30 shadow-sm">
      <div className="flex items-center gap-3 sm:gap-4">
        <button
          onClick={onOpenSidebar}
          className="p-2 -ml-2 rounded-lg hover:bg-surface-100 transition-colors cursor-pointer"
          aria-label="Open menu"
        >
          <HiOutlineMenu className="w-6 h-6 text-surface-600" />
        </button>
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-primary-500 to-primary-700 flex items-center justify-center shadow-md shadow-primary-500/20">
            <HiOutlineBriefcase className="w-4 h-4 text-white" />
          </div>
          <span className="text-base font-bold text-surface-900 tracking-tight">JobTracker</span>
        </div>
      </div>
    </header>
  );
};

export default TopBar;
