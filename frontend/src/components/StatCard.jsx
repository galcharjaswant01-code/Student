import React from 'react';


const StatCard = ({ title, value, change, icon: Icon, color, progress = 0 }) => {
  const isPositive = change.startsWith('+');
  const bgColor = color.split(' ').find(c => c.startsWith('bg-')) || 'bg-blue-600'; // Or use fallback from gradient if needed, color is passed like "from-primary to-blue-600" so let's parse that
  // Extract base color if color is 'from-primary to-blue-600' -> we can just map it.
  let solidColor = 'bg-slate-500';
  if (color.includes('primary')) solidColor = 'bg-blue-600';
  if (color.includes('secondary')) solidColor = 'bg-indigo-600';
  if (color.includes('accent')) solidColor = 'bg-cyan-600';
  if (color.includes('success')) solidColor = 'bg-emerald-600';

  return (
    <div
      className="relative overflow-hidden h-full w-full p-4 sm:p-6 cursor-pointer flex flex-col justify-between"
    >
      
      <div className="flex justify-between items-center relative z-10 w-full">
        <div className="min-w-0">
          <h3 className="text-xs sm:text-sm font-semibold text-slate-500 dark:text-slate-400 mb-1 truncate">{title}</h3>
          <div className="flex items-baseline gap-2">
            <span className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight break-all">{value}</span>
          </div>
        </div>
        <div className={`w-10 h-10 sm:w-12 sm:h-12 rounded-md flex items-center justify-center shrink-0 ${solidColor}`}>
          <Icon className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
        </div>
      </div>
    </div>
  );
};

export default StatCard;
