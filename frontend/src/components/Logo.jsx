import React from 'react';
import { GraduationCap } from 'lucide-react';

const Logo = ({ size = 'md', className = '', showText = true }) => {
  const sizeMap = {
    sm: { icon: 'w-5 h-5', text: 'text-lg' },
    md: { icon: 'w-7 h-7', text: 'text-2xl' },
    lg: { icon: 'w-9 h-9', text: 'text-3xl' },
  };

  const currentSize = sizeMap[size] || sizeMap.md;

  return (
    <div className={`flex items-center gap-2.5 font-bold select-none ${className}`}>
      <div className="flex items-center justify-center p-2 rounded-xl bg-gradient-to-tr from-indigo-600 to-indigo-500 text-white shadow-md shadow-indigo-500/20">
        <GraduationCap className={currentSize.icon} />
      </div>
      {showText && (
        <span className={`tracking-tight font-extrabold ${currentSize.text} text-slate-900 dark:text-white`}>
          Student<span className="text-indigo-600 dark:text-indigo-400">Hub</span>
        </span>
      )}
    </div>
  );
};

export default Logo;
