import React, { useState } from 'react';

import { Calendar as CalendarIcon, Target, CheckCircle2, Circle, ArrowRight } from 'lucide-react';
import { aiApi } from '../../../services/aiApi';

const StudyPlannerWorkspace = ({ isMobileView, onBack, onToggleInsights }) => {
  const [subject, setSubject] = useState('');
  const [days, setDays] = useState(7);
  const [isGenerating, setIsGenerating] = useState(false);
  const [result, setResult] = useState(null);

  const [completedTasks, setCompletedTasks] = useState({});

  const handleGenerate = async () => {
    if (!subject.trim()) return;
    setIsGenerating(true);
    const data = await aiApi.generateStudyPlan(subject, days);
    setResult(data);
    setCompletedTasks({});
    setIsGenerating(false);
  };

  const toggleTask = (dayIdx, taskIdx) => {
    const key = `${dayIdx}-${taskIdx}`;
    setCompletedTasks(prev => ({
      ...prev,
      [key]: !prev[key]
    }));
  };

  const getProgress = () => {
    if (!result) return 0;
    const totalTasks = result.plan.reduce((acc, day) => acc + day.tasks.length, 0);
    const completed = Object.values(completedTasks).filter(Boolean).length;
    return Math.round((completed / totalTasks) * 100);
  };

  return (
    <div className="flex flex-col h-full bg-slate-50 dark:bg-[#0B0F19] relative">
      
      {/* Header */}
      <div className="h-[72px] px-6 border-b border-slate-200 dark:border-slate-800 bg-white/70 dark:bg-slate-900/70 flex items-center justify-between shrink-0">
        <div className="flex items-center gap-3">
          {isMobileView && (
            <button onClick={onBack} className="p-2 -ml-2 text-slate-500 rounded-sm hover:bg-slate-100 dark:hover:bg-slate-800">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>
          )}
          <div className="w-10 h-10 rounded-sm bg-emerald-500/10 text-emerald-500 flex items-center justify-center">
            <CalendarIcon className="w-5 h-5" />
          </div>
          <div>
            <h2 className="font-bold text-lg text-slate-900 dark:text-white leading-tight">Study Planner</h2>
            <p className="text-xs text-slate-500">AI-generated schedules and roadmaps</p>
          </div>
        </div>
        <button onClick={onToggleInsights} className="p-2 text-slate-400 hover:text-indigo-500 hover:bg-indigo-50 dark:hover:bg-indigo-500/10 rounded-sm">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        </button>
      </div>

      <div className="flex-1 overflow-y-auto custom-scrollbar p-4 sm:p-8 flex flex-col items-center">
        
        {!result && (
          <div className="w-full max-w-xl bg-white dark:bg-slate-900 rounded-sm border border-slate-200 dark:border-slate-800 p-8">
            <div className="w-16 h-16 bg-emerald-100 dark:bg-emerald-500/20 text-emerald-500 rounded-sm flex items-center justify-center mb-6 -emerald-500/20">
              <Target className="w-8 h-8" />
            </div>
            <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-2">Plan Your Success</h3>
            <p className="text-slate-500 mb-8">Tell AI what you need to study and when your exam is. We'll generate a day-by-day roadmap optimized for retention.</p>
            
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-2">Subject / Exam Topic</label>
                <input 
                  type="text" 
                  value={subject}
                  onChange={e => setSubject(e.target.value)}
                  placeholder="e.g. Data Structures, React Certification..."
                  className="w-full bg-slate-50 dark:bg-[#0B0F19] border border-slate-200 dark:border-slate-800 rounded-sm px-4 py-3 text-sm focus:ring-2 focus:ring-emerald-500/50 outline-none"
                />
              </div>
              
              <div>
                <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-2">Days to Prepare</label>
                <div className="flex items-center gap-4">
                  <input 
                    type="range" 
                    min="1" max="14" 
                    value={days} 
                    onChange={e => setDays(parseInt(e.target.value))}
                    className="flex-1 accent-emerald-500"
                  />
                  <span className="w-12 text-center font-bold text-emerald-500">{days} {days === 1 ? 'day' : 'days'}</span>
                </div>
              </div>

              <button 
                onClick={handleGenerate}
                disabled={isGenerating || !subject.trim()}
                className="w-full py-4 rounded-sm font-bold text-white bg-emerald-500 hover:bg-emerald-600 -emerald-500/30 flex items-center justify-center gap-2 disabled:opacity-70"
              >
                {isGenerating ? (
                  <><span className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" /> Crafting Plan...</>
                ) : (
                  <>Generate Schedule <ArrowRight className="w-5 h-5" /></>
                )}
              </button>
            </div>
          </div>
        )}

        {result && (
          <div className="w-full max-w-3xl">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-8 gap-4">
              <div>
                <h3 className="text-2xl font-bold text-slate-900 dark:text-white leading-tight">Your {days}-Day Study Plan</h3>
                <p className="text-sm text-slate-500 capitalize">{subject}</p>
              </div>
              
              <div className="flex items-center gap-4 bg-white dark:bg-slate-900 p-3 rounded-sm border border-slate-200 dark:border-slate-800">
                <div className="flex flex-col">
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Overall Progress</span>
                  <span className="text-xl font-black text-emerald-500 leading-none mt-1">{getProgress()}%</span>
                </div>
                <div className="w-24 h-2 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
                  <div className="h-full bg-emerald-500" style={{ width: `${getProgress()}%` }}></div>
                </div>
              </div>
            </div>

            <div className="bg-emerald-50 dark:bg-emerald-500/10 border border-emerald-200 dark:border-emerald-500/20 rounded-sm p-5 mb-8">
              <p className="text-sm font-medium text-emerald-800 dark:text-emerald-300">💡 {result.advice}</p>
            </div>

            <div className="space-y-6 relative before:absolute before:inset-0 before:ml-6 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient- before:bg-emerald-500 before: before:">
              {result.plan.map((day, dayIdx) => (
                <div 
                  key={dayIdx}
                  className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active"
                >
                  <div className="flex items-center justify-center w-12 h-12 rounded-full border-4 border-slate-50 dark:border-[#0B0F19] bg-emerald-500 text-white font-bold shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 z-10">
                    D{day.day}
                  </div>
                  <div className="w-[calc(100%-4rem)] md:w-[calc(50%-3rem)] bg-white dark:bg-slate-900 p-6 rounded-sm border border-slate-200 dark:border-slate-800 hover: -">
                    <h4 className="font-bold text-slate-900 dark:text-white mb-4">{day.title}</h4>
                    <div className="space-y-3">
                      {day.tasks.map((task, taskIdx) => {
                        const isDone = completedTasks[`${dayIdx}-${taskIdx}`];
                        return (
                          <button 
                            key={taskIdx}
                            onClick={() => toggleTask(dayIdx, taskIdx)}
                            className="w-full flex items-start gap-3 text-left group/task"
                          >
                            {isDone ? (
                              <CheckCircle2 className="w-5 h-5 text-emerald-500 shrink-0 mt-0.5" />
                            ) : (
                              <Circle className="w-5 h-5 text-slate-300 dark:text-slate-600 group-hover/task:text-emerald-400 shrink-0 mt-0.5" />
                            )}
                            <span className={`text-sm  ${isDone ? 'text-slate-400 line-through' : 'text-slate-700 dark:text-slate-300'}`}>
                              {task}
                            </span>
                          </button>
                        );
                      })}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-12 flex justify-center pb-8">
              <button onClick={() => setResult(null)} className="px-6 py-2.5 rounded-sm font-bold text-slate-600 dark:text-slate-300 bg-slate-200 dark:bg-slate-800 hover:bg-slate-300 dark:hover:bg-slate-700">
                Create New Plan
              </button>
            </div>
          </div>
        )}

      </div>
    </div>
  );
};

export default StudyPlannerWorkspace;
