import { motion } from 'framer-motion';
import { PIPELINE_TABS } from '../../utils/constants';

const PipelineTabs = ({ activeTab, onChange, counts }) => {
  return (
    <div className="flex items-center gap-1 overflow-x-auto pb-1 scrollbar-hide">
      {PIPELINE_TABS.map((tab) => {
        const isActive = activeTab === tab.value;
        const count = counts[tab.value] ?? 0;

        return (
          <button
            key={tab.value}
            onClick={() => onChange(tab.value)}
            className={`relative flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-medium whitespace-nowrap transition-all duration-200 cursor-pointer
              ${isActive ? 'text-primary-700' : 'text-surface-500 hover:text-surface-700 hover:bg-surface-50'}`}
          >
            {isActive && (
              <motion.div
                layoutId="pipeline-tab"
                className="absolute inset-0 bg-primary-50 border border-primary-200/50 rounded-xl"
                transition={{ type: 'spring', stiffness: 400, damping: 30 }}
              />
            )}
            <span className="relative z-10">{tab.label}</span>
            <span
              className={`relative z-10 min-w-[20px] h-5 px-1.5 rounded-full text-[10px] font-bold flex items-center justify-center
                ${isActive ? 'bg-primary-200/60 text-primary-700' : 'bg-surface-100 text-surface-400'}`}
            >
              {count}
            </span>
          </button>
        );
      })}
    </div>
  );
};

export default PipelineTabs;
