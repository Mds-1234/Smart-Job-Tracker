import { motion } from 'framer-motion';

const EmptyState = ({
  icon: Icon,
  title = 'No data found',
  description = 'There are no items to display right now.',
  action,
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="flex flex-col items-center justify-center py-16 px-6"
    >
      {Icon && (
        <div className="w-16 h-16 rounded-2xl bg-surface-100 flex items-center justify-center mb-4">
          <Icon className="w-8 h-8 text-surface-400" />
        </div>
      )}
      <h3 className="text-lg font-semibold text-surface-800 mb-1">{title}</h3>
      <p className="text-sm text-surface-500 text-center max-w-sm mb-6">
        {description}
      </p>
      {action && action}
    </motion.div>
  );
};

export default EmptyState;
