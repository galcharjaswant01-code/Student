import React from 'react';
import { Info, X } from 'lucide-react';

const AlertMessage = ({ type = 'error', message, onClose }) => {
  if (!message) return null;

  // Strict 3-color palette: Blue accent / Dark Navy text & borders
  const style = 'bg-transparent border border-blue-600/40 text-slate-900 dark:text-slate-100';

  return (
    <div className={`flex items-start justify-between gap-3 p-3.5 rounded-lg text-xs sm:text-sm font-medium ${style}`}>
      <div className="flex items-center gap-2.5">
        <Info className="w-4 h-4 text-blue-600 dark:text-blue-400 shrink-0" />
        <span className="leading-relaxed">{message}</span>
      </div>
      {onClose && (
        <button
          onClick={onClose}
          className="p-1 text-slate-500 hover:text-slate-900 dark:hover:text-white transition-colors"
          aria-label="Dismiss alert"
        >
          <X className="w-4 h-4" />
        </button>
      )}
    </div>
  );
};

export default AlertMessage;
