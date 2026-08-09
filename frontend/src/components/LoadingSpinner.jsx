import React from 'react';

const LoadingSpinner = ({ size = 'md', className = '' }) => {
  const sizeClasses = {
    sm: 'w-4 h-4 border-2',
    md: 'w-5 h-5 border-2',
    lg: 'w-8 h-8 border-3'
  };

  return (
    <div
      className={`inline-block animate-spin rounded-full border-current border-t-transparent text-indigo-600 dark:text-indigo-400 ${sizeClasses[size] || sizeClasses.md} ${className}`}
      role="status"
      aria-label="loading"
    >
      <span className="sr-only">Loading...</span>
    </div>
  );
};

export default LoadingSpinner;
