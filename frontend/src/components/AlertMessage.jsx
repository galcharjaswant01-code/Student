import React from 'react';
import { AlertCircle, CheckCircle2, Info, X } from 'lucide-react';

const AlertMessage = ({ type = 'error', message, onClose }) => {
  if (!message) return null;

  const typeStyles = {
    error: 'bg-rose-500/10 border-rose-500/30 text-rose-600 dark:text-rose-400',
    success: 'bg-emerald-500/10 border-emerald-500/30 text-emerald-600 dark:text-emerald-400',
    info: 'bg-blue-500/10 border-blue-500/30 text-blue-600 dark:text-blue-400',
  };

  const IconComponent = {
    error: AlertCircle,
    success: CheckCircle2,
    info: Info,
  }[type] || AlertCircle;

  return (
    <div className={`flex items-start justify-between gap-3 p-3.5 rounded-xl border text-sm animate-fade-in ${typeStyles[type]}`}>
      <div className="flex items-center gap-2.5">
        <IconComponent className="w-5 h-5 shrink-0" />
        <span className="font-medium leading-relaxed">{message}</span>
      </div>
      {onClose && (
        <button
          onClick={onClose}
          className="p-1 hover:opacity-75 transition-opacity"
          aria-label="Dismiss alert"
        >
          <X className="w-4 h-4" />
        </button>
      )}
    </div>
  );
};

export default AlertMessage;
