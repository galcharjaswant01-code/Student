import React from 'react';
import { Plus, ChevronLeft, ChevronRight, Check } from 'lucide-react';
import { format, addMonths, subMonths, startOfMonth, endOfMonth, eachDayOfInterval, isSameMonth, isSameDay, isToday } from 'date-fns';

const CalendarSidebar = ({ 
  currentDate, 
  setCurrentDate, 
  filters, 
  setFilters,
  onAddEvent 
}) => {
  
  // Mini Calendar Logic
  const monthStart = startOfMonth(currentDate);
  const monthEnd = endOfMonth(currentDate);
  
  // We need to pad the start and end of the month to fit a 7-day grid (starting Sunday)
  const startDate = new Date(monthStart);
  startDate.setDate(startDate.getDate() - startDate.getDay());
  
  const endDate = new Date(monthEnd);
  if (endDate.getDay() !== 6) {
    endDate.setDate(endDate.getDate() + (6 - endDate.getDay()));
  }

  const daysInMonth = eachDayOfInterval({ start: startDate, end: endDate });
  const weekDays = ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'];

  const toggleFilter = (filterId) => {
    setFilters(prev => ({
      ...prev,
      [filterId]: !prev[filterId]
    }));
  };

  const filterOptions = [
    { id: 'class', label: 'Classes', color: 'bg-blue-500', text: 'text-blue-500' },
    { id: 'exam', label: 'Exams', color: 'bg-purple-500', text: 'text-purple-500' },
    { id: 'study', label: 'AI Study Blocks', color: 'bg-emerald-500', text: 'text-emerald-500' },
    { id: 'assignment', label: 'Assignments', color: 'bg-rose-500', text: 'text-rose-500' },
    { id: 'meeting', label: 'Meetings', color: 'bg-amber-500', text: 'text-amber-500' },
  ];

  return (
    <div className="w-full lg:w-72 h-full flex flex-col bg-white dark:bg-[#111827] border-r border-gray-200 dark:border-gray-800 shrink-0">
      
      {/* Create Button */}
      <div className="p-4 sm:p-6 shrink-0">
        <button 
          onClick={onAddEvent}
          className="w-full flex items-center justify-center gap-2 bg-gradient- bg-indigo-600 hover:bg-indigo-500 hover: text-white py-3 px-4 rounded-sm font-semibold -[0_4px_15px_rgba(79,70,229,0.3)] hover:-[0_4px_25px_rgba(79,70,229,0.5)]"
        >
          <Plus className="w-5 h-5" />
          Create Event
        </button>
      </div>

      <div className="flex-1 overflow-y-auto px-4 sm:px-6 pb-6 custom-scrollbar">
        {/* Mini Calendar */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold text-gray-900 dark:text-white">
              {format(currentDate, 'MMMM yyyy')}
            </h3>
            <div className="flex items-center gap-1">
              <button 
                onClick={() => setCurrentDate(subMonths(currentDate, 1))}
                className="p-1.5 text-gray-500 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-gray-800 rounded-sm"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <button 
                onClick={() => setCurrentDate(addMonths(currentDate, 1))}
                className="p-1.5 text-gray-500 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-gray-800 rounded-sm"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
          
          <div className="grid grid-cols-7 gap-1 text-center mb-2">
            {weekDays.map(day => (
              <div key={day} className="text-[10px] font-medium text-gray-400 uppercase">
                {day}
              </div>
            ))}
          </div>
          
          <div className="grid grid-cols-7 gap-1">
            {daysInMonth.map((date, idx) => {
              const isSelectedMonth = isSameMonth(date, currentDate);
              const isTodayDate = isToday(date);
              
              return (
                <button
                  key={idx}
                  onClick={() => setCurrentDate(date)}
                  className={`
                    w-8 h-8 rounded-full flex items-center justify-center text-xs  mx-auto
                    ${!isSelectedMonth ? 'text-gray-300 dark:text-gray-600' : 'text-gray-700 dark:text-gray-300'}
                    ${isTodayDate ? 'bg-indigo-600 text-white font-bold  -indigo-500/30' : 'hover:bg-gray-100 dark:hover:bg-gray-800'}
                  `}
                >
                  {format(date, 'd')}
                </button>
              );
            })}
          </div>
        </div>

        {/* Filters */}
        <div>
          <h3 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-4">My Calendars</h3>
          <div className="flex flex-col gap-3">
            {filterOptions.map(option => {
              const isActive = filters[option.id];
              return (
                <label key={option.id} className="flex items-center gap-3 cursor-pointer group">
                  <div className={`
                    w-5 h-5 rounded flex items-center justify-center  border
                    ${isActive ? `${option.color} border-transparent` : 'border-gray-300 dark:border-gray-600 group-hover:border-gray-400 dark:group-hover:border-gray-500'}
                  `}>
                    {isActive && <Check className="w-3.5 h-3.5 text-white" />}
                  </div>
                  <span className={`text-sm font-medium  ${isActive ? 'text-gray-900 dark:text-white' : 'text-gray-500 dark:text-gray-400'}`}>
                    {option.label}
                  </span>
                </label>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CalendarSidebar;
