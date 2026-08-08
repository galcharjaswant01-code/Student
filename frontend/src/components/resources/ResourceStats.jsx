import React from 'react';

import { BookOpen, Download, Bookmark, Clock, Library } from 'lucide-react';
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';

const StatCard = ({ title, value, subtitle, icon: Icon, colorClass, gradientClass, delay }) => {
  const bgColor = colorClass.split(' ').find(c => c.startsWith('bg-')) || 'bg-slate-500';
  return (
    <div
      className="relative overflow-hidden bg-white/70 dark:bg-[#0F172A]/70 border border-slate-200/50 dark:border-white/5 p-5 sm:p-6 rounded-2xl cursor-pointer shadow-sm hover:border-primary/20 dark:hover:border-primary/20 transition-all duration-300"
    >
      <div className="flex justify-between items-center relative z-10">
        <div className="min-w-0">
          <h3 className="text-xs sm:text-sm font-semibold text-slate-500 dark:text-slate-400 mb-1 truncate">{title}</h3>
          <div className="flex items-baseline gap-2">
            <span className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight break-all">{value}</span>
          </div>
        </div>
        <div className={`w-10 h-10 sm:w-12 sm:h-12 rounded-xl flex items-center justify-center shrink-0 ${bgColor} shadow-md`}>
          <Icon className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
        </div>
      </div>
    </div>
  );
};

const ResourceStats = ({ stats, loading }) => {
  if (loading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {[...Array(4)].map((_, i) => (
          <div key={i} className="h-40 bg-slate-200/50 dark:bg-slate-800/50 animate-pulse rounded-sm" />
        ))}
      </div>
    );
  }

  if (!stats) return null;

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      
      <StatCard 
        title="Total Resources" 
        value={stats.totalResources} 
        subtitle="Available across all subjects"
        icon={Library}
        colorClass="bg-indigo-500 text-indigo-600 dark:text-indigo-400"
        gradientClass="bg-indigo-500"
        delay={0.1}
      />

      <StatCard 
        title="Downloaded" 
        value={stats.downloadedResources} 
        subtitle="Materials downloaded offline"
        icon={Download}
        colorClass="bg-blue-500 text-blue-600 dark:text-blue-400"
        gradientClass="bg-blue-500"
        delay={0.2}
      />

      <StatCard 
        title="Saved Resources" 
        value={stats.savedResources} 
        subtitle="Bookmarked for later"
        icon={Bookmark}
        colorClass="bg-emerald-500 text-emerald-600 dark:text-emerald-400"
        gradientClass="bg-emerald-500"
        delay={0.3}
      />

      <StatCard 
        title="Recently Viewed" 
        value={stats.recentlyViewed} 
        subtitle="Accessed this week"
        icon={Clock}
        colorClass="bg-amber-500 text-amber-600 dark:text-amber-400"
        gradientClass="bg-amber-500"
        delay={0.4}
      />

    </div>
  );
};

export default ResourceStats;
