import React from 'react';

import { Sparkles, AlertTriangle, CheckCircle2, ChevronRight, Zap } from 'lucide-react';

const AttendanceInsights = () => {
  return (
    <div className="flex flex-col h-full w-full">
      <div className="flex justify-between items-center mb-6">
        <h3 className="font-bold text-lg text-slate-900 dark:text-white tracking-tight flex items-center gap-2">
          AI Insights <Sparkles className="w-5 h-5 text-accent" />
        </h3>
        <span className="px-3 py-1 bg-primary/10 text-primary text-xs font-semibold rounded-full border border-primary/20">Updated Just Now</span>
      </div>

      <div className="flex flex-col gap-4 flex-1 overflow-y-auto custom-scrollbar pr-2 min-h-0">
        
        {/* Positive Insight */}
        <div
          className="bg-gradient- bg-indigo-50/80 dark:bg-indigo-900/30 dark: border border-indigo-100 dark:border-indigo-800/50 rounded-sm p-5 flex items-start gap-4 cursor-pointer"
        >
          <div className="p-2 bg-indigo-500 text-white rounded-sm -indigo-500/20 mt-1">
            <CheckCircle2 className="w-5 h-5" />
          </div>
          <div className="flex-1">
            <h4 className="font-bold text-indigo-900 dark:text-indigo-200 text-sm mb-1 flex items-center justify-between">
              Excellent Progress
              <span className="text-xs font-black bg-indigo-100 dark:bg-indigo-900/50 text-indigo-600 dark:text-indigo-400 px-2 py-0.5 rounded-sm border border-indigo-200 dark:border-indigo-700/50">+5.2%</span>
            </h4>
            <p className="text-xs text-indigo-700/80 dark:text-indigo-300/80 leading-relaxed">
              You've attended 12 consecutive days. If you keep this up, you'll reach 95% overall attendance by mid-June.
            </p>
          </div>
        </div>

        {/* Warning Insight */}
        <div
          className="bg-gradient- bg-orange-50/80 dark:bg-orange-900/30 dark: border border-orange-100 dark:border-orange-800/50 rounded-sm p-5 flex items-start gap-4 cursor-pointer mt-2"
        >
          <div className="p-2 bg-orange-500 text-white rounded-sm -orange-500/20 mt-1">
            <AlertTriangle className="w-5 h-5" />
          </div>
          <div className="flex-1">
            <h4 className="font-bold text-orange-900 dark:text-orange-200 text-sm mb-1">
              Action Required: Chemistry
            </h4>
            <p className="text-xs text-orange-700/80 dark:text-orange-300/80 leading-relaxed mb-3">
              Your attendance in Chemistry dropped to 75%. You need to attend the next 3 classes to avoid an academic warning.
            </p>
            <button className="flex items-center gap-1 px-4 py-1.5 rounded-sm bg-orange-500 hover:bg-orange-600 text-white text-xs font-bold w-max -orange-500/20">
              Schedule Make-up Class <ChevronRight className="w-3 h-3" />
            </button>
          </div>
        </div>

        {/* Predictive Insight */}
        <div
          className="bg-slate-50/80 dark:bg-slate-800/50 border border-slate-200 dark:border-white/10 rounded-sm p-5 flex items-start gap-4 cursor-pointer mt-2"
        >
          <div className="p-2 bg-slate-200 dark:bg-slate-700 text-slate-700 dark:text-slate-300 rounded-sm mt-1">
            <Zap className="w-5 h-5" />
          </div>
          <div className="flex-1">
            <h4 className="font-bold text-slate-900 dark:text-white text-sm mb-1">
              Weather Prediction Alert
            </h4>
            <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
              Heavy rain expected on Thursday. Consider adjusting your commute time to ensure you arrive by 9:00 AM for Physics.
            </p>
          </div>
        </div>

      </div>
    </div>
  );
};

export default AttendanceInsights;
