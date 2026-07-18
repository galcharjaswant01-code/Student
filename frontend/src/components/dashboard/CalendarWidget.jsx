import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Calendar as CalendarIcon, ArrowRight, Clock, MapPin } from 'lucide-react';


const CalendarWidget = () => {
  const navigate = useNavigate();

  const todayEvents = [
    { id: 1, title: 'Physics 101 Lecture', time: '10:00 AM - 11:30 AM', location: 'Room 304, Science Bldg', type: 'lecture', color: 'bg-blue-500' },
    { id: 2, title: 'Study Group: Calculus', time: '2:00 PM - 3:00 PM', location: 'Library 2nd Floor', type: 'study', color: 'bg-purple-500' },
    { id: 3, title: 'Meeting with Advisor', time: '4:15 PM - 4:45 PM', location: 'Admin Block, Office 12', type: 'meeting', color: 'bg-green-500' },
  ];

  return (
    <div className="flex flex-col h-full w-full relative z-10">
      <div className="flex justify-between items-center p-5 pb-2 shrink-0">
        <h3 className="text-xl font-bold text-slate-900 dark:text-white tracking-tight flex items-center gap-2">
          <CalendarIcon className="w-5 h-5 text-blue-500" />
          Today's Schedule
        </h3>
        <button 
          onClick={() => navigate('/calendar')}
          className="text-sm text-primary hover:text-blue-700 font-medium flex items-center gap-1 group"
        >
          Calendar
          <ArrowRight className="w-3 h-3 group-" />
        </button>
      </div>
      
      <div className="flex-1 overflow-y-auto p-4 space-y-3">
        {todayEvents.map((event, i) => (
          <div 
            key={i} 
            onClick={() => navigate('/calendar')}
            className="group relative flex flex-col p-3.5 pl-5 bg-white dark:bg-slate-800/50 rounded-sm hover:bg-slate-50 dark:hover:bg-slate-700 border border-slate-100 dark:border-white/5 cursor-pointer overflow-hidden"
          >
            {/* Left Color Indicator */}
            <div className={`absolute left-0 top-0 bottom-0 w-1.5 ${event.color}`} />
            
            <p className="font-semibold text-slate-900 dark:text-white group-hover:text-primary mb-1">
              {event.title}
            </p>
            
            <div className="flex flex-col gap-1 mt-1">
              <span className="flex items-center gap-1.5 text-xs text-slate-500 dark:text-slate-400">
                <Clock className="w-3.5 h-3.5" />
                {event.time}
              </span>
              <span className="flex items-center gap-1.5 text-xs text-slate-500 dark:text-slate-400">
                <MapPin className="w-3.5 h-3.5" />
                {event.location}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CalendarWidget;
