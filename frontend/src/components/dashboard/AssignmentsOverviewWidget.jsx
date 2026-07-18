import React from 'react';
import { useNavigate } from 'react-router-dom';
import { FileText, ArrowRight, Clock, AlertCircle } from 'lucide-react';


const AssignmentsOverviewWidget = () => {
  const navigate = useNavigate();

  const upcomingAssignments = [
    { id: 1, title: 'Advanced Calculus', course: 'MATH 301', due: 'Tomorrow, 11:59 PM', urgency: 'high', color: 'bg-red-500' },
    { id: 2, title: 'Physics Lab Report', course: 'PHYS 201', due: 'In 3 days', urgency: 'medium', color: 'bg-yellow-500' },
    { id: 3, title: 'Literature Essay', course: 'ENG 102', due: 'Next week', urgency: 'low', color: 'bg-blue-500' },
  ];

  return (
    <div className="flex flex-col h-full w-full relative z-10">
      <div className="flex justify-between items-center p-5 pb-2 shrink-0">
        <h3 className="text-xl font-bold text-slate-900 dark:text-white tracking-tight flex items-center gap-2">
          <FileText className="w-5 h-5 text-secondary" />
          Assignments
        </h3>
        <button 
          onClick={() => navigate('/assignments')}
          className="text-sm text-primary hover:text-blue-700 font-medium flex items-center gap-1 group"
        >
          View All
          <ArrowRight className="w-3 h-3 group-" />
        </button>
      </div>
      
      <div className="flex-1 overflow-y-auto p-4 space-y-3">
        {upcomingAssignments.map((task, i) => (
          <div 
            key={i} 
            onClick={() => navigate('/assignments')}
            className="group flex items-start p-3 bg-white dark:bg-slate-800/50 rounded-sm hover:bg-slate-50 dark:hover:bg-slate-700 border border-slate-100 dark:border-white/5 hover: cursor-pointer"
          >
            <div className={`w-2.5 h-2.5 rounded-full mt-1.5 mr-3 shrink-0 ${task.color} -[0_0_8px_${task.color}]`} />
            <div className="min-w-0 flex-1">
              <p className="font-semibold text-slate-900 dark:text-white truncate group-hover:text-primary">
                {task.title}
              </p>
              <div className="flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400 mt-1">
                <span className="font-medium px-2 py-0.5 bg-slate-100 dark:bg-slate-800 rounded-md">
                  {task.course}
                </span>
                <span className="flex items-center gap-1">
                  {task.urgency === 'high' ? <AlertCircle className="w-3 h-3 text-red-500" /> : <Clock className="w-3 h-3" />}
                  {task.due}
                </span>
              </div>
            </div>
            <ArrowRight className="w-4 h-4 text-slate-400 opacity-0 group-hover:opacity-100 mt-2 -translate-x-2 group-" />
          </div>
        ))}
      </div>
    </div>
  );
};

export default AssignmentsOverviewWidget;
