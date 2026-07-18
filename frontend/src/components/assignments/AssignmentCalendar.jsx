import React from 'react';
import { Calendar as CalendarIcon, Clock } from 'lucide-react';


const AssignmentCalendar = ({ assignments }) => {
  // Sort assignments by closest due date that hasn't passed, or recent ones
  const upcoming = [...(assignments || [])]
    .filter(a => new Date(a.dueDate) >= new Date() || a.status === 'Overdue')
    .sort((a, b) => new Date(a.dueDate) - new Date(b.dueDate))
    .slice(0, 4);

  return (
    <div className="flex flex-col h-full bg-white/70 dark:bg-slate-800/70 rounded-sm border border-white/20 dark:border-white/10 -[0_8px_30px_rgb(0,0,0,0.04)] dark:-[0_8px_30px_rgb(0,0,0,0.1)] overflow-hidden relative">
      <div className="p-6 border-b border-slate-100 dark:border-white/10 flex items-center justify-between">
        <div className="flex items-center gap-2 text-slate-800 dark:text-slate-200">
          <CalendarIcon className="w-5 h-5" />
          <h3 className="font-bold">Upcoming Deadlines</h3>
        </div>
      </div>
      
      <div className="p-6 flex-1 overflow-y-auto custom-scrollbar space-y-4">
        {upcoming.length > 0 ? (
          upcoming.map((assignment, idx) => {
            const dueDate = new Date(assignment.dueDate);
            const isOverdue = assignment.status === 'Overdue';
            const isCritical = assignment.priority === 'Critical';

            return (
              <div 
                key={assignment.id}
                className={`p-3 rounded-sm border ${
                  isOverdue ? 'bg-red-50 dark:bg-red-500/10 border-red-200 dark:border-red-500/20' :
                  isCritical ? 'bg-orange-50 dark:bg-orange-500/10 border-orange-200 dark:border-orange-500/20' :
                  'bg-white dark:bg-slate-800/50 border-slate-100 dark:border-white/5'
                }`}
              >
                <div className="flex items-center gap-3">
                  <div className="flex flex-col items-center justify-center p-2 bg-white dark:bg-slate-900 rounded-sm min-w-[3rem]">
                    <span className="text-[10px] font-bold text-slate-500 uppercase">{dueDate.toLocaleString('default', { month: 'short' })}</span>
                    <span className="text-lg font-black text-slate-900 dark:text-white leading-none">{dueDate.getDate()}</span>
                  </div>
                  <div className="flex-1 overflow-hidden">
                    <h4 className="text-sm font-bold text-slate-900 dark:text-white truncate">{assignment.title}</h4>
                    <p className="text-xs text-slate-500 mt-1 flex items-center gap-1">
                      <Clock className="w-3 h-3" /> {dueDate.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </p>
                  </div>
                </div>
              </div>
            );
          })
        ) : (
          <div className="h-full flex flex-col items-center justify-center text-center opacity-50">
            <CalendarIcon className="w-8 h-8 mb-2" />
            <p className="text-sm font-bold">No upcoming deadlines</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default AssignmentCalendar;
