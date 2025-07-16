// src/components/ui/Typography/Heading.jsx
import React from 'react';

const Heading = ({
  children,
  level = 1,
  size,
  weight = 'semibold',
  color = 'gray-200',
  className = '',
  ...props
}) => {
  // Level to tag mapping
  const Component = `h${level}`;

  // Default size based on level if not specified
  const defaultSizes = {
    1: 'text-3xl md:text-4xl',
    2: 'text-2xl md:text-3xl',
    3: 'text-xl md:text-2xl',
    4: 'text-lg md:text-xl',
    5: 'text-base md:text-lg',
    6: 'text-sm md:text-base'
  };

  // Size styles
  const sizeStyles = {
    xs: 'text-xs',
    sm: 'text-sm',
    base: 'text-base',
    lg: 'text-lg',
    xl: 'text-xl',
    '2xl': 'text-2xl',
    '3xl': 'text-3xl',
    '4xl': 'text-4xl',
    '5xl': 'text-5xl',
    '6xl': 'text-6xl'
  };

  // Weight styles
  const weightStyles = {
    thin: 'font-thin',
    light: 'font-light',
    normal: 'font-normal',
    medium: 'font-medium',
    semibold: 'font-semibold',
    bold: 'font-bold',
    extrabold: 'font-extrabold',
    black: 'font-black'
  };

  // Color styles
  const colorStyles = {
    'gray-900': 'text-gray-900',
    'gray-800': 'text-gray-800',
    'gray-700': 'text-gray-700',
    'gray-600': 'text-gray-600',
    'blue-600': 'text-blue-600',
    'blue-700': 'text-blue-700',
    'green-600': 'text-green-600',
    'red-600': 'text-red-600',
    'yellow-600': 'text-yellow-600',
    white: 'text-white'
  };

  // Determine final size
  const finalSize = size ? sizeStyles[size] : defaultSizes[level];

  // Combine all styles
  const headingClasses = `
    ${finalSize}
    ${weightStyles[weight]}
    ${colorStyles[color]}
    leading-tight
    ${className}
  `.trim().replace(/\s+/g, ' ');

  return (
    <Component className={headingClasses} {...props}>
      {children}
    </Component>
  );
};

// Convenience components
export const H1 = (props) => <Heading level={1} {...props} />;
export const H2 = (props) => <Heading level={2} {...props} />;
export const H3 = (props) => <Heading level={3} {...props} />;
export const H4 = (props) => <Heading level={4} {...props} />;
export const H5 = (props) => <Heading level={5} {...props} />;
export const H6 = (props) => <Heading level={6} {...props} />;

export default Heading;

