import React from 'react';
import { User } from 'lucide-react';

const Avatar = ({ name = 'User', src, size = 'md', className = '' }) => {
  const sizes = {
    sm: 'w-7 h-7 text-xs',
    md: 'w-9 h-9 text-sm',
    lg: 'w-12 h-12 text-base',
  };

  const getInitials = (n) => {
    if (!n) return 'U';
    const parts = n.trim().split(' ');
    if (parts.length >= 2) return `${parts[0][0]}${parts[1][0]}`.toUpperCase();
    return parts[0][0].toUpperCase();
  };

  return (
    <div className={`relative inline-flex items-center justify-center rounded-full bg-slate-900 dark:bg-white text-white dark:text-slate-900 font-bold border border-slate-200 dark:border-slate-800 shrink-0 overflow-hidden ${sizes[size] || sizes.md} ${className}`}>
      {src ? (
        <img src={src} alt={name} className="w-full h-full object-cover" />
      ) : (
        <span>{getInitials(name)}</span>
      )}
    </div>
  );
};

export default Avatar;
