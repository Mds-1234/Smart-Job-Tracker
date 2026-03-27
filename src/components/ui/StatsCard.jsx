import { motion } from 'framer-motion';

const StatsCard = ({ icon: Icon, label, value, color, trend, delay = 0 }) => {
  const colorMap = {
    primary: {
      bg: 'bg-primary-50',
      icon: 'bg-primary-100 text-primary-600',
      value: 'text-primary-700',
    },
    success: {
      bg: 'bg-success-100/50',
      icon: 'bg-success-100 text-success-500',
      value: 'text-success-500',
    },
    warning: {
      bg: 'bg-warning-100/50',
      icon: 'bg-warning-100 text-warning-500',
      value: 'text-warning-500',
    },
    danger: {
      bg: 'bg-danger-100/50',
      icon: 'bg-danger-100 text-danger-500',
      value: 'text-danger-500',
    },
    info: {
      bg: 'bg-info-100/50',
      icon: 'bg-info-100 text-info-500',
      value: 'text-info-500',
    },
  };

  const colors = colorMap[color] || colorMap.primary;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay, duration: 0.3 }}
      whileHover={{ y: -2, boxShadow: '0 8px 30px rgba(0,0,0,0.08)' }}
      className="bg-white rounded-2xl border border-surface-100 p-5 cursor-default"
    >
      <div className="flex items-center justify-between">
        <div>
          <p className="text-xs font-medium text-surface-500 uppercase tracking-wider">
            {label}
          </p>
          <p className={`text-3xl font-bold mt-1 ${colors.value}`}>
            {value}
          </p>
          {trend && (
            <p className="text-xs text-surface-400 mt-1">{trend}</p>
          )}
        </div>
        <div className={`w-12 h-12 rounded-xl ${colors.icon} flex items-center justify-center`}>
          <Icon className="w-6 h-6" />
        </div>
      </div>
    </motion.div>
  );
};

export default StatsCard;
