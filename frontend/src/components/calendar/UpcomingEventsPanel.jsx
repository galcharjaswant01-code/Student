import React from 'react';
import { Calendar as CalendarIcon, Clock, Sparkles } from 'lucide-react';
import { format, parseISO, isAfter, startOfDay } from 'date-fns';

const UpcomingEventsPanel = ({ events }) => {
  
  // Filter for upcoming events from today onwards, sorted chronologically
  const today = startOfDay(new Date());
  const upcomingEvents = events
    .filter(e => isAfter(parseISO(e.start), today) || parseISO(e.start).getTime() === today.getTime())
    .sort((a, b) => parseISO(a.start) - parseISO(b.start))
    .slice(0, 5); // top 5

  return (
    <div className="hidden xl:flex w-80 h-full flex-col bg-gray-50 dark:bg-[#0B0F19] border-l border-gray-200 dark:border-gray-800 shrink-0">
      
      {/* AI Recommendation Card */}
      <div className="p-6 pb-2">
        <div className="bg-gradient- bg-indigo-600 rounded-sm p-5 -[0_10px_30px_rgba(79,70,229,0.2)] relative overflow-hidden group">
          <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/2 group-"></div>
          
          <div className="flex items-center gap-2 mb-3 relative z-10">
            <Sparkles className="w-5 h-5 text-indigo-200" />
            <h3 className="font-bold text-white">AI Planner</h3>
          </div>
          <p className="text-indigo-100 text-sm leading-relaxed mb-4 relative z-10">
            You have a Physics Midterm coming up on the 12th. I suggest adding a 2-hour study block tomorrow.
          </p>
          <button className="w-full py-2 bg-white/20 hover:bg-white/30 rounded-sm text-white text-sm font-semibold relative z-10">
            Schedule Study Block
          </button>
        </div>
      </div>

      {/* Upcoming List */}
      <div className="flex-1 overflow-y-auto p-6 pt-4 custom-scrollbar">
        <h3 className="text-sm font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
          <CalendarIcon className="w-4 h-4 text-indigo-500" />
          Upcoming Events
        </h3>

        <div className="flex flex-col gap-3">
          {upcomingEvents.length === 0 ? (
            <p className="text-sm text-gray-500 text-center py-4">No upcoming events.</p>
          ) : (
            upcomingEvents.map(event => {
              const eventDate = parseISO(event.start);
              return (
                <div key={event.id} className="bg-white dark:bg-[#111827] border border-gray-100 dark:border-gray-800 p-3 rounded-sm hover: - group">
                  <div className="flex justify-between items-start mb-1">
                    <h4 className="font-semibold text-sm text-gray-900 dark:text-white truncate pr-2 group-hover:text-indigo-600 dark:group-hover:text-indigo-400">
                      {event.title}
                    </h4>
                    <div className={`w-2 h-2 rounded-full mt-1.5 shrink-0 ${event.color}`}></div>
                  </div>
                  <div className="flex flex-col gap-1 text-xs text-gray-500 dark:text-gray-400">
                    <div className="flex items-center gap-1.5">
                      <CalendarIcon className="w-3.5 h-3.5" />
                      {format(eventDate, 'MMM d, yyyy')}
                    </div>
                    <div className="flex items-center gap-1.5">
                      <Clock className="w-3.5 h-3.5" />
                      {format(eventDate, 'h:mm a')} - {format(parseISO(event.end), 'h:mm a')}
                    </div>
                  </div>
                </div>
              );
            })
          )}
        </div>
      </div>

    </div>
  );
};

export default UpcomingEventsPanel;
