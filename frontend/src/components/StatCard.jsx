import React from 'react';

const StatCard = ({ icon: Icon, title, subtitle }) => {
  return (
    <div className="bg-slate-900/80 border border-slate-700/80 backdrop-blur-xs rounded-lg p-3 text-white flex items-center gap-3">
      <div className="p-2 rounded-md border border-blue-500/50 text-blue-400 bg-transparent shrink-0">
        <Icon className="w-4 h-4 text-blue-400" />
      </div>
      <div>
        <span className="text-sm font-bold text-white block leading-snug">{title}</span>
        {subtitle && <span className="text-xs text-slate-300 block font-normal">{subtitle}</span>}
      </div>
    </div>
  );
};

export default StatCard;
