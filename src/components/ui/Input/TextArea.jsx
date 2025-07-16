// src/components/ui/Input/TextArea.jsx
import React, { forwardRef } from 'react';

const TextArea = forwardRef(({
  label,
  error,
  helper,
  rows = 4,
  resize = 'vertical',
  fullWidth = true,
  required = false,
  disabled = false,
  placeholder,
  className = '',
  containerClassName = '',
  ...props
}, ref) => {
  const baseStyles = 'border border-gray-300 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 disabled:opacity-50 disabled:cursor-not-allowed px-3 py-2 text-sm rounded-md';
  
  const resizeStyles = {
    none: 'resize-none',
    vertical: 'resize-y',
    horizontal: 'resize-x',
    both: 'resize'
  };

  const textareaClasses = `
    ${baseStyles}
    ${resizeStyles[resize]}
    ${fullWidth ? 'w-full' : ''}
    ${error ? 'border-red-300 focus:border-red-500 focus:ring-red-500' : ''}
    ${className}
  `.trim().replace(/\s+/g, ' ');

  return (
    <div className={`${fullWidth ? 'w-full' : ''} ${containerClassName}`}>
      {/* Label */}
      {label && (
        <label className="block text-sm font-medium text-gray-700 mb-1">
          {label}
          {required && <span className="text-red-500 ml-1">*</span>}
        </label>
      )}

      {/* TextArea */}
      <textarea
        ref={ref}
        rows={rows}
        disabled={disabled}
        placeholder={placeholder}
        className={textareaClasses}
        {...props}
      />

      {/* Helper Text */}
      {helper && !error && (
        <p className="mt-1 text-xs text-gray-500">{helper}</p>
      )}

      {/* Error Message */}
      {error && (
        <p className="mt-1 text-xs text-red-600">{error}</p>
      )}
    </div>
  );
});

TextArea.displayName = 'TextArea';

export default TextArea;