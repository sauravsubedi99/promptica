// src/components/ui/Input/Input.jsx
import React, { forwardRef } from 'react';

const Input = forwardRef(({
  label,
  error,
  helper,
  leftIcon,
  rightIcon,
  type = 'text',
  size = 'md',
  variant = 'default',
  fullWidth = true,
  required = false,
  disabled = false,
  placeholder = ' ',
  className = '',
  containerClassName = '',
  ...props
}, ref) => {
  const baseStyles = 'border transition-all focus:outline-none focus:ring-2 focus:ring-offset-0 disabled:opacity-50 disabled:cursor-not-allowed peer';

  const variantStyles = {
    default: 'border-gray-300 focus:border-blue-500 focus:ring-blue-500',
    error: 'border-red-300 focus:border-red-500 focus:ring-red-500',
    success: 'border-green-300 focus:border-green-500 focus:ring-green-500'
  };

  const sizeStyles = {
    sm: 'px-3 pt-4 pb-1.5 text-sm rounded-md',
    md: 'px-3 pt-4 pb-2 text-sm rounded-md',
    lg: 'px-4 pt-5 pb-3 text-base rounded-lg',
    xl: 'px-5 pt-6 pb-4 text-lg rounded-xl',
    xxl: 'px-6 pt-7 pb-5 text-xl rounded-xxl'
  };

  const inputVariant = error ? 'error' : variant;

  const inputClasses = `
    ${baseStyles}
    ${variantStyles[inputVariant]}
    ${sizeStyles[size]}
    ${fullWidth ? 'w-full' : ''}
    ${leftIcon ? 'pl-10' : ''}
    ${rightIcon ? 'pr-10' : ''}
    ${className}
  `.trim().replace(/\s+/g, ' ');

  return (
    <div className={`${fullWidth ? 'w-full' : ''} ${containerClassName}`}>
      <label className="relative block cursor-text">
        {leftIcon && (
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <span className="text-gray-400">{leftIcon}</span>
          </div>
        )}

        <input
          ref={ref}
          type={type}
          placeholder=" "
          disabled={disabled}
          required={required}
          className={inputClasses}
          {...props}
        />

        {label && (
          <span
            className={`
              absolute left-3 top-2 text-xs transition-all
              peer-placeholder-shown:top-3.5
              peer-placeholder-shown:text-sm
              peer-placeholder-shown:text-gray-400
              peer-focus:top-1
              peer-focus:text-xs
              peer-focus:text-blue-500
              ${leftIcon ? 'left-10' : ''}
            `}
          >
            {label}{required && <span className="text-red-500 ml-0.5">*</span>}
          </span>
        )}

        {rightIcon && (
          <div className="absolute inset-y-0 right-0 pr-3 flex items-center">
            {rightIcon}
          </div>
        )}
      </label>

      {helper && !error && (
        <p className="mt-1 text-xs text-gray-500">{helper}</p>
      )}
      {error && (
        <p className="mt-1 text-xs text-red-600">{error}</p>
      )}
    </div>
  );
});

Input.displayName = 'Input';
export default Input;
