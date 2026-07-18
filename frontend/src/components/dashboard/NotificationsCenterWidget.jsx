import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Bell, ArrowRight, AlertTriangle, Info, CheckCircle2 } from 'lucide-react';


const NotificationsCenterWidget = () => {
  const navigate = useNavigate();

  const notifications = [
    { id: 1, type: 'warning', title: 'System Maintenance', time: '1h ago', message: 'The portal will be down for 2 hours tonight at 11 PM.', icon: AlertTriangle, color: 'text-amber-500', bg: 'bg-amber-100 dark:bg-amber-500/10' },
    { id: 2, type: 'success', title: 'Grade Published', time: '3h ago', message: 'Your grade for Midterm 1 has been published.', icon: CheckCircle2, color: 'text-green-500', bg: 'bg-green-100 dark:bg-green-500/10' },
    { id: 3, type: 'info', title: 'New Course Available', time: '1d ago', message: 'Registration for Summer 2026 is now open.', icon: Info, color: 'text-blue-500', bg: 'bg-blue-100 dark:bg-blue-500/10' },
  ];

  return (
    <div className="flex flex-col h-full w-full relative z-10">
      <div className="flex justify-between items-center p-5 pb-2 shrink-0">
        <h3 className="text-xl font-bold text-slate-900 dark:text-white tracking-tight flex items-center gap-2">
          <Bell className="w-5 h-5 text-rose-500" />
          Notifications
        </h3>
        <button 
          onClick={() => navigate('/notifications')}
          className="text-sm text-primary hover:text-blue-700 font-medium flex items-center gap-1 group"
        >
          View All
          <ArrowRight className="w-3 h-3 group-" />
        </button>
      </div>
      
      <div className="flex-1 overflow-y-auto p-4 space-y-3">
        {notifications.map((notif, i) => (
          <div 
            key={i} 
            className="group flex gap-3 p-3 bg-white dark:bg-slate-800/50 rounded-sm hover:bg-slate-50 dark:hover:bg-slate-700 border border-slate-100 dark:border-white/5 cursor-pointer"
          >
            <div className={`w-9 h-9 rounded-full ${notif.bg} flex items-center justify-center shrink-0`}>
              <notif.icon className={`w-4.5 h-4.5 ${notif.color}`} />
            </div>
            <div className="min-w-0 flex-1">
              <div className="flex justify-between items-baseline mb-0.5">
                <p className="text-sm font-semibold text-slate-900 dark:text-white group-hover:text-primary">
                  {notif.title}
                </p>
                <p className="text-[10px] text-slate-400 font-medium shrink-0 ml-2">{notif.time}</p>
              </div>
              <p className="text-xs text-slate-500 dark:text-slate-400 leading-snug">
                {notif.message}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default NotificationsCenterWidget;
