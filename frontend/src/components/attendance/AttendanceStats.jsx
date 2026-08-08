import React from 'react';

import { ArrowUp, CalendarDays, Clock, CalendarX, Flame, TrendingUp } from 'lucide-react';
import { Doughnut } from 'react-chartjs-2';

const StatCard = ({ title, value, subValue, icon: Icon, colorClass, gradientClass, delay, children }) => {
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

const AttendanceStats = () => {
  const doughnutData = {
    labels: ['Present', 'Absent', 'Late', 'Leave Approved', 'Holiday'],
    datasets: [{
      data: [82, 5, 3, 2, 8],
      backgroundColor: ['#10B981', '#EF4444', '#F59E0B', '#3B82F6', '#8B5CF6'],
      borderWidth: 0,
      hoverOffset: 4
    }]
  };
  
  const doughnutOptions = {
    responsive: true,
    maintainAspectRatio: false,
    cutout: '75%',
    plugins: { legend: { display: false }, tooltip: { enabled: false } }
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      
      {/* Overall Attendance */}
      <StatCard 
        title="Overall Attendance" 
        value="89.6%" 
        icon={TrendingUp}
        colorClass="bg-blue-500 text-blue-600 dark:text-blue-400"
        gradientClass="bg-blue-500"
        delay={0.1}
      />

      {/* Current Streak */}
      <StatCard 
        title="Current Streak" 
        value="12" 
        icon={Flame}
        colorClass="bg-orange-500 text-orange-600 dark:text-orange-400"
        gradientClass="bg-orange-500"
        delay={0.2}
      />

      {/* Present / Total Days */}
      <StatCard 
        title="Classes Attended" 
        value="43" 
        icon={CalendarDays}
        colorClass="bg-emerald-500 text-emerald-600 dark:text-emerald-400"
        gradientClass="bg-emerald-500"
        delay={0.3}
      />

      {/* Exceptions (Late/Absent) */}
      <StatCard 
        title="Exceptions" 
        value="8" 
        icon={Clock}
        colorClass="bg-purple-500 text-purple-600 dark:text-purple-400"
        gradientClass="bg-purple-500"
        delay={0.4}
      />

    </div>
  );
};

export default AttendanceStats;
