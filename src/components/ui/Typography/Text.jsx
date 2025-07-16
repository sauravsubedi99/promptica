// src/components/ui/Typography/Text.jsx
import React from 'react';

const Text = ({
  children,
  as: Component = 'p',
  size = 'base',
  weight = 'normal',
  color = 'gray-700',
  align = 'left',
  className = '',
  ...props
}) => {
  // Size styles
  const sizeStyles = {
    xs: 'text-xs',
    sm: 'text-sm',
    base: 'text-base',
    lg: 'text-lg',
    xl: 'text-xl',
    '2xl': 'text-2xl'
  };

  // Weight styles
  const weightStyles = {
    thin: 'font-thin',
    light: 'font-light',
    normal: 'font-normal',
    medium: 'font-medium',
    semibold: 'font-semibold',
    bold: 'font-bold',
    extrabold: 'font-extrabold'
  };

  // Color styles
  const colorStyles = {
    'gray-900': 'text-gray-900',
    'gray-800': 'text-gray-800',
    'gray-700': 'text-gray-700',
    'gray-600': 'text-gray-600',
    'gray-500': 'text-gray-500',
    'gray-400': 'text-gray-400',
    'blue-600': 'text-blue-600',
    'blue-700': 'text-blue-700',
    'green-600': 'text-green-600',
    'red-600': 'text-red-600',
    'yellow-600': 'text-yellow-600',
    white: 'text-white'
  };

  // Alignment styles
  const alignStyles = {
    left: 'text-left',
    center: 'text-center',
    right: 'text-right',
    justify: 'text-justify'
  };

  // Combine all styles
  const textClasses = `
    ${sizeStyles[size]}
    ${weightStyles[weight]}
    ${colorStyles[color]}
    ${alignStyles[align]}
    leading-relaxed
    ${className}
  `.trim().replace(/\s+/g, ' ');

  return (
    <Component className={textClasses} {...props}>
      {children}
    </Component>
  );
};

// Convenience components
export const SmallText = (props) => <Text size="sm" {...props} />;
export const LargeText = (props) => <Text size="lg" {...props} />;
export const MutedText = (props) => <Text color="gray-500" {...props} />;
export const BoldText = (props) => <Text weight="bold" {...props} />;

export default Text;