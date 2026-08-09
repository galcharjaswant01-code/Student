import React from 'react';

const Table = ({ headers = [], children, className = '' }) => {
  return (
    <div className={`w-full overflow-x-auto rounded-lg border border-slate-200 dark:border-slate-800 ${className}`}>
      <table className="w-full text-left border-collapse text-xs sm:text-sm">
        <thead className="bg-slate-50 dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300 font-semibold uppercase tracking-wider text-[11px]">
          <tr>
            {headers.map((header, idx) => (
              <th key={idx} className="px-4 py-3">
                {header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-100 dark:divide-slate-800/80 bg-white dark:bg-slate-950 text-slate-900 dark:text-slate-100">
          {children}
        </tbody>
      </table>
    </div>
  );
};

export default Table;
