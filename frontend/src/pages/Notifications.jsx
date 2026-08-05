import React from 'react';
import { Bell, CheckSquare } from 'lucide-react';

const mockNotifications = [
  { id: 1, title: 'New Assignment', message: 'Calculus III Chapter 4 assignment is available', time: '10m ago', icon: Bell, color: 'text-blue-500', bg: 'bg-blue-500/10', unread: true },
  { id: 2, title: 'Grade Updated', message: 'Your Physics mid-term was graded: A-', time: '1h ago', icon: CheckSquare, color: 'text-emerald-500', bg: 'bg-emerald-500/10', unread: true },
  { id: 3, title: 'System Maintenance', message: 'The platform will be down for 30 mins tonight.', time: '1d ago', icon: Bell, color: 'text-slate-500', bg: 'bg-slate-500/10', unread: false },
];

const Notifications = () => {
  return (
    <div className="w-full max-w-4xl mx-auto p-4 sm:p-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
      
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-slate-900 dark:text-white">Notifications</h1>
          <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">Stay updated on your coursework and grades.</p>
        </div>
        <button className="text-sm font-medium text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white transition-colors">
          Mark all as read
        </button>
      </div>

      <div className="bg-white dark:bg-[#111827] rounded-2xl border border-slate-200/50 dark:border-white/5 overflow-hidden shadow-sm">
        {mockNotifications.map((notif, idx) => (
          <div 
            key={notif.id} 
            className={`p-5 flex gap-4 transition-colors hover:bg-slate-50 dark:hover:bg-white/[0.02] ${
              idx !== mockNotifications.length - 1 ? 'border-b border-slate-100 dark:border-white/5' : ''
            } ${notif.unread ? 'bg-slate-50/50 dark:bg-white/[0.01]' : ''}`}
          >
            <div className={`shrink-0 w-10 h-10 rounded-full flex items-center justify-center ${notif.bg}`}>
              <notif.icon className={`w-5 h-5 ${notif.color}`} />
            </div>
            
            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between gap-2 mb-1">
                <h3 className={`text-sm font-semibold truncate ${notif.unread ? 'text-slate-900 dark:text-white' : 'text-slate-700 dark:text-slate-300'}`}>
                  {notif.title}
                </h3>
                <span className="text-xs font-medium text-slate-400 dark:text-slate-500 shrink-0">
                  {notif.time}
                </span>
              </div>
              <p className={`text-sm ${notif.unread ? 'text-slate-600 dark:text-slate-400' : 'text-slate-500 dark:text-slate-500'}`}>
                {notif.message}
              </p>
            </div>
            
            {notif.unread && (
              <div className="shrink-0 flex items-center justify-center w-8">
                <div className="w-2 h-2 rounded-full bg-blue-500"></div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Notifications;
