import React, { useState, useEffect } from 'react';
import { 
  ChevronRight, 
  ChevronLeft, 
  Clock, 
  CheckSquare, 
  Bell, 
  FileText, 
  Play, 
  Pause, 
  RotateCcw,
  Sparkles
} from 'lucide-react';
import useDashboardStore from '../store/useDashboardStore';
import Badge from './ui/Badge';

const RightSidebar = () => {
  const { rightSidebarWidth, setRightSidebarWidth, isRightSidebarCollapsed, setRightSidebarCollapsed } = useDashboardStore();
  
  const [isMobile, setIsMobile] = useState(window.innerWidth < 1280);
  const [isResizing, setIsResizing] = useState(false);

  // Quick Study Timer State
  const [timerSeconds, setTimerSeconds] = useState(1500); // 25 min Pomodoro
  const [isTimerRunning, setIsTimerRunning] = useState(false);

  // Quick Note State
  const [quickNote, setQuickNote] = useState(localStorage.getItem('quickNote') || 'Calculus Chapter 4 formulas review at 5 PM.');

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 1280);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Timer interval
  useEffect(() => {
    let interval = null;
    if (isTimerRunning && timerSeconds > 0) {
      interval = setInterval(() => setTimerSeconds(prev => prev - 1), 1000);
    } else if (timerSeconds === 0) {
      setIsTimerRunning(false);
    }
    return () => clearInterval(interval);
  }, [isTimerRunning, timerSeconds]);

  // Handle Dragging Left Edge of Right Sidebar to Resize Width
  const handlePointerDown = (e) => {
    e.preventDefault();
    setIsResizing(true);
  };

  useEffect(() => {
    const handlePointerMove = (e) => {
      if (!isResizing || isRightSidebarCollapsed || isMobile) return;
      // Calculate width from viewport right edge to cursor X position
      const newWidth = Math.max(200, Math.min(420, window.innerWidth - e.clientX));
      setRightSidebarWidth(newWidth);
    };

    const handlePointerUp = () => {
      if (isResizing) setIsResizing(false);
    };

    if (isResizing) {
      window.addEventListener('pointermove', handlePointerMove);
      window.addEventListener('pointerup', handlePointerUp);
      document.body.style.cursor = 'col-resize';
      document.body.style.userSelect = 'none';
    } else {
      document.body.style.cursor = 'default';
      document.body.style.userSelect = 'auto';
    }

    return () => {
      window.removeEventListener('pointermove', handlePointerMove);
      window.removeEventListener('pointerup', handlePointerUp);
      document.body.style.cursor = 'default';
      document.body.style.userSelect = 'auto';
    };
  }, [isResizing, isRightSidebarCollapsed, isMobile, setRightSidebarWidth]);

  const formatTimer = (sec) => {
    const m = Math.floor(sec / 60);
    const s = sec % 60;
    return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  const currentActualWidth = isMobile || isRightSidebarCollapsed ? 48 : rightSidebarWidth;

  if (isMobile) return null; // Hide on smaller screens to keep layout clean

  return (
    <aside
      className={`
        fixed top-0 right-0 z-40
        flex flex-col h-screen
        bg-slate-900 border-l border-slate-800 text-white
        transition-all duration-150 ease-out select-none relative
      `}
      style={{ width: currentActualWidth }}
    >
      {/* Left Edge Resizable Drag Handle */}
      {!isRightSidebarCollapsed && (
        <div
          onPointerDown={handlePointerDown}
          className={`absolute top-0 left-0 w-4 h-full cursor-col-resize z-[60] group flex items-center justify-center transition-colors ${
            isResizing ? 'bg-blue-600/40' : 'hover:bg-blue-600/20 bg-transparent'
          }`}
          title="Click and drag to resize right panel width"
        >
          <div className={`w-1 h-12 rounded-full transition-all ${isResizing ? 'bg-blue-500 scale-y-125' : 'bg-slate-700 group-hover:bg-blue-400'}`} />
        </div>
      )}

      {/* Header & Toggle Button */}
      <div className="h-16 flex items-center justify-between px-3.5 border-b border-slate-800 shrink-0">
        <button
          onClick={() => setRightSidebarCollapsed(!isRightSidebarCollapsed)}
          className="p-1.5 rounded-lg border border-slate-700 text-slate-400 hover:text-white hover:border-slate-600 bg-slate-800 transition-colors cursor-pointer"
          title={isRightSidebarCollapsed ? 'Expand Quick Panel' : 'Collapse Quick Panel'}
        >
          {isRightSidebarCollapsed ? <ChevronLeft className="w-4 h-4" /> : <ChevronRight className="w-4 h-4" />}
        </button>

        {!isRightSidebarCollapsed && (
          <span className="text-xs font-bold text-white uppercase tracking-wider">
            Quick Panel
          </span>
        )}
      </div>

      {/* Collapsed Bar Icon */}
      {isRightSidebarCollapsed && (
        <div className="flex-1 flex flex-col items-center py-6 space-y-6">
          <Clock className="w-5 h-5 text-blue-400" />
          <FileText className="w-5 h-5 text-slate-400" />
          <Bell className="w-5 h-5 text-slate-400" />
        </div>
      )}

      {/* Expanded Content Panel */}
      {!isRightSidebarCollapsed && (
        <div className="flex-1 overflow-y-auto custom-scrollbar p-4 space-y-6">
          
          {/* Study Pomodoro Timer */}
          <div className="p-4 rounded-xl border border-slate-800 bg-slate-950/60 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold text-slate-300 flex items-center gap-1.5">
                <Clock className="w-3.5 h-3.5 text-blue-400" />
                Study Session Timer
              </span>
              <Badge variant="blue">Pomodoro</Badge>
            </div>

            <div className="text-center py-2">
              <span className="text-3xl font-extrabold text-blue-400 font-mono tracking-tight">
                {formatTimer(timerSeconds)}
              </span>
            </div>

            <div className="flex items-center justify-center gap-2">
              <button
                onClick={() => setIsTimerRunning(!isTimerRunning)}
                className="px-3 py-1.5 rounded-lg border border-blue-500 bg-transparent text-blue-400 hover:bg-blue-950/40 text-xs font-semibold flex items-center gap-1 transition-colors cursor-pointer"
              >
                {isTimerRunning ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
                <span>{isTimerRunning ? 'Pause' : 'Start'}</span>
              </button>
              <button
                onClick={() => { setIsTimerRunning(false); setTimerSeconds(1500); }}
                className="p-1.5 rounded-lg border border-slate-700 text-slate-400 hover:text-white transition-colors cursor-pointer"
                title="Reset Timer"
              >
                <RotateCcw className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          {/* Quick Scratchpad Note */}
          <div className="p-4 rounded-xl border border-slate-800 bg-slate-950/60 space-y-2">
            <span className="text-xs font-semibold text-slate-300 flex items-center gap-1.5">
              <FileText className="w-3.5 h-3.5 text-blue-400" />
              Quick Study Note
            </span>
            <textarea
              value={quickNote}
              onChange={(e) => {
                setQuickNote(e.target.value);
                localStorage.setItem('quickNote', e.target.value);
              }}
              placeholder="Jot down a quick formula or task..."
              className="w-full h-24 p-2.5 rounded-lg border border-slate-800 bg-slate-900 text-xs text-white placeholder:text-slate-500 focus:outline-none focus:border-blue-500 custom-scrollbar resize-none"
            />
          </div>

          {/* Upcoming Reminders */}
          <div className="p-4 rounded-xl border border-slate-800 bg-slate-950/60 space-y-3">
            <span className="text-xs font-semibold text-slate-300 flex items-center gap-1.5">
              <CheckSquare className="w-3.5 h-3.5 text-blue-400" />
              Today's Key Tasks
            </span>
            <div className="space-y-2 text-xs">
              <div className="p-2 rounded-lg border border-slate-800 bg-slate-900 flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-blue-400 shrink-0" />
                <span className="text-slate-200 truncate">Submit Calculus Problem Set</span>
              </div>
              <div className="p-2 rounded-lg border border-slate-800 bg-slate-900 flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-slate-600 shrink-0" />
                <span className="text-slate-200 truncate">Review Trees & Graphs PDF</span>
              </div>
            </div>
          </div>

        </div>
      )}
    </aside>
  );
};

export default RightSidebar;
