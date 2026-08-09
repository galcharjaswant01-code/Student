import React from 'react';

const Badge = ({ children, variant = 'blue', icon: Icon, className = '' }) => {
  const variants = {
    blue: 'bg-blue-50 dark:bg-blue-950/40 text-blue-700 dark:text-blue-400 border border-blue-200 dark:border-blue-800',
    navy: 'bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-slate-100 border border-slate-300 dark:border-slate-700',
    outline: 'bg-transparent text-slate-700 dark:text-slate-300 border border-slate-300 dark:border-slate-700',
  };

  return (
    <span className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-md text-xs font-semibold ${variants[variant] || variants.blue} ${className}`}>
      {Icon && <Icon className="w-3.5 h-3.5 shrink-0" />}
      <span>{children}</span>
    </span>
  );
};

export default Badge;
