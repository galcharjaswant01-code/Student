import React from 'react';

import { ArrowUp, CalendarDays, Clock, CalendarX, Flame, TrendingUp } from 'lucide-react';
import { Doughnut } from 'react-chartjs-2';

const StatCard = ({ title, value, subValue, icon: Icon, colorClass, gradientClass, delay, children }) => {
  const bgColor = colorClass.split(' ').find(c => c.startsWith('bg-')) || 'bg-slate-500';
  return (
  <div
    className={`relative overflow-hidden bg-[#1B2430] border border-slate-800 p-6 rounded-sm cursor-pointer`}
  >
    <div className={`absolute -right-12 top-1/2 -translate-y-1/2 w-40 h-40 rounded-full ${bgColor} opacity-20 pointer-events-none`}></div>
    
    <div className="flex justify-between items-center relative z-10">
      <div>
        <h3 className="text-sm font-semibold text-slate-400 mb-1">{title}</h3>
        <div className="flex items-baseline gap-2">
          <span className="text-4xl font-bold text-white tracking-tight">{value}</span>
          {subValue && <span className="text-sm font-medium text-slate-500">{subValue}</span>}
        </div>
      </div>
      <div className={`w-12 h-12 rounded-md flex items-center justify-center ${bgColor}`}>
        <Icon className={`w-6 h-6 text-white`} />
      </div>
    </div>
    {children && (
      <div className="relative z-10 mt-4">
        {children}
      </div>
    )}
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
      >
        <div className="flex items-center justify-between mt-2">
          <span className="flex items-center text-xs font-semibold text-emerald-500 bg-emerald-50 dark:bg-emerald-500/10 px-2 py-1 rounded-md">
            <ArrowUp className="w-3 h-3 mr-1" /> 5.2% vs last month
          </span>
        </div>
      </StatCard>

      {/* Current Streak */}
      <StatCard 
        title="Current Streak" 
        value="12" 
        subValue="Days"
        icon={Flame}
        colorClass="bg-orange-500 text-orange-600 dark:text-orange-400"
        gradientClass="bg-orange-500"
        delay={0.2}
      >
        <div className="mt-3 w-full bg-slate-100 dark:bg-slate-700 rounded-full h-1.5 overflow-hidden">
          <div
            className="bg-gradient- bg-orange-400 h-full rounded-full"
          />
        </div>
        <p className="text-xs text-slate-500 mt-2 font-medium">3 days away from personal best!</p>
      </StatCard>

      {/* Present / Total Days */}
      <StatCard 
        title="Classes Attended" 
        value="43" 
        subValue="/ 48"
        icon={CalendarDays}
        colorClass="bg-emerald-500 text-emerald-600 dark:text-emerald-400"
        gradientClass="bg-emerald-500"
        delay={0.3}
      >
        <div className="flex items-center gap-2 mt-2">
           <div className="w-8 h-8 shrink-0">
             <Doughnut data={doughnutData} options={doughnutOptions} />
           </div>
           <p className="text-xs text-slate-500 font-medium">Breakdown available in analytics</p>
        </div>
      </StatCard>

      {/* Exceptions (Late/Absent) */}
      <StatCard 
        title="Exceptions" 
        value="8" 
        subValue="This Month"
        icon={Clock}
        colorClass="bg-purple-500 text-purple-600 dark:text-purple-400"
        gradientClass="bg-purple-500"
        delay={0.4}
      >
        <div className="flex gap-2 mt-2">
          <span className="text-xs font-semibold text-red-500 bg-red-50 dark:bg-red-500/10 px-2 py-1 rounded-md border border-red-100 dark:border-red-500/20">
            5 Absent
          </span>
          <span className="text-xs font-semibold text-amber-500 bg-amber-50 dark:bg-amber-500/10 px-2 py-1 rounded-md border border-amber-100 dark:border-amber-500/20">
            3 Late
          </span>
        </div>
      </StatCard>

    </div>
  );
};

export default AttendanceStats;
