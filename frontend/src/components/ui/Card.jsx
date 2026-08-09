import React from 'react';

const Card = ({ children, title, subtitle, action, className = '', headerClassName = '' }) => {
  return (
    <div className={`bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-5 shadow-xs ${className}`}>
      {(title || subtitle || action) && (
        <div className={`flex items-center justify-between gap-4 mb-4 pb-3 border-b border-slate-100 dark:border-slate-800/80 ${headerClassName}`}>
          <div>
            {title && <h3 className="text-base font-bold text-slate-900 dark:text-white tracking-tight">{title}</h3>}
            {subtitle && <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5 font-normal">{subtitle}</p>}
          </div>
          {action && <div>{action}</div>}
        </div>
      )}
      {children}
    </div>
  );
};

export default Card;
