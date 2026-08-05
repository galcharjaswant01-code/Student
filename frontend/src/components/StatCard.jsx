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
      className="relative overflow-hidden bg-[#1B2430] border border-slate-800 p-6 rounded-sm cursor-pointer"
    >
      
      <div className="flex justify-between items-center relative z-10">
        <div>
          <h3 className="text-sm font-semibold text-slate-400 mb-1">{title}</h3>
          <div className="flex items-baseline gap-2">
            <span className="text-4xl font-bold text-white tracking-tight">{value}</span>
          </div>
        </div>
        <div className={`w-12 h-12 rounded-md flex items-center justify-center ${solidColor}`}>
          <Icon className="w-6 h-6 text-white" />
        </div>
      </div>
    </div>
  );
};

export default StatCard;
