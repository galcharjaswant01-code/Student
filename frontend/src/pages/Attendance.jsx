import React, { useEffect } from 'react';
import { Calendar as CalendarIcon, Filter, Menu, BarChart3, CheckCircle, Calendar, Maximize2, Minimize2 } from 'lucide-react';
import useDashboardStore from '../store/useDashboardStore';

import WidgetWrapper from '../components/WidgetWrapper';
import { useWorkspace } from '../context/WorkspaceContext';

import AttendanceStats from '../components/attendance/AttendanceStats';
import AttendanceCharts from '../components/attendance/AttendanceCharts';
import AttendanceTable from '../components/attendance/AttendanceTable';
import AttendanceCalendar from '../components/attendance/AttendanceCalendar';

const Attendance = () => {
  const { isFullscreen, toggleFullscreen } = useWorkspace();



  return (
    <div className="p-6 w-full space-y-6 pb-20 relative overflow-hidden">
      {/* Background Orbs */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary/20 dark:bg-primary/10 rounded-full blur-[100px] pointer-events-none z-0" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-purple-500/20 dark:bg-purple-500/10 rounded-full blur-[100px] pointer-events-none z-0" />
      
      {/* Top Header Section */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 relative z-10">
        <div className="flex items-center gap-4">
          <button 
            onClick={() => {
              const store = useDashboardStore.getState();
              if (window.innerWidth < 1024) {
                store.setMobileSidebarOpen(true);
              } else {
                store.setSidebarCollapsed(!store.themePreferences?.isSidebarCollapsed);
              }
            }}
            className="p-2.5 bg-white/50 dark:bg-slate-800/50 hover:bg-white/80 dark:hover:bg-slate-700/80 rounded-xl flex-shrink-0 border border-white/20 dark:border-white/10 transition-colors"
          >
            <Menu className="w-5 h-5 text-slate-700 dark:text-slate-300" />
          </button>
          <div>
            <h1 className="text-3xl md:text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-slate-900 to-slate-600 dark:from-white dark:to-slate-400 tracking-tight">
              Attendance Hub
            </h1>
            <p className="text-sm font-medium text-slate-500 dark:text-slate-400 mt-1">Monitor your presence, track streaks, and analyze your performance.</p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          {/* Fullscreen Toggle */}
          <button 
            onClick={toggleFullscreen}
            className="p-2.5 bg-white/70 dark:bg-slate-800/70 border border-white/20 dark:border-white/10 rounded-xl text-slate-500 hover:text-primary flex items-center justify-center backdrop-blur-sm transition-colors"
            title={isFullscreen ? "Exit Fullscreen" : "Fullscreen Mode"}
          >
            {isFullscreen ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
          </button>
        </div>
      </div>

      {/* Analytics Cards */}
      <div className="w-full">
        <AttendanceStats />
      </div>

      {/* Charts Section */}
      <div className="w-full">
        <AttendanceCharts />
      </div>

      {/* Complex Detailed Views Grid */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6 items-stretch">
        
        {/* Table taking 2/3 width on large screens */}
        <div className="xl:col-span-2 flex flex-col min-h-[600px] relative">
          <WidgetWrapper id="attendance-table" innerClassName="p-0 h-full flex flex-col overflow-y-auto custom-scrollbar">
            <AttendanceTable />
          </WidgetWrapper>
        </div>

        {/* Calendar taking 1/3 width */}
        <div className="xl:col-span-1 flex flex-col relative min-h-[400px]">
          <WidgetWrapper id="attendance-calendar" innerClassName="p-0 h-full flex flex-col overflow-y-auto custom-scrollbar">
            <div className="h-full flex flex-col">
               <AttendanceCalendar />
            </div>
          </WidgetWrapper>
        </div>

      </div>
      </div>
  );
};

export default Attendance;
