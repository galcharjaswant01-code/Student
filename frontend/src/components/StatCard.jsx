import React from 'react';

const StatCard = ({ icon: Icon, title, subtitle, badge, delayClass = 'delay-0' }) => {
  return (
    <div className={`backdrop-blur-md bg-slate-900/60 border border-white/10 rounded-2xl p-4 shadow-xl text-white flex items-center gap-3 transform transition-all duration-300 hover:scale-105 hover:bg-slate-900/80 animate-float ${delayClass}`}>
      <div className="p-2.5 rounded-xl bg-gradient-to-br from-indigo-500/30 to-purple-500/30 text-indigo-300 border border-indigo-500/20">
        <Icon className="w-5 h-5 text-indigo-300" />
      </div>
      <div>
        <div className="flex items-center gap-2">
          <span className="text-base font-bold text-white tracking-wide">{title}</span>
          {badge && (
            <span className="text-[10px] uppercase tracking-wider font-semibold px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
              {badge}
            </span>
          )}
        </div>
        <p className="text-xs text-slate-300 font-medium">{subtitle}</p>
      </div>
    </div>
  );
};

export default StatCard;
