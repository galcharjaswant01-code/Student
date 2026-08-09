import React from 'react';

const Button = ({ 
  children, 
  variant = 'primary', // 'primary' | 'secondary'
  size = 'md', // 'sm' | 'md' | 'lg'
  icon: Icon,
  className = '', 
  ...props 
}) => {
  const sizeClasses = {
    sm: 'px-3 py-1.5 text-xs rounded-md',
    md: 'px-4 py-2 text-sm rounded-lg',
    lg: 'px-5 py-2.5 text-base rounded-lg',
  };

  const variantClasses = {
    primary: 'bg-transparent border border-blue-600 dark:border-blue-500 text-blue-600 dark:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-950/40 font-semibold',
    secondary: 'bg-transparent border border-slate-300 dark:border-slate-700 text-slate-900 dark:text-slate-100 hover:bg-slate-100 dark:hover:bg-slate-800 font-semibold',
  };

  return (
    <button
      className={`inline-flex items-center justify-center gap-2 transition-colors duration-150 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer ${variantClasses[variant] || variantClasses.primary} ${sizeClasses[size] || sizeClasses.md} ${className}`}
      {...props}
    >
      {Icon && <Icon className="w-4 h-4 shrink-0" />}
      <span>{children}</span>
    </button>
  );
};

export default Button;
