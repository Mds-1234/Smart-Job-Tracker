import { motion } from 'framer-motion';

const PageWrapper = ({ children, title, subtitle, action }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, ease: 'easeOut' }}
      className="flex-1 min-h-screen bg-surface-50"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 lg:py-8">
        {/* Page Header */}
        {(title || action) && (
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6 lg:mb-8">
            <div>
              {title && (
                <h1 className="text-2xl lg:text-3xl font-bold text-surface-900">
                  {title}
                </h1>
              )}
              {subtitle && (
                <p className="text-sm text-surface-500 mt-1">{subtitle}</p>
              )}
            </div>
            {action && <div className="flex-shrink-0">{action}</div>}
          </div>
        )}
        {children}
      </div>
    </motion.div>
  );
};

export default PageWrapper;
