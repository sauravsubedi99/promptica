// src/components/ui/Feedback/Alert.jsx
import React from 'react';
import { X, CheckCircle, AlertCircle, AlertTriangle, Info } from 'lucide-react';

const Alert = ({
  children,
  variant = 'info',
  size = 'md',
  dismissible = false,
  onDismiss,
  icon = true,
  className = '',
  ...props
}) => {
  // Icon mapping
  const iconMap = {
    success: CheckCircle,
    error: AlertCircle,
    warning: AlertTriangle,
    info: Info
  };

  // Base styles
  const baseStyles = 'flex items-start rounded-md border transition-all duration-200';

  // Variant styles
  const variantStyles = {
    success: 'bg-green-50 border-green-200 text-green-800',
    error: 'bg-red-50 border-red-200 text-red-800',
    warning: 'bg-yellow-50 border-yellow-200 text-yellow-800',
    info: 'bg-blue-50 border-blue-200 text-blue-800'
  };

  // Size styles
  const sizeStyles = {
    sm: 'p-3 text-sm',
    md: 'p-4 text-sm',
    lg: 'p-5 text-base'
  };

  // Icon color styles
  const iconColorStyles = {
    success: 'text-green-500',
    error: 'text-red-500',
    warning: 'text-yellow-500',
    info: 'text-blue-500'
  };

  // Get the appropriate icon
  const IconComponent = iconMap[variant];

  // Combine all styles
  const alertClasses = `
    ${baseStyles}
    ${variantStyles[variant]}
    ${sizeStyles[size]}
    ${className}
  `.trim().replace(/\s+/g, ' ');

  return (
    <div className={alertClasses} role="alert" {...props}>
      {/* Icon */}
      {icon && IconComponent && (
        <div className="flex-shrink-0 mr-3">
          <IconComponent className={`w-5 h-5 ${iconColorStyles[variant]}`} />
        </div>
      )}

      {/* Content */}
      <div className="flex-1 min-w-0">
        {children}
      </div>

      {/* Dismiss Button */}
      {dismissible && (
        <div className="ml-3 flex-shrink-0">
          <button
            type="button"
            onClick={onDismiss}
            className={`inline-flex rounded-md p-1 hover:bg-opacity-20 focus:outline-none focus:ring-2 focus:ring-offset-2 ${
              variant === 'success' ? 'text-green-500 hover:bg-green-600 focus:ring-green-500' :
              variant === 'error' ? 'text-red-500 hover:bg-red-600 focus:ring-red-500' :
              variant === 'warning' ? 'text-yellow-500 hover:bg-yellow-600 focus:ring-yellow-500' :
              'text-blue-500 hover:bg-blue-600 focus:ring-blue-500'
            }`}
          >
            <span className="sr-only">Dismiss</span>
            <X className="w-4 h-4" />
          </button>
        </div>
      )}
    </div>
  );
};

// Alert Title Component
const AlertTitle = ({
  children,
  className = '',
  ...props
}) => {
  const titleClasses = `
    font-semibold mb-1
    ${className}
  `.trim().replace(/\s+/g, ' ');

  return (
    <h4 className={titleClasses} {...props}>
      {children}
    </h4>
  );
};

// Alert Description Component
const AlertDescription = ({
  children,
  className = '',
  ...props
}) => {
  const descriptionClasses = `
    opacity-90
    ${className}
  `.trim().replace(/\s+/g, ' ');

  return (
    <p className={descriptionClasses} {...props}>
      {children}
    </p>
  );
};

// Convenience components for each variant
export const SuccessAlert = (props) => <Alert variant="success" {...props} />;
export const ErrorAlert = (props) => <Alert variant="error" {...props} />;
export const WarningAlert = (props) => <Alert variant="warning" {...props} />;
export const InfoAlert = (props) => <Alert variant="info" {...props} />;

export default Alert;
export { AlertTitle, AlertDescription };