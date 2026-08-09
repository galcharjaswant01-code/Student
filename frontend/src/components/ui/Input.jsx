import React from 'react';

const Input = ({ label, icon: Icon, error, className = '', ...props }) => {
  return (
    <div className="space-y-1.5 w-full">
      {label && (
        <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300">
          {label}
        </label>
      )}
      <div className="relative">
        {Icon && (
          <Icon className="w-4 h-4 text-slate-400 absolute left-3.5 top-3 transform -translate-y-1/2" />
        )}
        <input
          className={`w-full py-2.5 rounded-lg border border-slate-300 dark:border-slate-800 bg-white dark:bg-slate-900 text-slate-900 dark:text-white text-sm focus:outline-none focus:border-blue-600 dark:focus:border-blue-500 transition-colors placeholder:text-slate-400 ${Icon ? 'pl-10 pr-4' : 'px-4'} ${className}`}
          {...props}
        />
      </div>
      {error && <p className="text-xs text-blue-600 dark:text-blue-400 font-medium">{error}</p>}
    </div>
  );
};

export default Input;
