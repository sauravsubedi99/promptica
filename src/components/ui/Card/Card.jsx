// src/components/ui/Card/Card.jsx
import React from 'react';

const Card = ({
  children,
  variant = 'default',
  padding = 'md',
  shadow = 'md',
  rounded = 'md',
  border = true,
  hover = false,
  className = '',
  ...props
}) => {
  // Base styles
  const baseStyles = 'bg-white transition-all duration-200';

  // Variant styles
  const variantStyles = {
    default: 'bg-white',
    gray: 'bg-gray-50',
    blue: 'bg-blue-50',
    green: 'bg-green-50',
    yellow: 'bg-yellow-50',
    red: 'bg-red-50'
  };

  // Padding styles
  const paddingStyles = {
    none: '',
    sm: 'p-3',
    md: 'p-4',
    lg: 'p-6',
    xl: 'p-8'
  };

  // Shadow styles
  const shadowStyles = {
    none: '',
    sm: 'shadow-sm',
    md: 'shadow-md',
    lg: 'shadow-lg',
    xl: 'shadow-xl'
  };

  // Rounded styles
  const roundedStyles = {
    none: '',
    sm: 'rounded-sm',
    md: 'rounded-md',
    lg: 'rounded-lg',
    xl: 'rounded-xl',
    full: 'rounded-full'
  };

  // Border styles
  const borderStyles = border ? 'border border-gray-200' : '';

  // Hover styles
  const hoverStyles = hover ? 'hover:shadow-lg hover:-translate-y-1 cursor-pointer' : '';

  // Combine all styles
  const cardClasses = `
    ${baseStyles}
    ${variantStyles[variant]}
    ${paddingStyles[padding]}
    ${shadowStyles[shadow]}
    ${roundedStyles[rounded]}
    ${borderStyles}
    ${hoverStyles}
    ${className}
  `.trim().replace(/\s+/g, ' ');

  return (
    <div className={cardClasses} {...props}>
      {children}
    </div>
  );
};

// Card Header Component
const CardHeader = ({
  children,
  className = '',
  border = true,
  ...props
}) => {
  const headerClasses = `
    px-4 py-3 
    ${border ? 'border-b border-gray-200' : ''}
    ${className}
  `.trim().replace(/\s+/g, ' ');

  return (
    <div className={headerClasses} {...props}>
      {children}
    </div>
  );
};

// Card Body Component
const CardBody = ({
  children,
  className = '',
  padding = 'md',
  ...props
}) => {
  const paddingStyles = {
    none: '',
    sm: 'p-3',
    md: 'p-4',
    lg: 'p-6',
    xl: 'p-8'
  };

  const bodyClasses = `
    ${paddingStyles[padding]}
    ${className}
  `.trim().replace(/\s+/g, ' ');

  return (
    <div className={bodyClasses} {...props}>
      {children}
    </div>
  );
};

// Card Footer Component
const CardFooter = ({
  children,
  className = '',
  border = true,
  ...props
}) => {
  const footerClasses = `
    px-4 py-3
    ${border ? 'border-t border-gray-200' : ''}
    ${className}
  `.trim().replace(/\s+/g, ' ');

  return (
    <div className={footerClasses} {...props}>
      {children}
    </div>
  );
};

// Card Title Component
const CardTitle = ({
  children,
  as: Component = 'h3',
  className = '',
  ...props
}) => {
  const titleClasses = `
    text-lg font-semibold text-gray-900
    ${className}
  `.trim().replace(/\s+/g, ' ');

  return (
    <Component className={titleClasses} {...props}>
      {children}
    </Component>
  );
};

// Card Description Component
const CardDescription = ({
  children,
  className = '',
  ...props
}) => {
  const descriptionClasses = `
    text-sm text-gray-600 mt-1
    ${className}
  `.trim().replace(/\s+/g, ' ');

  return (
    <p className={descriptionClasses} {...props}>
      {children}
    </p>
  );
};

export default Card;
export { CardHeader, CardBody, CardFooter, CardTitle, CardDescription };