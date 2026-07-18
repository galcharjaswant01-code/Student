import React, { useState } from 'react';

import { Fingerprint, CheckCircle2 } from 'lucide-react';

const AttendanceCheckIn = () => {
  const [isCheckedIn, setIsCheckedIn] = useState(false);

  const handleCheckIn = () => {
    setIsCheckedIn(true);
    // Future backend API call would go here
  };

  return (
    <div className="flex flex-col h-full w-full justify-center items-center relative overflow-hidden">
      
        {!isCheckedIn ? (
          <div
            key="check-in-button"
            className="flex flex-col items-center text-center w-full"
          >
            <div className="w-16 h-16 bg-primary/10 dark:bg-primary/20 rounded-full flex items-center justify-center mb-4">
              <Fingerprint className="w-8 h-8 text-primary" />
            </div>
            <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-1">
              Check In Today
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400 mb-5">
              Mark your attendance for Physics right now.
            </p>
            <button 
              onClick={handleCheckIn}
              className="w-full relative overflow-hidden group bg-gradient- bg-primary hover:bg-primary/90 hover: text-white rounded-sm py-3 text-sm font-bold -primary/25"
            >
              <div className="absolute inset-0 w-full h-full bg-white/20 transform -skew-x-12 -translate-x-full group-hover:animate-shine" />
              Mark Present
            </button>
          </div>
        ) : (
          <div
            key="success-message"
            className="flex flex-col items-center text-center w-full"
          >
            <div
              className="w-16 h-16 bg-emerald-100 dark:bg-emerald-500/20 rounded-full flex items-center justify-center mb-4 -[0_0_20px_rgba(16,185,129,0.3)]"
            >
              <CheckCircle2 className="w-8 h-8 text-emerald-500" />
            </div>
            <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-1">
              Checked In
            </h3>
            <p className="text-xs text-emerald-600 dark:text-emerald-400 font-medium">
              You've successfully marked your attendance for Physics at {new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}.
            </p>
          </div>
        )}
      
    </div>
  );
};

export default AttendanceCheckIn;
