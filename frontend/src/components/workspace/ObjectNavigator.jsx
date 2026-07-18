import React from 'react';

import { useWorkspace } from '../../context/WorkspaceContext';
import { X, ChevronRight, ClipboardList, FileText, BookOpen as BookIcon, FolderOpen as FolderIcon, MessageSquare as MessageIcon, Calendar as CalendarIcon, Sparkles as SparklesIcon, TrendingUp as TrendingUpIcon, Bell as BellIcon } from 'lucide-react';
import { useNavigate, useLocation } from 'react-router-dom';

const GLOBAL_NAV_ITEMS = [
  { id: 'attendance', title: 'Attendance', icon: ClipboardList, path: '/attendance' },
  { id: 'assignments', title: 'Assignments', icon: FileText, path: '/assignments' },
  { id: 'courses', title: 'Courses', icon: BookIcon, path: '/courses' },
  { id: 'resources', title: 'Resources', icon: FolderIcon, path: '/resources' },
  { id: 'messages', title: 'Messages', icon: MessageIcon, path: '/messages' },
  { id: 'calendar', title: 'Calendar', icon: CalendarIcon, path: '/calendar' },
  { id: 'assistant', title: 'AI Assistant', icon: SparklesIcon, path: '/assistant' },
  { id: 'analytics', title: 'Analytics', icon: TrendingUpIcon, path: '/analytics' },
  { id: 'notifications', title: 'Notifications', icon: BellIcon, path: '/notifications' },
];

const ObjectNavigator = () => {
  const { isNavigatorOpen, setIsNavigatorOpen } = useWorkspace();
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <>
      {isNavigatorOpen && (
        <div
          className="absolute top-0 left-0 bottom-0 w-72 bg-white/90 dark:bg-slate-900/90 border-r border-slate-200 dark:border-white/10 z-40 flex flex-col"
        >
          <div className="p-4 border-b border-slate-200 dark:border-white/10 flex justify-between items-center">
            <h3 className="font-bold text-slate-800 dark:text-white">Navigator</h3>
            <button 
              onClick={() => setIsNavigatorOpen(false)}
              className="p-1.5 rounded-sm hover:bg-slate-100 dark:hover:bg-white/10 text-slate-500 dark:text-slate-400"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
          <div className="flex-1 overflow-y-auto p-3 space-y-1">
            {GLOBAL_NAV_ITEMS.map((obj) => {
              const isActive = location.pathname.startsWith(obj.path);
              return (
                <button
                  key={obj.id}
                  onClick={() => {
                    navigate(obj.path);
                    if (window.innerWidth < 768) {
                      setIsNavigatorOpen(false);
                    }
                  }}
                  className={`w-full flex items-center justify-between p-3 rounded-sm  ${
                    isActive 
                      ? 'bg-blue-500/10 text-blue-600 dark:text-blue-400 font-medium' 
                      : 'hover:bg-slate-100 dark:hover:bg-white/5 text-slate-600 dark:text-slate-300'
                  }`}
                >
                  <div className="flex items-center gap-3 overflow-hidden">
                    <obj.icon className="w-4 h-4 shrink-0" />
                    <span className="truncate text-sm text-left">{obj.title}</span>
                  </div>
                  {isActive && <ChevronRight className="w-4 h-4 shrink-0" />}
                </button>
              );
            })}
          </div>
        </div>
      )}
    </>
  );
};

export default ObjectNavigator;
