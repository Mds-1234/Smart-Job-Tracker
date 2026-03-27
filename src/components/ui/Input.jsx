import { forwardRef } from 'react';

const Input = forwardRef(
  ({ label, error, icon: Icon, className = '', ...props }, ref) => {
    return (
      <div className="space-y-1.5">
        {label && (
          <label className="block text-sm font-medium text-surface-700">
            {label}
          </label>
        )}
        <div className="relative">
          {Icon && (
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Icon className="w-4 h-4 text-surface-400" />
            </div>
          )}
          <input
            ref={ref}
            className={`w-full px-3.5 py-2.5 rounded-xl border text-sm transition-all duration-200 outline-none
              ${Icon ? 'pl-10' : ''}
              ${
                error
                  ? 'border-danger-500 bg-danger-100/30 focus:ring-2 focus:ring-danger-500/20'
                  : 'border-surface-200 bg-white focus:border-primary-400 focus:ring-2 focus:ring-primary-500/10 hover:border-surface-300'
              }
              placeholder:text-surface-400 ${className}`}
            {...props}
          />
        </div>
        {error && (
          <p className="text-xs text-danger-500 font-medium flex items-center gap-1">
            <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
              <path
                fillRule="evenodd"
                d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
                clipRule="evenodd"
              />
            </svg>
            {error}
          </p>
        )}
      </div>
    );
  }
);

Input.displayName = 'Input';

export default Input;
