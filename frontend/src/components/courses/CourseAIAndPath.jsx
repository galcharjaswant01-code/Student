import React from 'react';

import { Sparkles, ArrowRight, Route, Lock, CheckCircle, PlayCircle } from 'lucide-react';

const CourseAIAndPath = ({ paths, loading }) => {

  if (loading) {
    return (
      <div className="flex flex-col xl:flex-row gap-6">
        <div className="flex-1 h-64 bg-slate-200/50 dark:bg-slate-800/50 animate-pulse rounded-sm" />
        <div className="w-full xl:w-96 h-64 bg-slate-200/50 dark:bg-slate-800/50 animate-pulse rounded-sm" />
      </div>
    );
  }

  const activePath = paths?.[0]; // Show the first path for demo

  return (
    <div className="flex flex-col xl:flex-row gap-6">
      
      {/* Learning Path Roadmap */}
      <div className="flex-1 bg-white/70 dark:bg-slate-800/70 border border-slate-200/50 dark:border-white/5 rounded-sm -[0_8px_30px_rgb(0,0,0,0.04)] dark:-[0_8px_30px_rgb(0,0,0,0.1)] p-6 md:p-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <Route className="w-5 h-5 text-indigo-500" />
              <h2 className="text-lg font-bold text-slate-900 dark:text-white">Active Learning Path</h2>
            </div>
            <p className="text-sm font-medium text-slate-500 dark:text-slate-400">
              {activePath?.title || 'Software Engineering'}
            </p>
          </div>
          <div className="flex items-center gap-3">
            <span className="text-xs font-bold text-slate-700 dark:text-slate-300">{activePath?.progress || 0}%</span>
            <div className="w-32 h-2 bg-slate-100 dark:bg-slate-700 rounded-full overflow-hidden">
              <div 
                className="h-full bg-gradient- bg-indigo-500 rounded-full"
                style={{ width: `${activePath?.progress || 0}%` }}
              />
            </div>
          </div>
        </div>

        <div className="relative">
          {/* Connecting Line */}
          <div className="absolute top-8 left-6 bottom-8 w-0.5 bg-slate-100 dark:bg-slate-700/50 z-0" />
          
          <div className="space-y-6 relative z-10">
            {activePath?.milestones?.map((milestone, i) => (
              <div key={milestone.id} className="flex gap-4">
                <div className="shrink-0 mt-1">
                  {milestone.status === 'completed' ? (
                    <div className="w-12 h-12 rounded-sm bg-emerald-500 text-white flex items-center justify-center -emerald-500/20">
                      <CheckCircle className="w-6 h-6" />
                    </div>
                  ) : milestone.status === 'in-progress' ? (
                    <div className="w-12 h-12 rounded-sm bg-indigo-500 text-white flex items-center justify-center -indigo-500/30 ring-4 ring-indigo-500/20">
                      <PlayCircle className="w-6 h-6" />
                    </div>
                  ) : (
                    <div className="w-12 h-12 rounded-sm bg-slate-100 dark:bg-slate-800 text-slate-400 border border-slate-200 dark:border-slate-700 flex items-center justify-center">
                      <Lock className="w-5 h-5" />
                    </div>
                  )}
                </div>
                
                <div className={`flex-1 p-4 rounded-sm border  ${
                  milestone.status === 'in-progress' 
                  ? 'bg-indigo-50/50 dark:bg-indigo-500/5 border-indigo-200 dark:border-indigo-500/20' 
                  : 'bg-white dark:bg-slate-800/30 border-slate-100 dark:border-white/5'
                }`}>
                  <h4 className={`text-sm font-bold ${
                    milestone.status === 'locked' ? 'text-slate-500' : 'text-slate-900 dark:text-white'
                  }`}>
                    Step {i + 1}: {milestone.title}
                  </h4>
                  {milestone.currentCourse && (
                    <p className="text-xs font-medium text-indigo-600 dark:text-indigo-400 mt-1 flex items-center gap-1">
                      Current: {milestone.currentCourse} <ArrowRight className="w-3 h-3" />
                    </p>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* AI Study Recommendations */}
      <div className="w-full xl:w-96 flex flex-col gap-6">
        <div className="flex-1 bg-gradient- bg-indigo-900 p-6 md:p-8 rounded-sm -[0_8px_30px_rgb(0,0,0,0.12)] text-white relative overflow-hidden group">
          
          <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl -mr-20 -mt-20 pointer-events-none group-hover:bg-white/20" />
          
          <div className="flex items-center gap-2 mb-6 relative z-10">
            <div className="p-2 bg-white/10 rounded-sm">
              <Sparkles className="w-5 h-5 text-yellow-400" />
            </div>
            <h2 className="text-lg font-bold">AI Study Guide</h2>
          </div>

          <div className="relative z-10 space-y-4">
            <p className="text-indigo-100/80 text-sm leading-relaxed mb-6 font-medium">
              Based on your progress in <strong>Advanced Data Structures</strong>, here is your personalized recommendation for today:
            </p>

            <div className="bg-white/10 border border-white/20 p-4 rounded-sm">
              <h4 className="font-bold text-white mb-1">Review Dynamic Programming</h4>
              <p className="text-xs text-indigo-200 mb-3">You spent 2 hours on graph theory yesterday. It's time to switch to DP to maintain retention.</p>
              <button className="w-full py-2 bg-white text-indigo-900 font-bold text-sm rounded-sm hover:bg-indigo-50">
                Start Quick Review
              </button>
            </div>
            
            <div className="bg-white/5 border border-white/10 p-4 rounded-sm cursor-pointer hover:bg-white/10">
              <h4 className="font-bold text-white text-sm">Suggested Practice: LeetCode #72</h4>
              <p className="text-xs text-indigo-200 mt-1">Edit Distance (Hard)</p>
            </div>
          </div>
        </div>
      </div>

    </div>
  );
};

export default CourseAIAndPath;
