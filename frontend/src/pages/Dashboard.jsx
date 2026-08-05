import React, { useState, useEffect, useRef } from 'react';
import { Responsive } from 'react-grid-layout';
import { 
  TrendingUp, BookOpen, Clock, Calendar, CheckCircle,  
  ArrowRight, MessageSquare, Code, GripHorizontal, Settings2, X, Plus, Zap,
  Maximize2, Minimize2, LayoutDashboard, ClipboardList, FolderOpen, User, Sparkles
} from 'lucide-react';
import { useWorkspace } from '../context/WorkspaceContext';
import { Link, useNavigate } from 'react-router-dom';
import { getApiBaseUrl } from '../services/config';

import { Menu, BookOpen as BookIcon, FolderOpen as FolderIcon, MessageSquare as MessageIcon, Calendar as CalendarIcon, TrendingUp as TrendingUpIcon, Bell as BellIcon, FileText } from 'lucide-react';
import useDashboardStore from '../store/useDashboardStore';
import WidgetWrapper from '../components/WidgetWrapper';
import StatCard from '../components/StatCard';
import AttendanceOverviewWidget from '../components/dashboard/AttendanceOverviewWidget';
import AssignmentsOverviewWidget from '../components/dashboard/AssignmentsOverviewWidget';
import CoursesOverviewWidget from '../components/dashboard/CoursesOverviewWidget';
import ResourcesOverviewWidget from '../components/dashboard/ResourcesOverviewWidget';
import CalendarWidget from '../components/dashboard/CalendarWidget';
import NotificationsCenterWidget from '../components/dashboard/NotificationsCenterWidget';
import ActivityTimelineWidget from '../components/dashboard/ActivityTimelineWidget';
import QuickActionsPanelWidget from '../components/dashboard/QuickActionsPanelWidget';
import PerformanceAnalyticsWidget from '../components/dashboard/PerformanceAnalyticsWidget';
import StudyProgressTrackingWidget from '../components/dashboard/StudyProgressTrackingWidget';

const WidthProvider = (ComposedComponent) => {
  return function WidthProviderWrapper(props) {
    const [width, setWidth] = useState(1200);
    const elementRef = useRef(null);

    useEffect(() => {
      if (!elementRef.current) return;
      
      const observer = new ResizeObserver((entries) => {
        for (let entry of entries) {
          if (entry.contentRect.width > 0) {
            // Apply a small debounce or direct update to ensure smooth grid resizing
            setWidth(entry.contentRect.width);
          }
        }
      });
      
      observer.observe(elementRef.current);
      return () => observer.disconnect();
    }, []);

    return (
      <div ref={elementRef} style={{ width: '100%' }}>
        <ComposedComponent {...props} width={width} />
      </div>
    );
  };
};

const ResponsiveGridLayout = WidthProvider(Responsive);









const Dashboard = () => {
  const navigate = useNavigate();
  const { 
    layouts, visibleWidgets, isEditing, isLoading, 
    setEditing, setLayouts, fetchFromBackend, saveToBackend, 
    toggleWidget, themePreferences, setSidebarCollapsed, setMobileSidebarOpen, isMobileSidebarOpen 
  } = useDashboardStore();
  const { isFullscreen, toggleFullscreen } = useWorkspace();
  const [isWidgetStoreOpen, setIsWidgetStoreOpen] = useState(false);
  const [insightIndex, setInsightIndex] = useState(0);
  const [aiSummary, setAiSummary] = useState(null);
  const [dashboardStats, setDashboardStats] = useState(null);
  const [avatarSrc, setAvatarSrc] = useState(null);
  const fileInputRef = useRef(null);

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setAvatarSrc(imageUrl);
    }
  };
  
  const insights = [
    "You're in the top 10% of your class this week. Keep up the great work!",
    "Your attendance is perfect. You're on track for an A in Physics.",
    "Calculus III assignment is due tomorrow. You have 3 hours of study time left.",
    "Sarah messaged you about the study group at 5 PM."
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setInsightIndex(prev => (prev + 1) % insights.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    fetchFromBackend();
    fetchAiSummary();
    fetchSummary();
  }, []);

  const fetchSummary = async () => {
    try {
      const token = localStorage.getItem('access_token');
      const apiBaseUrl = getApiBaseUrl();
      const response = await fetch(`${apiBaseUrl}/api/v1/dashboard/summary/`, {
        headers: { Authorization: `Bearer ${token}` }
      });

      if (response.ok) {
        const data = await response.json();
        setDashboardStats(data.stats || {});
      }
    } catch (error) {
      console.error('Failed to fetch dashboard summary:', error);
    }
  };

  const fetchAiSummary = async () => {
    try {
      const token = localStorage.getItem('access_token');
      const apiBaseUrl = getApiBaseUrl();
      const response = await fetch(`${apiBaseUrl}/api/v1/analytics/performance-summary/`, {
        headers: { Authorization: `Bearer ${token}` }
      });

      if (response.ok) {
        const data = await response.json();
        setAiSummary(data.summary || "You're in the top 10% of your class this week. Keep it up!");
      } else {
        setAiSummary("You're in the top 10% of your class this week. Keep it up!");
      }
    } catch (error) {
      console.error('Failed to fetch AI summary:', error);
      setAiSummary("You're in the top 10% of your class this week. Keep it up!");
    }
  };

  const handleLayoutChange = (layout, allLayouts) => {
    if (isEditing) {
      setLayouts(allLayouts);
    }
  };

  const saveLayout = () => {
    setEditing(false);
    saveToBackend();
  };

  const enrolled = dashboardStats?.enrolled_courses || 0;
  const attendance = dashboardStats?.attendance_percentage || 0;
  // If stats haven't loaded yet, default to true. Otherwise true if no courses and 0 attendance.
  const isNew = dashboardStats === null || (enrolled === 0 && attendance === 0);

  const WIDGET_CONTENT = {
    'stat1': <StatCard title="Average Grade" value={isNew ? "N/A" : "A-"} change={isNew ? "0%" : "+2%"} icon={TrendingUp} color="bg-primary " progress={isNew ? 0 : 92} />,
    'stat2': <StatCard title="Courses Enrolled" value={enrolled.toString()} change="0%" icon={BookOpen} color="bg-secondary " progress={isNew ? 0 : 100} />,
    'stat3': <StatCard title="Study Hours" value={isNew ? "0h" : "32h"} change={isNew ? "0h" : "+5h"} icon={Clock} color="bg-accent " progress={isNew ? 0 : 75} />,
    'stat4': <StatCard title="Attendance Stats" value={(isNew ? 0 : attendance || 95) + "%"} change={isNew ? "0%" : "+1%"} icon={CheckCircle} color="bg-success " progress={isNew ? 0 : attendance || 95} />,
    'performance': <PerformanceAnalyticsWidget isNew={isNew} />,
    'study_progress': <StudyProgressTrackingWidget isNew={isNew} />,
    'attendance': <AttendanceOverviewWidget />,
    'quick_actions': <QuickActionsPanelWidget />,
    'timeline': <ActivityTimelineWidget />,
    'calendar': <CalendarWidget />,
    'assignments': <AssignmentsOverviewWidget />,
    'courses': <CoursesOverviewWidget />,
    'resources': <ResourcesOverviewWidget />
  };



  const WIDGETS = Object.keys(WIDGET_CONTENT).reduce((acc, key) => {
    acc[key] = <WidgetWrapper id={key} isEditing={isEditing}>{WIDGET_CONTENT[key]}</WidgetWrapper>;
    return acc;
  }, {});

  const ALL_WIDGETS_INFO = [
    { id: 'stat1', title: 'Average Grade', icon: TrendingUp },
    { id: 'stat2', title: 'Courses Enrolled', icon: BookOpen },
    { id: 'stat3', title: 'Study Hours', icon: Clock },
    { id: 'stat4', title: 'Attendance Stats', icon: CheckCircle },
    { id: 'performance', title: 'Performance Chart', icon: TrendingUp },
    { id: 'study_progress', title: 'Study Progress', icon: CheckCircle },
    { id: 'attendance', title: 'Attendance Overview', icon: CheckCircle },
    { id: 'quick_actions', title: 'Quick Actions', icon: Plus },
    { id: 'timeline', title: 'Activity Timeline', icon: Clock },
    { id: 'calendar', title: 'Calendar', icon: Calendar },
    { id: 'assignments', title: 'Assignments', icon: Calendar },
    { id: 'courses', title: 'Courses', icon: BookOpen },
    { id: 'resources', title: 'Resources', icon: FolderOpen }
  ];

  return (
    <div className="w-full h-full relative p-6 pb-20">
      {/* Welcome Hero Section */}
      <div
        className="relative overflow-hidden rounded-[16px] bg-slate-900 p-6 md:p-8 mb-6 text-white flex flex-col lg:flex-row items-center justify-between"
      >

        {/* Left Section */}
        <div className="relative z-10 flex flex-col justify-center max-w-2xl w-full">
          <div className="flex items-center gap-3 mb-2">
            <div className="flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-yellow-400" />
              <span className="text-white/90 text-xs font-semibold tracking-wide">AI Productivity Insight</span>
            </div>
            {/* Fullscreen Toggle */}
            <button 
              onClick={toggleFullscreen}
              className="p-1 bg-white/20 hover:bg-white/30 rounded-sm text-white flex items-center justify-center border border-white/10"
              title={isFullscreen ? "Exit Fullscreen" : "Fullscreen Mode"}
            >
              {isFullscreen ? <Minimize2 className="w-3 h-3" /> : <Maximize2 className="w-3 h-3" />}
            </button>
          </div>
          
          <h1 className="text-2xl md:text-3xl font-bold tracking-tight mb-2 leading-tight">
            Good Morning, <span className="text-[#64FFDA]">Alex!</span>
          </h1>
          
          <p className="text-sm md:text-base text-white/80 mb-4 font-medium max-w-lg">
            Welcome back! Here's a quick overview of your progress and upcoming tasks.
          </p>
          
          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row items-center gap-3 relative z-50">
            <button 
              onClick={() => navigate('/courses')} 
              className="group flex items-center justify-center gap-2 w-full sm:w-auto px-4 py-2 bg-white text-[#3b82f6] text-sm font-bold rounded-sm hover: hover:bg-slate-50 cursor-pointer"
            >
              <BookOpen className="w-4 h-4" />
              Continue Learning 
              <ArrowRight className="w-3 h-3 group-" />
            </button>
          </div>
        </div>

        {/* Right Section - Avatar */}
        <div className="relative flex-shrink-0 mt-6 lg:mt-0 lg:mr-4">
          
          {/* Avatar Container */}
          <div
            onClick={() => fileInputRef.current?.click()}
            className="relative w-32 h-32 lg:w-40 lg:h-40 rounded-full border-[3px] border-slate-700 bg-slate-800 flex items-center justify-center overflow-visible cursor-pointer group"
          >
            <input 
              type="file" 
              ref={fileInputRef} 
              onChange={handleImageUpload} 
              accept="image/*" 
              className="hidden" 
            />
            <div className="relative w-full h-full rounded-full overflow-hidden bg-slate-800 flex items-center justify-center">
              {avatarSrc ? (
                <img 
                  src={avatarSrc} 
                  alt="Student" 
                  className="w-full h-full object-cover"
                />
              ) : (
                <User className="w-16 h-16 text-slate-400" />
              )}
              <div className="absolute inset-0 bg-black/40 flex flex-col items-center justify-center opacity-0 group-hover:opacity-100">
                <Plus className="w-6 h-6 text-white mb-1" />
                <span className="text-white font-medium text-xs">Upload Photo</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="relative -mx-2 sm:mx-0">
        <ResponsiveGridLayout
          className="layout"
          layouts={Object.keys(layouts).reduce((acc, breakpoint) => {
            acc[breakpoint] = layouts[breakpoint].map(item => ({
              ...item,
              static: !isEditing,
              isDraggable: isEditing,
              isResizable: isEditing
            }));
            return acc;
          }, {})}
          breakpoints={{ lg: 1200, md: 996, sm: 768, xs: 480, xxs: 0 }}
          cols={{ lg: 12, md: 10, sm: 6, xs: 4, xxs: 2 }}
          rowHeight={80}
          onLayoutChange={handleLayoutChange}
          isDraggable={isEditing}
          isResizable={isEditing}
          draggableHandle=".cursor-grab"
          margin={[24, 24]}
          useCSSTransforms={true}
        >
          {visibleWidgets.map(widgetId => (
            <div key={widgetId}>
              {WIDGETS[widgetId] || <div>Widget Not Found</div>}
            </div>
          ))}
        </ResponsiveGridLayout>
      </div>

    </div>
  );
};

export default Dashboard;
