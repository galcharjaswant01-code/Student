import React, { useEffect, useState } from 'react';

import { FileText, CheckCircle, Clock, AlertCircle, TrendingUp } from 'lucide-react';
import { assignmentAPI } from '../../services/mockDjangoApi';

const AssignmentStats = () => {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const data = await assignmentAPI.getAssignmentStats();
        setStats(data);
      } catch (error) {
        console.error('Error fetching assignment stats:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchStats();
  }, []);

  if (loading || !stats) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 animate-pulse">
        {[1, 2, 3, 4].map(i => (
          <div key={i} className="h-32 bg-slate-200 dark:bg-slate-800 rounded-sm" />
        ))}
      </div>
    );
  }

  const statCards = [
    {
      title: 'Total Assignments',
      value: stats.total,
      icon: FileText,
      color: 'bg-indigo-500',
      gradient: 'bg-indigo-500/20 ',
      textColor: 'text-indigo-600 dark:text-indigo-400',
      borderColor: 'border-indigo-200 dark:border-indigo-500/20',
      description: 'All-time assignments'
    },
    {
      title: 'Submitted',
      value: stats.submitted,
      icon: CheckCircle,
      color: 'bg-emerald-500',
      gradient: 'bg-emerald-500/20 ',
      textColor: 'text-emerald-600 dark:text-emerald-400',
      borderColor: 'border-emerald-200 dark:border-emerald-500/20',
      description: 'Waiting for grades'
    },
    {
      title: 'Pending',
      value: stats.pending,
      icon: Clock,
      color: 'bg-amber-500',
      gradient: 'bg-amber-500/20 ',
      textColor: 'text-amber-600 dark:text-amber-400',
      borderColor: 'border-amber-200 dark:border-amber-500/20',
      description: 'To do list'
    },
    {
      title: 'Overdue',
      value: stats.overdue,
      icon: AlertCircle,
      color: 'bg-red-500',
      gradient: 'bg-red-500/20 ',
      textColor: 'text-red-600 dark:text-red-400',
      borderColor: 'border-red-200 dark:border-red-500/20',
      description: 'Requires attention!'
    }
  ];

  return (
    <div className="w-full space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {statCards.map((stat, i) => (
          <div
            key={i}
            className={`relative overflow-hidden bg-[#1B2430] border border-slate-800 p-6 rounded-sm cursor-pointer`}
          >
            {/* Background Circle */}
            <div className={`absolute -right-12 top-1/2 -translate-y-1/2 w-40 h-40 rounded-full ${stat.color} opacity-20 pointer-events-none`} />
            
            <div className="flex justify-between items-center relative z-10">
              <div>
                <h3 className="text-sm font-semibold text-slate-400 mb-1">{stat.title}</h3>
                <div className="flex items-baseline gap-2">
                  <span className="text-4xl font-bold text-white tracking-tight">{stat.value}</span>
                </div>
              </div>
              <div className={`w-12 h-12 rounded-md flex items-center justify-center ${stat.color}`}>
                <stat.icon className="w-6 h-6 text-white" />
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Completion Progress Bar */}
      <div
        className="w-full bg-gradient- bg-indigo-500 rounded-sm p-[1px] -purple-500/20"
      >
        <div className="bg-white dark:bg-slate-900 rounded-[23px] p-6 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-purple-100 dark:bg-purple-500/20 rounded-sm">
              <TrendingUp className="w-6 h-6 text-purple-600 dark:text-purple-400" />
            </div>
            <div>
              <h4 className="font-bold text-slate-900 dark:text-white text-lg">Overall Completion</h4>
              <p className="text-sm text-slate-500 dark:text-slate-400">Keep up the great work! You're almost there.</p>
            </div>
          </div>
          
          <div className="flex-1 w-full md:max-w-md">
            <div className="flex justify-between items-end mb-2">
              <span className="text-3xl font-extrabold text-transparent bg-clip-text bg-gradient- bg-indigo-500">
                {stats.completionRate}%
              </span>
              <span className="text-sm font-semibold text-slate-500 mb-1">Target: 100%</span>
            </div>
            <div className="w-full h-3 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient- bg-indigo-500 rounded-full"
              />
            </div>
          </div>
        </div>
      </div>

    </div>
  );
};

export default AssignmentStats;
