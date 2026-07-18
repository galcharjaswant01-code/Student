import React, { useState } from 'react';

import { ChevronLeft, ChevronRight, CheckCircle2, XCircle, Clock } from 'lucide-react';

const generateCalendarDays = () => {
  // Simulating May 2025 (Starts on Thursday, 31 days)
  const days = [];
  // Empty slots for Mon, Tue, Wed
  for (let i = 0; i < 3; i++) {
    days.push({ id: `empty-${i}`, date: null, status: null });
  }
  
  // Fill 31 days with mock status
  for (let i = 1; i <= 31; i++) {
    let status = 'Present'; // default
    if ([5, 12].includes(i)) status = 'Absent';
    if ([8, 19, 22].includes(i)) status = 'Late';
    if ([3, 4, 10, 11, 17, 18, 24, 25, 31].includes(i)) status = 'Holiday'; // Weekends
    
    days.push({ id: `day-${i}`, date: i, status });
  }
  return days;
};

const AttendanceCalendar = () => {
  const [selectedDate, setSelectedDate] = useState(28);
  const days = generateCalendarDays();
  const weekDays = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

  const getStatusColor = (status, isSelected) => {
    if (!status || status === 'Holiday') return isSelected ? 'bg-primary text-white' : 'text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800';
    
    const colors = {
      'Present': isSelected ? 'bg-emerald-500 text-white -[0_0_15px_rgba(16,185,129,0.5)]' : 'bg-emerald-50 text-emerald-600 dark:bg-emerald-500/10 dark:text-emerald-400 hover:bg-emerald-100 dark:hover:bg-emerald-500/20 border-emerald-200 dark:border-emerald-500/20 border',
      'Absent': isSelected ? 'bg-red-500 text-white -[0_0_15px_rgba(239,68,68,0.5)]' : 'bg-red-50 text-red-600 dark:bg-red-500/10 dark:text-red-400 hover:bg-red-100 dark:hover:bg-red-500/20 border-red-200 dark:border-red-500/20 border',
      'Late': isSelected ? 'bg-amber-500 text-white -[0_0_15px_rgba(245,158,11,0.5)]' : 'bg-amber-50 text-amber-600 dark:bg-amber-500/10 dark:text-amber-400 hover:bg-amber-100 dark:hover:bg-amber-500/20 border-amber-200 dark:border-amber-500/20 border'
    };
    return colors[status];
  };


  return (
    <div className="w-full flex flex-col items-center">
      {/* Calendar Header */}
      <div className="flex justify-between items-center w-full mb-6 relative z-10">
        <button className="p-2 rounded-sm border border-slate-200 dark:border-white/10 hover:bg-slate-50 dark:hover:bg-slate-800 text-slate-600 dark:text-slate-300">
          <ChevronLeft className="w-5 h-5" />
        </button>
        <h2 className="text-lg font-bold text-slate-900 dark:text-white tracking-tight">May 2025</h2>
        <button className="p-2 rounded-sm border border-slate-200 dark:border-white/10 hover:bg-slate-50 dark:hover:bg-slate-800 text-slate-600 dark:text-slate-300">
          <ChevronRight className="w-5 h-5" />
        </button>
      </div>

      {/* Weekdays */}
      <div className="grid grid-cols-7 gap-2 w-full mb-2 relative z-10">
        {weekDays.map(day => (
          <div key={day} className="text-center text-xs font-semibold text-slate-400 py-2">
            {day}
          </div>
        ))}
      </div>

      {/* Days Grid */}
      <div className="grid grid-cols-7 gap-2 sm:gap-3 w-full relative z-10">
        {days.map((day) => (
          <button
            key={day.id}
            onClick={() => day.date && setSelectedDate(day.date)}
            disabled={!day.date}
            className={`
              relative aspect-square rounded-sm flex items-center justify-center text-sm font-semibold 
              ${!day.date ? 'invisible' : 'cursor-pointer'}
              ${getStatusColor(day.status, selectedDate === day.date)}
            `}
          >
            {day.date}
          </button>
        ))}
      </div>

      {/* Selected Date Info Panel */}
      
        <div 
          key={selectedDate}
          className="w-full mt-6 p-4 rounded-sm bg-slate-50 dark:bg-slate-800/50 border border-slate-100 dark:border-white/5 relative z-10"
        >
          <div className="flex justify-between items-center mb-3">
            <h4 className="font-bold text-slate-900 dark:text-white">May {selectedDate}, 2025</h4>
            {selectedDate === 12 && <span className="text-xs font-bold px-2 py-1 bg-red-100 text-red-600 rounded-md border border-red-200">Absent</span>}
            {selectedDate === 8 && <span className="text-xs font-bold px-2 py-1 bg-amber-100 text-amber-600 rounded-md border border-amber-200">Late</span>}
            {![8, 12].includes(selectedDate) && <span className="text-xs font-bold px-2 py-1 bg-emerald-100 text-emerald-600 rounded-md border border-emerald-200">Present</span>}
          </div>
          <div className="space-y-2">
            <div className="flex justify-between text-sm text-slate-600 dark:text-slate-300">
              <span className="font-medium">Mathematics</span>
              <span className="text-emerald-500 font-semibold">Attended (10:00 AM)</span>
            </div>
            <div className="flex justify-between text-sm text-slate-600 dark:text-slate-300">
              <span className="font-medium">Physics</span>
              <span className="text-emerald-500 font-semibold">Attended (11:30 AM)</span>
            </div>
            {selectedDate === 8 && (
              <div className="flex justify-between text-sm text-slate-600 dark:text-slate-300">
                <span className="font-medium">Computer Science</span>
                <span className="text-amber-500 font-semibold">Late (02:15 PM)</span>
              </div>
            )}
            {selectedDate === 12 && (
              <div className="flex justify-between text-sm text-slate-600 dark:text-slate-300">
                <span className="font-medium">Chemistry</span>
                <span className="text-red-500 font-semibold">Missed Class</span>
              </div>
            )}
          </div>
        </div>
      

    </div>
  );
};

export default AttendanceCalendar;
