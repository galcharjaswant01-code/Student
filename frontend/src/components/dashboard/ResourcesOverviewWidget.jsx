import React from 'react';
import { useNavigate } from 'react-router-dom';
import { FolderOpen, ArrowRight, Video, FileText, Download } from 'lucide-react';


const ResourcesOverviewWidget = () => {
  const navigate = useNavigate();

  const recentResources = [
    { id: 1, title: 'Calculus Chapter 4 Notes', type: 'doc', icon: FileText, size: '2.4 MB', color: 'text-blue-500', bg: 'bg-blue-100 dark:bg-blue-500/10' },
    { id: 2, title: 'Quantum Mechanics Lecture', type: 'video', icon: Video, size: '45 mins', color: 'text-purple-500', bg: 'bg-purple-100 dark:bg-purple-500/10' },
    { id: 3, title: 'Exam 1 Practice Test', type: 'doc', icon: FileText, size: '1.1 MB', color: 'text-orange-500', bg: 'bg-orange-100 dark:bg-orange-500/10' },
  ];

  return (
    <div className="flex flex-col h-full w-full relative z-10">
      <div className="flex justify-between items-center p-5 pb-2 shrink-0">
        <h3 className="text-xl font-bold text-slate-900 dark:text-white tracking-tight flex items-center gap-2">
          <FolderOpen className="w-5 h-5 text-accent" />
          Resources
        </h3>
        <button 
          onClick={() => navigate('/resources')}
          className="text-sm text-primary hover:text-blue-700 font-medium flex items-center gap-1 group"
        >
          Browse
          <ArrowRight className="w-3 h-3 group-" />
        </button>
      </div>
      
      <div className="flex-1 overflow-y-auto p-4 space-y-3">
        {recentResources.map((resource, i) => (
          <div 
            key={i} 
            className="group flex items-center p-3 bg-white dark:bg-slate-800/50 rounded-sm hover:bg-slate-50 dark:hover:bg-slate-700 border border-slate-100 dark:border-white/5 cursor-pointer"
          >
            <div className={`w-10 h-10 rounded-sm ${resource.bg} flex items-center justify-center shrink-0 mr-4`}>
              <resource.icon className={`w-5 h-5 ${resource.color}`} />
            </div>
            <div className="min-w-0 flex-1">
              <p className="font-semibold text-slate-900 dark:text-white truncate group-hover:text-primary">
                {resource.title}
              </p>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                {resource.size}
              </p>
            </div>
            <button 
              onClick={(e) => { e.stopPropagation(); navigate('/resources'); }}
              className="w-8 h-8 rounded-full hover:bg-slate-200 dark:hover:bg-slate-600 flex items-center justify-center text-slate-400 hover:text-slate-600 dark:hover:text-white"
            >
              <Download className="w-4 h-4" />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ResourcesOverviewWidget;
