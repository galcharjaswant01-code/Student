import React from 'react';

import { 
  Bot, 
  Code2, 
  FileText, 
  HelpCircle, 
  Library, 
  Calendar, 
  Sparkles,
  Search,
  Star
} from 'lucide-react';

const AI_TOOLS = [
  { id: 'chat', label: 'AI Chat', icon: Bot, color: 'text-indigo-500', bg: 'bg-indigo-500/10' },
  { id: 'code', label: 'Code Assistant', icon: Code2, color: 'text-amber-500', bg: 'bg-amber-500/10' },
  { id: 'resume', label: 'Resume Analyzer', icon: FileText, color: 'text-rose-500', bg: 'bg-rose-500/10' },
  { id: 'quiz', label: 'Quiz Generator', icon: HelpCircle, color: 'text-cyan-500', bg: 'bg-cyan-500/10' },
  { id: 'notes', label: 'Notes Summarizer', icon: Library, color: 'text-fuchsia-500', bg: 'bg-fuchsia-500/10' },
  { id: 'planner', label: 'Study Planner', icon: Calendar, color: 'text-emerald-500', bg: 'bg-emerald-500/10' },
  { id: 'recommendations', label: 'AI Recommendations', icon: Sparkles, color: 'text-violet-500', bg: 'bg-violet-500/10' },
];

const RECENT_HISTORY = [
  { id: 1, tool: 'chat', title: 'React Hooks explanation', time: '2h ago' },
  { id: 2, tool: 'code', title: 'Fix Django CORS issue', time: 'Yesterday' },
  { id: 3, tool: 'resume', title: 'ATS Analysis Result', time: '2 days ago' },
];

const AISidebar = ({ activeToolId, setActiveToolId }) => {
  return (
    <div className="flex flex-col h-full bg-slate-50 dark:bg-[#0B0F19]">
      {/* Header */}
      <div className="p-4 sm:p-6 shrink-0 border-b border-slate-200 dark:border-slate-800 bg-white/50 dark:bg-slate-900/50">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-10 rounded-sm bg-gradient- bg-indigo-500 flex items-center justify-center text-white -indigo-500/30">
            <Sparkles className="w-5 h-5" />
          </div>
          <div>
            <h1 className="font-bold text-lg text-slate-900 dark:text-white leading-tight">AI Studio</h1>
            <p className="text-xs text-slate-500">Your intelligent workspace</p>
          </div>
        </div>

        {/* Search */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <input 
            type="text"
            placeholder="Search AI tools or history..."
            className="w-full bg-slate-100 dark:bg-slate-800 border-none rounded-sm py-2 pl-9 pr-4 text-sm focus:ring-2 focus:ring-indigo-500/50 text-slate-900 dark:text-white placeholder:text-slate-400"
          />
        </div>
      </div>

      <div className="flex-1 overflow-y-auto custom-scrollbar p-3 sm:p-4 space-y-6">
        
        {/* Core Tools */}
        <div>
          <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-3 px-2">Core Tools</h3>
          <div className="space-y-1">
            {AI_TOOLS.map(tool => {
              const isActive = activeToolId === tool.id;
              const Icon = tool.icon;
              
              return (
                <button
                  key={tool.id}
                  onClick={() => setActiveToolId(tool.id)}
                  className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-sm   ${
                    isActive 
                      ? 'bg-white dark:bg-slate-800  border border-slate-200 dark:border-white/5' 
                      : 'hover:bg-slate-200/50 dark:hover:bg-slate-800/50 text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200 border border-transparent'
                  }`}
                >
                  <div className={`p-2 rounded-sm ${isActive ? tool.bg + ' ' + tool.color : 'bg-slate-100 dark:bg-slate-800 text-slate-400'}`}>
                    <Icon className="w-4 h-4" />
                  </div>
                  <span className={`text-sm font-medium ${isActive ? 'text-slate-900 dark:text-white' : ''}`}>
                    {tool.label}
                  </span>
                  {isActive && (
                    <div className="w-1 h-6 bg-indigo-500 rounded-full ml-auto" />
                  )}
                </button>
              );
            })}
          </div>
        </div>

        {/* Recent History */}
        <div>
          <div className="flex items-center justify-between mb-3 px-2">
            <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider">Recent</h3>
            <button 
              onClick={() => alert("You are already viewing all recent history items.")}
              className="text-[10px] font-medium text-indigo-500 hover:text-indigo-600"
            >
              View All
            </button>
          </div>
          <div className="space-y-1">
            {RECENT_HISTORY.map(item => {
              const toolConfig = AI_TOOLS.find(t => t.id === item.tool);
              const Icon = toolConfig?.icon || Bot;
              
              return (
                <button
                  key={item.id}
                  onClick={() => setActiveToolId(item.tool)}
                  className="w-full flex items-center gap-3 px-3 py-2 rounded-sm hover:bg-slate-200/50 dark:hover:bg-slate-800/50 text-left group"
                >
                  <Icon className="w-3.5 h-3.5 text-slate-400 group-hover:text-indigo-500 shrink-0" />
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-slate-700 dark:text-slate-300 truncate">{item.title}</p>
                    <p className="text-[10px] text-slate-400">{item.time}</p>
                  </div>
                </button>
              );
            })}
          </div>
        </div>

      </div>

      {/* Upgrade / Premium Banner */}
      <div className="p-4 shrink-0 border-t border-slate-200 dark:border-slate-800 bg-white/50 dark:bg-slate-900/50">
        <div className="p-3 bg-gradient- bg-indigo-500/10 border border-indigo-500/20 rounded-sm relative overflow-hidden group">
          <div className="absolute top-0 right-0 p-2 opacity-10 group-hover:opacity-20">
            <Star className="w-12 h-12 text-indigo-500" />
          </div>
          <h4 className="text-xs font-bold text-slate-900 dark:text-white mb-1 flex items-center gap-1">
            <Sparkles className="w-3 h-3 text-indigo-500" /> AI Studio Pro
          </h4>
          <p className="text-[10px] text-slate-500 mb-2 max-w-[80%]">Upgrade for GPT-4 access and unlimited file parsing.</p>
          <button 
            onClick={() => alert("AI Studio Pro Upgrade option is coming soon! Thank you for your interest.")}
            className="text-[10px] font-bold text-white bg-indigo-500 hover:bg-indigo-600 px-3 py-1.5 rounded-sm w-full"
          >
            Upgrade Now
          </button>
        </div>
      </div>

    </div>
  );
};

export default AISidebar;
