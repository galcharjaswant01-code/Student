import React from 'react';
import { GraduationCap } from 'lucide-react';

const Logo = ({ size = 'md', className = '', showText = true }) => {
  const sizeMap = {
    sm: { icon: 'w-5 h-5', text: 'text-lg' },
    md: { icon: 'w-6 h-6', text: 'text-2xl' },
    lg: { icon: 'w-8 h-8', text: 'text-3xl' },
  };

  const currentSize = sizeMap[size] || sizeMap.md;

  return (
    <div className={`flex items-center gap-2.5 font-bold select-none ${className}`}>
      <div className="flex items-center justify-center p-2 rounded-lg border border-blue-600 text-blue-600 dark:text-blue-400 bg-transparent">
        <GraduationCap className={currentSize.icon} />
      </div>
      {showText && (
        <span className={`tracking-tight font-bold ${currentSize.text} text-slate-900 dark:text-white`}>
          Student<span className="text-blue-600 dark:text-blue-400">Hub</span>
        </span>
      )}
    </div>
  );
};

export default Logo;
