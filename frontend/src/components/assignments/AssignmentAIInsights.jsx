import React from 'react';

import { Sparkles, BrainCircuit, CalendarClock, ArrowRight } from 'lucide-react';

const AssignmentAIInsights = () => {
  return (
    <div className="flex flex-col h-full bg-white/70 dark:bg-slate-800/70 rounded-sm border border-white/20 dark:border-white/10 -[0_8px_30px_rgb(0,0,0,0.04)] dark:-[0_8px_30px_rgb(0,0,0,0.1)] overflow-hidden relative">
      
      {/* Background decoration */}
      <div className="absolute top-0 right-0 w-48 h-48 bg-gradient- bg-indigo-500/10 rounded-full blur-3xl -mr-10 -mt-10 pointer-events-none" />

      <div className="p-6 border-b border-slate-100 dark:border-white/10 flex items-center justify-between relative z-10">
        <div className="flex items-center gap-2 text-indigo-600 dark:text-indigo-400">
          <Sparkles className="w-5 h-5" />
          <h3 className="font-bold">AI Insights</h3>
        </div>
        <span className="text-[10px] font-bold px-2 py-1 bg-indigo-100 dark:bg-indigo-500/20 text-indigo-600 dark:text-indigo-400 rounded-md uppercase tracking-wider">
          Beta
        </span>
      </div>

      <div className="p-6 space-y-6 flex-1 overflow-y-auto custom-scrollbar relative z-10">
        
        {/* Insight 1: Productivity */}
        <div
          className="p-4 bg-white/60 dark:bg-slate-900/40 rounded-sm border border-white/50 dark:border-white/5 hover:border-indigo-200 dark:hover:border-indigo-500/30 group"
        >
          <div className="flex items-start gap-3">
            <div className="p-2 bg-emerald-100 dark:bg-emerald-500/20 text-emerald-600 dark:text-emerald-400 rounded-sm mt-0.5">
              <BrainCircuit className="w-4 h-4" />
            </div>
            <div>
              <h4 className="text-sm font-bold text-slate-900 dark:text-white mb-1 group-hover:text-indigo-500">Study Pattern Identified</h4>
              <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                You tend to complete Mathematics assignments 2 days before the deadline, but Physics assignments are often submitted on the due date. 
              </p>
              <button className="mt-2 text-xs font-bold text-indigo-600 dark:text-indigo-400 flex items-center gap-1 hover:gap-2">
                View Productivity Analysis <ArrowRight className="w-3 h-3" />
              </button>
            </div>
          </div>
        </div>

        {/* Insight 2: Deadline Alert */}
        <div
          className="p-4 bg-white/60 dark:bg-slate-900/40 rounded-sm border border-white/50 dark:border-white/5 hover:border-amber-200 dark:hover:border-amber-500/30 group"
        >
          <div className="flex items-start gap-3">
            <div className="p-2 bg-amber-100 dark:bg-amber-500/20 text-amber-600 dark:text-amber-400 rounded-sm mt-0.5">
              <CalendarClock className="w-4 h-4" />
            </div>
            <div>
              <h4 className="text-sm font-bold text-slate-900 dark:text-white mb-1 group-hover:text-amber-500">Schedule Clash Warning</h4>
              <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                You have two high-priority assignments due in the last week of May. I recommend starting the <strong>Data Structures</strong> assignment by this Friday to balance your workload.
              </p>
              <button className="mt-2 text-xs font-bold text-amber-600 dark:text-amber-400 flex items-center gap-1 hover:gap-2">
                Add to Calendar <ArrowRight className="w-3 h-3" />
              </button>
            </div>
          </div>
        </div>
        
        {/* Insight 3: Resource Suggestion */}
        <div
          className="p-4 bg-white/60 dark:bg-slate-900/40 rounded-sm border border-white/50 dark:border-white/5 hover:border-blue-200 dark:hover:border-blue-500/30 group"
        >
          <div className="flex items-start gap-3">
            <div className="p-2 bg-blue-100 dark:bg-blue-500/20 text-blue-600 dark:text-blue-400 rounded-sm mt-0.5">
              <Sparkles className="w-4 h-4" />
            </div>
            <div>
              <h4 className="text-sm font-bold text-slate-900 dark:text-white mb-1 group-hover:text-blue-500">Research Recommendations</h4>
              <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                For your upcoming essay on <em>The Great Gatsby</em>, I found 3 highly-cited papers analyzing the American Dream. Would you like me to generate a summary?
              </p>
              <button className="mt-2 text-xs font-bold text-blue-600 dark:text-blue-400 flex items-center gap-1 hover:gap-2">
                Generate Summary <ArrowRight className="w-3 h-3" />
              </button>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default AssignmentAIInsights;
