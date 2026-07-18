import React from 'react';
import { ChevronLeft, ChevronRight, Search, Menu } from 'lucide-react';
import { format, addMonths, subMonths } from 'date-fns';

const CalendarHeader = ({ currentDate, setCurrentDate, view, setView, toggleSidebar }) => {
  return (
    <div className="h-16 px-4 sm:px-6 border-b border-gray-200 dark:border-gray-800 bg-white dark:bg-[#111827] flex items-center justify-between shrink-0 w-full z-10">
      
      <div className="flex items-center gap-4">
        <button 
          onClick={toggleSidebar}
          className="lg:hidden p-2 -ml-2 text-gray-500 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800"
        >
          <Menu className="w-5 h-5" />
        </button>

        <button 
          onClick={() => setCurrentDate(new Date())}
          className="hidden sm:block px-4 py-1.5 rounded-sm border border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800 text-sm font-medium text-gray-700 dark:text-gray-300"
        >
          Today
        </button>

        <div className="flex items-center gap-2">
          <button 
            onClick={() => setCurrentDate(subMonths(currentDate, 1))}
            className="p-1.5 text-gray-500 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-gray-800 rounded-sm"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <button 
            onClick={() => setCurrentDate(addMonths(currentDate, 1))}
            className="p-1.5 text-gray-500 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-gray-800 rounded-sm"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
          <h2 className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white ml-2 min-w-[140px]">
            {format(currentDate, 'MMMM yyyy')}
          </h2>
        </div>
      </div>

      <div className="flex items-center gap-3">
        {/* Toggle group removed since only month view is supported */}
        <div className="hidden sm:flex items-center bg-gray-100 dark:bg-gray-800 rounded-sm p-1">
          <button 
            className="px-3 py-1.5 rounded-md text-sm font-medium bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
          >
            Month
          </button>
        </div>
        
        <button className="p-2 text-gray-500 hover:text-indigo-600 dark:hover:text-indigo-400 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 hidden sm:block">
          <Search className="w-5 h-5" />
        </button>
      </div>

    </div>
  );
};

export default CalendarHeader;
