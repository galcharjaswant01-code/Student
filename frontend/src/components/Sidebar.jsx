import React, { useState, useEffect } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { 
  LayoutDashboard, 
  CheckSquare, 
  ClipboardList, 
  BookOpen, 
  FolderOpen, 
  Bot, 
  MessageSquare, 
  Calendar, 
  User, 
  Settings, 
  LogOut, 
  GraduationCap,
  ChevronLeft,
  ChevronRight,
  GripVertical
} from 'lucide-react';
import useDashboardStore from '../store/useDashboardStore';
import Avatar from './ui/Avatar';

const menuItems = [
  { icon: LayoutDashboard, label: 'Dashboard', path: '/dashboard' },
  { icon: CheckSquare, label: 'Attendance', path: '/attendance' },
  { icon: ClipboardList, label: 'Assignments', path: '/assignments' },
  { icon: BookOpen, label: 'Courses', path: '/courses' },
  { icon: FolderOpen, label: 'Resources', path: '/resources' },
  { icon: Bot, label: 'AI Studio', path: '/ai-studio' },
  { icon: MessageSquare, label: 'Messages', path: '/messages' },
  { icon: Calendar, label: 'Calendar', path: '/calendar' },
  { icon: User, label: 'Profile', path: '/profile' },
  { icon: Settings, label: 'Settings', path: '/settings' },
];

const Sidebar = () => {
  const { themePreferences, setSidebarCollapsed, setSidebarWidth, isMobileSidebarOpen, setMobileSidebarOpen } = useDashboardStore();
  const isCollapsed = themePreferences?.isSidebarCollapsed ?? false;
  const currentWidth = themePreferences?.sidebarWidth || 260;
  
  const navigate = useNavigate();
  const { currentUser, logout, isGuest } = useAuth();
  
  const [isMobile, setIsMobile] = useState(window.innerWidth < 1024);
  const [isResizing, setIsResizing] = useState(false);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 1024);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Handle Dragging to Resize Sidebar Width dynamically
  useEffect(() => {
    const handleMouseMove = (e) => {
      if (!isResizing || isCollapsed || isMobile) return;
      const newWidth = Math.max(200, Math.min(380, e.clientX));
      setSidebarWidth(newWidth);
    };

    const handleMouseUp = () => {
      if (isResizing) setIsResizing(false);
    };

    if (isResizing) {
      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);
      document.body.style.cursor = 'col-resize';
      document.body.style.userSelect = 'none';
    } else {
      document.body.style.cursor = 'default';
      document.body.style.userSelect = 'auto';
    }

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
      document.body.style.cursor = 'default';
      document.body.style.userSelect = 'auto';
    };
  }, [isResizing, isCollapsed, isMobile, setSidebarWidth]);

  const handleLogout = async () => {
    try {
      await logout();
      navigate('/login');
    } catch (error) {
      console.error('Failed to log out', error);
    }
  };

  const actualWidth = isMobile ? 270 : (isCollapsed ? 76 : currentWidth);

  return (
    <div 
      className={`
        fixed top-0 left-0 z-50
        flex flex-col h-screen overflow-hidden
        bg-slate-900 border-r border-slate-800 text-white
        transition-all duration-150 ease-out select-none
        ${isMobile ? (isMobileSidebarOpen ? 'translate-x-0' : '-translate-x-full') : 'translate-x-0'}
      `}
      style={{ width: actualWidth }}
    >
      {/* Header / Brand & Collapse Toggle */}
      <div className="h-16 flex items-center justify-between px-4 border-b border-slate-800 shrink-0">
        <div className="flex items-center gap-3 overflow-hidden">
          <div className="p-2 rounded-lg border border-blue-500 text-blue-400 bg-transparent shrink-0">
            <GraduationCap className="w-5 h-5" />
          </div>
          {!isCollapsed && (
            <span className="text-lg font-bold text-white tracking-tight whitespace-nowrap">
              Student<span className="text-blue-400">Hub</span>
            </span>
          )}
        </div>

        {/* Collapse / Expand Toggle Button */}
        {!isMobile && (
          <button
            onClick={() => setSidebarCollapsed(!isCollapsed)}
            className="p-1.5 rounded-lg border border-slate-700 text-slate-400 hover:text-white hover:border-slate-600 bg-slate-800 transition-colors"
            title={isCollapsed ? 'Expand Sidebar' : 'Collapse Sidebar'}
          >
            {isCollapsed ? <ChevronRight className="w-4 h-4" /> : <ChevronLeft className="w-4 h-4" />}
          </button>
        )}
      </div>

      {/* Navigation Links */}
      <div className="flex-1 overflow-y-auto custom-scrollbar py-4 px-2 space-y-1">
        {menuItems.map((item, index) => (
          <NavLink
            key={index}
            to={item.path}
            onClick={() => {
              if (isMobile) setMobileSidebarOpen(false);
            }}
            className={({ isActive }) => `
              flex items-center ${isCollapsed ? 'justify-center px-0' : 'px-3.5'} py-2.5 rounded-lg text-sm font-medium transition-colors duration-150
              ${isActive 
                ? 'border-l-4 border-blue-500 bg-blue-950/40 text-blue-400 font-bold' 
                : 'text-slate-300 hover:bg-blue-950/20 hover:text-white'}
            `}
            title={isCollapsed ? item.label : undefined}
          >
            <item.icon className={`w-5 h-5 shrink-0 ${isCollapsed ? '' : 'mr-3'}`} />
            {!isCollapsed && <span className="truncate">{item.label}</span>}
          </NavLink>
        ))}
      </div>

      {/* Footer Profile & Logout */}
      <div className="p-3 border-t border-slate-800 shrink-0 bg-slate-900">
        <div className={`flex items-center p-2 rounded-lg ${isCollapsed ? 'justify-center' : 'justify-between'}`}>
          <div className="flex items-center min-w-0 gap-3">
            <Avatar name={currentUser?.displayName || (isGuest ? 'Guest Visitor' : 'Student User')} size="sm" />
            {!isCollapsed && (
              <div className="min-w-0 flex flex-col">
                <span className="text-xs font-semibold text-white truncate">
                  {currentUser?.displayName || (isGuest ? 'Guest Visitor' : 'Student User')}
                </span>
                <span className="text-[10px] text-blue-400 font-medium truncate uppercase tracking-wider">
                  {isGuest ? 'Guest Mode' : 'Enrolled Student'}
                </span>
              </div>
            )}
          </div>
          
          {!isCollapsed && (
            <button
              onClick={handleLogout}
              className="p-1.5 text-slate-400 hover:text-white transition-colors rounded-md border border-transparent hover:border-slate-700"
              title="Log Out"
            >
              <LogOut className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>

      {/* Right Edge Resizable Drag Handle */}
      {!isMobile && !isCollapsed && (
        <div
          onMouseDown={() => setIsResizing(true)}
          className={`absolute top-0 right-0 w-1.5 h-full cursor-col-resize hover:bg-blue-500/50 transition-colors z-50 flex items-center justify-center ${isResizing ? 'bg-blue-500' : 'bg-transparent'}`}
          title="Drag to resize sidebar width"
        >
          <GripVertical className="w-3 h-3 text-slate-500 opacity-0 hover:opacity-100" />
        </div>
      )}
    </div>
  );
};

export default Sidebar;
