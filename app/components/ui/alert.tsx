import React from 'react';

interface AlertProps {
  children: React.ReactNode;
  variant?: 'default' | 'destructive';
  className?: string;
}

const Alert: React.FC<AlertProps> = ({ children, variant = 'default', className = '' }) => {
  const baseStyles = 'p-4 rounded-md';
  const variantStyles = {
    default: 'bg-blue-100 text-blue-700',
    destructive: 'bg-red-100 text-red-700',
  };

  const alertClasses = `${baseStyles} ${variantStyles[variant]} ${className}`;

  return (
    <div role="alert" className={alertClasses}>
      {children}
    </div>
  );
};

const AlertDescription: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <div className="text-sm">{children}</div>
);

export { Alert, AlertDescription };
