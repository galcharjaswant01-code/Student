import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Sparkles, ArrowRight, Zap, Lightbulb } from 'lucide-react';


const AiAssistantWidget = () => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col h-full w-full relative z-10">
      <div className="flex justify-between items-center p-5 pb-2 shrink-0">
        <h3 className="text-xl font-bold text-slate-900 dark:text-white tracking-tight flex items-center gap-2">
          <Sparkles className="w-5 h-5 text-yellow-500" />
          AI Suggestions
        </h3>
        <button 
          onClick={() => navigate('/assistant')}
          className="text-sm text-primary hover:text-blue-700 font-medium flex items-center gap-1 group"
        >
          Open AI
          <ArrowRight className="w-3 h-3 group-" />
        </button>
      </div>
      
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        <div className="p-4 rounded-sm bg-gradient- bg-primary/10 border border-primary/20 hover:border-primary/40">
          <div className="flex items-start gap-3">
            <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center shrink-0 -primary/30">
              <Zap className="w-4 h-4 text-white" />
            </div>
            <div>
              <p className="text-sm font-semibold text-slate-900 dark:text-white">Optimize Study Schedule</p>
              <p className="text-xs text-slate-600 dark:text-slate-300 mt-1.5 leading-relaxed">
                You scored lower in Quantum Physics this week. We recommend scheduling a 1-hour review session before Thursday's lecture.
              </p>
              <button 
                onClick={() => navigate('/calendar')} 
                className="mt-3 px-4 py-1.5 bg-white dark:bg-slate-800 text-primary text-xs font-bold rounded-sm border border-slate-200 dark:border-slate-700"
              >
                Schedule Review
              </button>
            </div>
          </div>
        </div>

        <div className="p-4 rounded-sm bg-gradient- bg-yellow-500/10 border border-yellow-500/20 hover:border-yellow-500/40">
          <div className="flex items-start gap-3">
            <div className="w-8 h-8 rounded-full bg-yellow-500 flex items-center justify-center shrink-0 -yellow-500/30">
              <Lightbulb className="w-4 h-4 text-white" />
            </div>
            <div>
              <p className="text-sm font-semibold text-slate-900 dark:text-white">Generate Flashcards</p>
              <p className="text-xs text-slate-600 dark:text-slate-300 mt-1.5 leading-relaxed">
                I noticed you recently read the "Calculus Chapter 4 Notes". Would you like me to generate a quick practice quiz?
              </p>
              <button 
                onClick={() => navigate('/assistant')} 
                className="mt-3 px-4 py-1.5 bg-white dark:bg-slate-800 text-yellow-600 dark:text-yellow-500 text-xs font-bold rounded-sm border border-slate-200 dark:border-slate-700"
              >
                Generate Quiz
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AiAssistantWidget;
