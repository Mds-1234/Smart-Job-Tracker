import { forwardRef } from 'react';

const Select = forwardRef(
  ({ label, error, options = [], placeholder, className = '', ...props }, ref) => {
    return (
      <div className="space-y-1.5">
        {label && (
          <label className="block text-sm font-medium text-surface-700">
            {label}
          </label>
        )}
        <select
          ref={ref}
          className={`w-full px-3.5 py-2.5 rounded-xl border text-sm transition-all duration-200 outline-none appearance-none bg-white cursor-pointer
            ${
              error
                ? 'border-danger-500 bg-danger-100/30 focus:ring-2 focus:ring-danger-500/20'
                : 'border-surface-200 focus:border-primary-400 focus:ring-2 focus:ring-primary-500/10 hover:border-surface-300'
            }
            ${className}`}
          {...props}
        >
          {placeholder && (
            <option value="">{placeholder}</option>
          )}
          {options.map((opt) => (
            <option key={typeof opt === 'string' ? opt : opt.value} value={typeof opt === 'string' ? opt : opt.value}>
              {typeof opt === 'string' ? opt : opt.label}
            </option>
          ))}
        </select>
        {error && (
          <p className="text-xs text-danger-500 font-medium">{error}</p>
        )}
      </div>
    );
  }
);

Select.displayName = 'Select';

export default Select;
