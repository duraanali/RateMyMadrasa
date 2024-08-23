import React from 'react';

interface LabelProps extends React.LabelHTMLAttributes<HTMLLabelElement> {
  htmlFor: string;
}

const Label: React.FC<LabelProps> = ({ children, className = '', ...props }) => {
  return (
    <label className={`block text-sm font-medium text-gray-700 ${className}`} {...props}>
      {children}
    </label>
  );
};

export { Label };
