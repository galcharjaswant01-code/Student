import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Clock, CheckCircle, FileText, Download, Sparkles, BookOpen } from 'lucide-react';


const ActivityTimelineWidget = () => {
  const navigate = useNavigate();

  const activities = [
    { id: 1, type: 'assignment', icon: FileText, title: 'Submitted Assignment', detail: 'Advanced Calculus HW4', time: '10 mins ago', color: 'text-blue-500', bg: 'bg-blue-100 dark:bg-blue-500/20' },
    { id: 2, type: 'attendance', icon: CheckCircle, title: 'Marked Present', detail: 'Physics 101 Lecture', time: '2 hours ago', color: 'text-green-500', bg: 'bg-green-100 dark:bg-green-500/20' },
    { id: 3, type: 'resource', icon: Download, title: 'Downloaded Material', detail: 'Chapter 3 Slides', time: '5 hours ago', color: 'text-orange-500', bg: 'bg-orange-100 dark:bg-orange-500/20' },
    { id: 4, type: 'ai', icon: Sparkles, title: 'AI Interaction', detail: 'Generated Study Plan', time: '1 day ago', color: 'text-purple-500', bg: 'bg-purple-100 dark:bg-purple-500/20' },
    { id: 5, type: 'course', icon: BookOpen, title: 'Completed Module', detail: 'Data Structures: Trees', time: '2 days ago', color: 'text-indigo-500', bg: 'bg-indigo-100 dark:bg-indigo-500/20' },
  ];

  return (
    <div className="flex flex-col h-full w-full relative z-10">
      <div className="flex justify-between items-center p-5 pb-4 shrink-0 border-b border-slate-100 dark:border-white/5">
        <h3 className="text-xl font-bold text-slate-900 dark:text-white tracking-tight flex items-center gap-2">
          <Clock className="w-5 h-5 text-slate-500" />
          Activity Timeline
        </h3>
      </div>
      
      <div className="flex-1 overflow-y-auto p-5 relative">
        {/* Continuous vertical line */}
        <div className="absolute top-5 bottom-5 left-[35px] w-px bg-slate-200 dark:bg-slate-700" />
        
        <div className="space-y-6">
          {activities.map((activity, i) => (
            <div
              key={i} 
              className="relative flex items-start gap-4 group cursor-pointer"
              onClick={() => {
                if (activity.type === 'assignment') navigate('/assignments');
                else if (activity.type === 'resource') navigate('/resources');
                else if (activity.type === 'ai') navigate('/assistant');
                else navigate('/dashboard');
              }}
            >
              <div className={`relative z-10 w-8 h-8 rounded-full ${activity.bg} flex items-center justify-center shrink-0 ring-4 ring-slate-50 dark:ring-[#0B1120] group- `}>
                <activity.icon className={`w-4 h-4 ${activity.color}`} />
              </div>
              
              <div className="flex-1 min-w-0 pt-1">
                <div className="flex justify-between items-baseline mb-0.5">
                  <p className="text-sm font-semibold text-slate-900 dark:text-white group-hover:text-primary">
                    {activity.title}
                  </p>
                  <p className="text-[10px] text-slate-400 font-medium shrink-0 ml-2">{activity.time}</p>
                </div>
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  {activity.detail}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ActivityTimelineWidget;
