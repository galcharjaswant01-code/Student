import React, { useState } from 'react';
import { Calendar, CheckSquare, Square, Sparkles, CheckCircle2 } from 'lucide-react';

const InteractiveStudyPlan = ({ data }) => {
  const planDays = data?.plan || [];
  const advice = data?.advice || '';
  const [activeDay, setActiveDay] = useState(0);
  const [completedTasks, setCompletedTasks] = useState({});

  if (!planDays.length) return null;

  const currentDayData = planDays[activeDay] || planDays[0];

  const toggleTask = (dayIdx, taskIdx) => {
    const key = `${dayIdx}-${taskIdx}`;
    setCompletedTasks(prev => ({ ...prev, [key]: !prev[key] }));
  };

  // Calculate total progress
  let totalTasksCount = 0;
  let doneTasksCount = 0;
  planDays.forEach((day, dIdx) => {
    day.tasks?.forEach((_, tIdx) => {
      totalTasksCount++;
      if (completedTasks[`${dIdx}-${tIdx}`]) doneTasksCount++;
    });
  });

  const progressPct = totalTasksCount > 0 ? Math.round((doneTasksCount / totalTasksCount) * 100) : 0;

  return (
    <div className="my-3 p-4 sm:p-5 rounded-2xl border border-slate-200 dark:border-slate-800 bg-gradient-to-b from-slate-50 to-white dark:from-slate-900 dark:to-slate-950 shadow-sm space-y-4 max-w-xl">
      {/* Header & Progress */}
      <div className="flex items-center justify-between pb-3 border-b border-slate-200 dark:border-slate-800">
        <div className="flex items-center gap-2 text-blue-600 dark:text-blue-400 font-bold text-xs sm:text-sm">
          <Calendar className="w-4 h-4" />
          <span>{planDays.length}-Day AI Study Plan</span>
        </div>
        <div className="flex items-center gap-2 text-xs font-semibold text-slate-700 dark:text-slate-300">
          <span>{progressPct}% Completed</span>
          <div className="w-16 h-2 bg-slate-200 dark:bg-slate-800 rounded-full overflow-hidden">
            <div
              className="h-full bg-blue-600 dark:bg-blue-500 transition-all duration-300"
              style={{ width: `${progressPct}%` }}
            />
          </div>
        </div>
      </div>

      {/* Day Selector Tabs */}
      <div className="flex items-center gap-1.5 overflow-x-auto pb-1 custom-scrollbar">
        {planDays.map((day, idx) => (
          <button
            key={idx}
            onClick={() => setActiveDay(idx)}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-all ${
              activeDay === idx
                ? 'bg-blue-600 text-white shadow-sm'
                : 'bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            Day {day.day || idx + 1}
          </button>
        ))}
      </div>

      {/* Selected Day Content */}
      <div className="space-y-3 p-3.5 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
        <h4 className="font-bold text-xs sm:text-sm text-slate-900 dark:text-white">
          {currentDayData.title}
        </h4>

        <div className="space-y-2">
          {currentDayData.tasks?.map((task, tIdx) => {
            const isDone = !!completedTasks[`${activeDay}-${tIdx}`];
            return (
              <button
                key={tIdx}
                onClick={() => toggleTask(activeDay, tIdx)}
                className={`w-full text-left p-2.5 rounded-lg border text-xs flex items-center gap-2.5 transition-all ${
                  isDone
                    ? 'bg-emerald-50/60 dark:bg-emerald-950/30 border-emerald-300 dark:border-emerald-800 text-emerald-900 dark:text-emerald-300 line-through'
                    : 'bg-slate-50 dark:bg-slate-950 border-slate-200 dark:border-slate-800 text-slate-800 dark:text-slate-200 hover:border-blue-400'
                }`}
              >
                {isDone ? (
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                ) : (
                  <Square className="w-4 h-4 text-slate-400 shrink-0" />
                )}
                <span>{task}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Pro Advice Box */}
      {advice && (
        <div className="p-3 rounded-xl bg-blue-50/80 dark:bg-blue-950/40 border border-blue-200 dark:border-blue-800 text-xs text-blue-900 dark:text-blue-200 flex items-start gap-2">
          <Sparkles className="w-4 h-4 text-blue-600 dark:text-blue-400 shrink-0 mt-0.5" />
          <div>
            <p className="font-semibold text-blue-700 dark:text-blue-400">Study Strategy Tip:</p>
            <p className="mt-0.5">{advice}</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default InteractiveStudyPlan;
