import React from 'react';

interface CardProps {
  className?: string;
  children: React.ReactNode;
}

const Card: React.FC<CardProps> = ({ className = '', children }) => {
  return (
    <div className={`bg-white shadow-md rounded-lg p-6 ${className}`}>
      {children}
    </div>
  );
};

const CardHeader: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <div className="mb-4">{children}</div>
);

const CardTitle: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <h2 className="text-2xl font-bold">{children}</h2>
);

const CardDescription: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <p className="text-gray-600">{children}</p>
);

const CardContent: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <div>{children}</div>
);

const CardFooter: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <div className="mt-4 pt-4 border-t border-gray-200">{children}</div>
);

export { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter };
