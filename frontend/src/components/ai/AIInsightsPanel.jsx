import React, { useState, useEffect } from 'react';

import { 
  X, 
  Activity, 
  Zap,
  TrendingUp,
  Download,
  Share2,
  Clock,
  Sparkles,
  BookOpen
} from 'lucide-react';
import { aiApi } from '../../services/aiApi';

const AIInsightsPanel = ({ activeToolId, onClose }) => {
  const [stats, setStats] = useState(null);

  useEffect(() => {
    aiApi.getUsageStats().then(setStats);
  }, []);

  if (!stats) return <div className="p-6 text-slate-500">Loading insights...</div>;

  return (
    <div
      className="w-full sm:w-80 h-full border-l border-slate-200 dark:border-slate-800 bg-white dark:bg-[#0B0F19] flex flex-col sm:-none"
    >
      {/* Header */}
      <div className="h-[72px] px-6 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between shrink-0 bg-slate-50/50 dark:bg-slate-900/50">
        <h2 className="font-bold text-lg text-slate-900 dark:text-white flex items-center gap-2">
          <Activity className="w-5 h-5 text-indigo-500" />
          Insights
        </h2>
        <button 
          onClick={onClose}
          className="p-2 -mr-2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-sm sm:hidden"
        >
          <X className="w-5 h-5" />
        </button>
      </div>

      <div className="flex-1 overflow-y-auto custom-scrollbar p-6 space-y-6">
        
        {/* Usage Stats Card */}
        <div className="bg-gradient- bg-indigo-500 rounded-sm p-5 text-white -indigo-500/20 relative overflow-hidden group">
          <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20">
            <Zap className="w-24 h-24" />
          </div>
          <div className="relative z-10">
            <h3 className="text-indigo-100 font-medium text-sm mb-1">AI Tokens Used</h3>
            <div className="text-3xl font-black mb-4">{stats.totalTokens.toLocaleString()}</div>
            
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-indigo-200 text-xs">Quizzes</p>
                <p className="font-bold text-lg">{stats.quizzesTaken}</p>
              </div>
              <div>
                <p className="text-indigo-200 text-xs">Resumes</p>
                <p className="font-bold text-lg">{stats.resumesAnalyzed}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Quick Actions for Active Tool */}
        <div>
          <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-3">Quick Actions</h3>
          <div className="grid grid-cols-2 gap-2">
            <button className="flex flex-col items-center justify-center p-3 rounded-sm bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 border border-transparent hover:border-slate-300 dark:hover:border-slate-600 group">
              <Download className="w-5 h-5 text-slate-400 group-hover:text-indigo-500 mb-1" />
              <span className="text-[10px] font-medium text-slate-600 dark:text-slate-300">Export</span>
            </button>
            <button className="flex flex-col items-center justify-center p-3 rounded-sm bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 border border-transparent hover:border-slate-300 dark:hover:border-slate-600 group">
              <Share2 className="w-5 h-5 text-slate-400 group-hover:text-emerald-500 mb-1" />
              <span className="text-[10px] font-medium text-slate-600 dark:text-slate-300">Share</span>
            </button>
          </div>
        </div>

        {/* Recent Outputs */}
        <div>
          <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-3">Recent Outputs</h3>
          <div className="space-y-3">
            {stats.recentOutputs.map((output, idx) => (
              <div key={idx} className="flex gap-3 items-start p-3 rounded-sm hover:bg-slate-50 dark:hover:bg-slate-800/50 border border-slate-100 dark:border-slate-800">
                <div className="w-8 h-8 rounded-sm bg-slate-100 dark:bg-slate-800 flex items-center justify-center shrink-0">
                  {output.type === 'code' ? <Sparkles className="w-4 h-4 text-amber-500" /> : 
                   output.type === 'resume' ? <TrendingUp className="w-4 h-4 text-rose-500" /> : 
                   <BookOpen className="w-4 h-4 text-cyan-500" />}
                </div>
                <div>
                  <p className="text-sm font-bold text-slate-700 dark:text-slate-200 leading-tight mb-1">{output.title}</p>
                  <p className="text-[10px] text-slate-400 flex items-center gap-1">
                    <Clock className="w-3 h-3" /> {output.date}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
};

export default AIInsightsPanel;
