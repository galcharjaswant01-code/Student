import React from 'react';
import { format, startOfMonth, endOfMonth, eachDayOfInterval, isSameMonth, isToday, parseISO, startOfWeek, endOfWeek } from 'date-fns';

const CalendarGrid = ({ currentDate, events, filters, view }) => {
  // Filter events based on active filters
  const visibleEvents = events.filter(e => filters[e.type] !== false);

  const getEventsForDay = (date) => {
    return visibleEvents.filter(e => {
      const eDate = parseISO(e.start);
      return eDate.getFullYear() === date.getFullYear() && 
             eDate.getMonth() === date.getMonth() && 
             eDate.getDate() === date.getDate();
    });
  };

  const monthStart = startOfMonth(currentDate);
  const monthEnd = endOfMonth(currentDate);
  
  const startDate = new Date(monthStart);
  startDate.setDate(startDate.getDate() - startDate.getDay());
  
  const endDate = new Date(monthEnd);
  if (endDate.getDay() !== 6) {
    endDate.setDate(endDate.getDate() + (6 - endDate.getDay()));
  }

  const daysInMonth = eachDayOfInterval({ start: startDate, end: endDate });
  const weekDays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

  return (
    <div className="flex-1 flex flex-col h-full bg-white dark:bg-[#111827] overflow-hidden custom-scrollbar">
      {/* Grid Header */}
      <div className="grid grid-cols-7 border-b border-gray-200 dark:border-gray-800 shrink-0">
        {weekDays.map(day => (
          <div key={day} className="py-3 text-center text-xs font-semibold text-gray-500 uppercase tracking-wider">
            {day}
          </div>
        ))}
      </div>

      {/* Grid Cells */}
      <div className="flex-1 grid grid-cols-7 grid-rows-[repeat(auto-fill,minmax(100px,1fr))] md:grid-rows-5 lg:grid-rows-6">
        {daysInMonth.map((date, idx) => {
          const isSelectedMonth = isSameMonth(date, currentDate);
          const isTodayDate = isToday(date);
          const dayEvents = getEventsForDay(date);

          return (
            <div 
              key={idx} 
              className={`
                border-r border-b border-gray-200 dark:border-gray-800 p-1 sm:p-2 flex flex-col 
                ${!isSelectedMonth ? 'bg-gray-50/50 dark:bg-[#0B0F19]/50' : 'hover:bg-gray-50 dark:hover:bg-gray-800/50'}
              `}
            >
              <div className="flex justify-between items-start mb-1">
                <span className={`
                  w-7 h-7 flex items-center justify-center rounded-full text-sm font-medium
                  ${isTodayDate ? 'bg-indigo-600 text-white  -indigo-500/30' : !isSelectedMonth ? 'text-gray-400 dark:text-gray-600' : 'text-gray-700 dark:text-gray-300'}
                `}>
                  {format(date, 'd')}
                </span>
              </div>
              
              <div className="flex-1 overflow-y-auto custom-scrollbar flex flex-col gap-1 pr-1">
                {dayEvents.map(event => (
                  <div 
                    key={event.id}
                    className={`
                      px-2 py-1 rounded text-xs font-semibold truncate text-white cursor-pointer hover:opacity-90 
                      ${event.color} 
                    `}
                    title={`${event.title} - ${format(parseISO(event.start), 'h:mm a')}`}
                  >
                    {format(parseISO(event.start), 'h:mm a')} - {event.title}
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default CalendarGrid;
