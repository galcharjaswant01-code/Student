import React from 'react';

import { TrendingUp, Target, Zap, Clock, Trophy } from 'lucide-react';
import { Doughnut } from 'react-chartjs-2';

const AiInsights = () => {
  const usageData = {
    labels: ['Chat', 'Coding', 'Resume', 'Summarizer'],
    datasets: [{
      data: [45, 25, 20, 10],
      backgroundColor: ['#3b82f6', '#10b981', '#f97316', '#a855f7'],
      borderWidth: 0,
    }]
  };

  const chartOptions = {
    cutout: '75%',
    plugins: { legend: { display: false } }
  };

  return (
    <div className="w-80 h-full bg-[#0F172A] border-l border-slate-800 p-6 overflow-y-auto hidden xl:block shrink-0">
      <div className="mb-8">
        <h3 className="text-lg font-bold text-white mb-2">Workspace Insights</h3>
        <p className="text-sm text-slate-400">Your AI productivity metrics</p>
      </div>

      {/* AI Usage Donut Chart */}
      <div className="bg-slate-800/50 rounded-sm p-6 mb-6 border border-slate-700/50 relative">
        <h4 className="text-sm font-semibold text-slate-300 mb-4">Tool Usage Distribution</h4>
        <div className="relative w-32 h-32 mx-auto">
          <Doughnut data={usageData} options={chartOptions} />
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="text-2xl font-bold text-white">85%</span>
          </div>
        </div>
        <div className="flex justify-center gap-4 mt-4 text-xs">
          <div className="flex items-center gap-1"><div className="w-2 h-2 rounded-full bg-blue-500"></div><span className="text-slate-400">Chat</span></div>
          <div className="flex items-center gap-1"><div className="w-2 h-2 rounded-full bg-emerald-500"></div><span className="text-slate-400">Code</span></div>
          <div className="flex items-center gap-1"><div className="w-2 h-2 rounded-full bg-orange-500"></div><span className="text-slate-400">Resume</span></div>
        </div>
      </div>

      {/* Productivity Score */}
      <div className="bg-gradient- bg-indigo-500/10 rounded-sm p-5 mb-6 border border-indigo-500/20">
        <div className="flex items-center gap-3 mb-2">
          <div className="p-2 rounded-sm bg-indigo-500/20 text-indigo-400">
            <TrendingUp className="w-5 h-5" />
          </div>
          <div>
            <h4 className="text-sm font-semibold text-white">Productivity Score</h4>
            <span className="text-xs text-indigo-300">+12% this week</span>
          </div>
        </div>
        <div className="w-full bg-slate-800 rounded-full h-2 mt-4">
          <div className="bg-gradient- bg-indigo-500 h-2 rounded-full" style={{ width: '78%' }}></div>
        </div>
      </div>

      {/* Smart Recommendations */}
      <div className="space-y-4">
        <h4 className="text-sm font-bold text-slate-300 uppercase tracking-wider">Smart Suggestions</h4>
        
        <button
          className="w-full text-left bg-slate-800/50 p-4 rounded-sm border border-slate-700/50 hover:bg-slate-800 group"
        >
          <div className="flex items-center gap-3 mb-1">
            <Zap className="w-4 h-4 text-yellow-500 group-hover:text-yellow-400" />
            <span className="text-sm font-medium text-slate-200">Refine Algorithms</span>
          </div>
          <p className="text-xs text-slate-400 pl-7">You've been asking about sorting algorithms. Try generating a quiz.</p>
        </button>

        <button
          className="w-full text-left bg-slate-800/50 p-4 rounded-sm border border-slate-700/50 hover:bg-slate-800 group"
        >
          <div className="flex items-center gap-3 mb-1">
            <Target className="w-4 h-4 text-emerald-500 group-hover:text-emerald-400" />
            <span className="text-sm font-medium text-slate-200">Optimize Resume</span>
          </div>
          <p className="text-xs text-slate-400 pl-7">Your resume lacks action verbs. Run the Resume Analyzer.</p>
        </button>
      </div>

    </div>
  );
};

export default AiInsights;
