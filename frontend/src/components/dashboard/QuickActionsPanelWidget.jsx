import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Zap, CheckSquare, CalendarPlus, Download, MessageSquare, Sparkles } from 'lucide-react';


const QuickActionsPanelWidget = () => {
  const navigate = useNavigate();

  const actions = [
    { id: 'attendance', label: 'Mark Attendance', icon: CheckSquare, color: 'text-green-500', bg: 'bg-green-100 dark:bg-green-500/20', route: '/attendance' },
    { id: 'assignment', label: 'Submit Assignment', icon: Zap, color: 'text-blue-500', bg: 'bg-blue-100 dark:bg-blue-500/20', route: '/assignments' },
    { id: 'calendar', label: 'Add Event', icon: CalendarPlus, color: 'text-orange-500', bg: 'bg-orange-100 dark:bg-orange-500/20', route: '/calendar' },
    { id: 'resources', label: 'Get Resources', icon: Download, color: 'text-purple-500', bg: 'bg-purple-100 dark:bg-purple-500/20', route: '/resources' },
    { id: 'message', label: 'Send Message', icon: MessageSquare, color: 'text-indigo-500', bg: 'bg-indigo-100 dark:bg-indigo-500/20', route: '/messages' },
    { id: 'ai', label: 'Ask AI', icon: Sparkles, color: 'text-yellow-500', bg: 'bg-yellow-100 dark:bg-yellow-500/20', route: '/assistant' },
  ];

  return (
    <div className="flex flex-col h-full w-full relative z-10">
      <div className="flex justify-between items-center p-5 pb-3 shrink-0">
        <h3 className="text-xl font-bold text-slate-900 dark:text-white tracking-tight flex items-center gap-2">
          <Zap className="w-5 h-5 text-amber-500 fill-amber-500/20" />
          Quick Actions
        </h3>
      </div>
      
      <div className="flex-1 overflow-y-auto p-4 pt-0">
        <div className="grid grid-cols-2 gap-3 h-full">
          {actions.map((action, i) => (
            <button
              key={i} 
              onClick={() => navigate(action.route)}
              className="flex flex-col items-center justify-center gap-2 p-3 bg-slate-50 dark:bg-white/5 rounded-sm border border-transparent hover:border-slate-200 dark:hover:border-white/10 hover: cursor-pointer group"
            >
              <div className={`w-10 h-10 rounded-full ${action.bg} flex items-center justify-center shrink-0 group- `}>
                <action.icon className={`w-5 h-5 ${action.color}`} />
              </div>
              <span className="text-xs font-semibold text-slate-700 dark:text-slate-300 group-hover:text-primary text-center">
                {action.label}
              </span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default QuickActionsPanelWidget;
