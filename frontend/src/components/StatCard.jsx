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
      className="relative overflow-hidden bg-[#1B2430] border border-slate-800 p-6 rounded-sm flex flex-col justify-between h-full w-full"
    >
      <div className={`absolute -right-12 top-1/2 -translate-y-1/2 w-40 h-40 rounded-full ${solidColor} opacity-20 pointer-events-none`}></div>
      
      <div className="flex justify-between items-center mb-4 relative z-10">
        <div>
          <h3 className="text-sm font-semibold text-slate-400 mb-1">{title}</h3>
          <div className="flex items-baseline gap-2">
            <span className="text-4xl font-extrabold text-white tracking-tight">{value}</span>
          </div>
        </div>
        <div className={`w-12 h-12 rounded-md flex items-center justify-center ${solidColor}`}>
          <Icon className="w-6 h-6 text-white" />
        </div>
      </div>

      <div className="relative z-10">
        <div className="flex items-center gap-2 mt-3">
          <span className={`flex items-center text-xs font-bold px-2 py-1 rounded-md ${isPositive ? 'bg-emerald-500/10 text-emerald-500' : 'bg-red-500/10 text-red-500'}`}>
            {isPositive ? '↑' : '↓'} {change}
          </span>
          <span className="text-[10px] bg-slate-800 text-slate-400 px-2 py-1 rounded-full font-medium">
            Prediction: {(parseFloat(value) * 1.05).toFixed(1)}{value.includes('%') ? '%' : ''}
          </span>
        </div>
      </div>
    </div>
  );
};

export default StatCard;
