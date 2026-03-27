const Badge = ({ children, variant = 'default', className = '' }) => {
  const variants = {
    default: 'bg-surface-100 text-surface-600',
    primary: 'bg-primary-100 text-primary-700',
    success: 'bg-success-100 text-success-500',
    warning: 'bg-warning-100 text-warning-500',
    danger: 'bg-danger-100 text-danger-500',
    info: 'bg-info-100 text-info-500',
  };

  return (
    <span
      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold ${variants[variant] || variants.default} ${className}`}
    >
      {children}
    </span>
  );
};

export default Badge;
