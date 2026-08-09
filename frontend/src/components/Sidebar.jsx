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
  X
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
  const { isMobileSidebarOpen, setMobileSidebarOpen } = useDashboardStore();
  const navigate = useNavigate();
  const { currentUser, logout, isGuest } = useAuth();
  
  // Persistent Sidebar Collapsed State via localStorage
  const [isCollapsed, setIsCollapsed] = useState(() => {
    return localStorage.getItem('sidebarCollapsed') === 'true';
  });

  const toggleCollapse = () => {
    setIsCollapsed(prev => {
      const nextState = !prev;
      localStorage.setItem('sidebarCollapsed', String(nextState));
      return nextState;
    });
  };

  const handleLogout = async () => {
    try {
      await logout();
      navigate('/login');
    } catch (error) {
      console.error('Failed to log out', error);
    }
  };

  return (
    <>
      {/* Mobile Drawer Overlay Backdrop */}
      {isMobileSidebarOpen && (
        <div
          className="md:hidden fixed inset-0 bg-slate-950/60 backdrop-blur-xs z-40"
          onClick={() => setMobileSidebarOpen(false)}
        />
      )}

      {/* Main Sidebar Container (Flex child on Desktop/Tablet; Slide-out drawer on Mobile) */}
      <aside
        className={`
          flex flex-col h-screen bg-slate-900 border-r border-slate-800 text-white select-none shrink-0 transition-all duration-300 ease-in-out z-50
          max-md:fixed max-md:top-0 max-md:left-0 max-md:w-64 ${isMobileSidebarOpen ? 'max-md:translate-x-0' : 'max-md:-translate-x-full'}
          md:relative md:translate-x-0 ${isCollapsed ? 'md:w-20' : 'md:w-64'}
        `}
      >
        {/* Brand Header & Toggle Button */}
        <div className="h-16 flex items-center justify-between px-4 border-b border-slate-800 shrink-0">
          <div className="flex items-center gap-3 overflow-hidden">
            <div className="p-2 rounded-lg border border-blue-500 text-blue-400 bg-transparent shrink-0">
              <GraduationCap className="w-5 h-5" />
            </div>
            {(!isCollapsed || window.innerWidth < 768) && (
              <span className="text-lg font-bold text-white tracking-tight whitespace-nowrap">
                Student<span className="text-blue-400">Hub</span>
              </span>
            )}
          </div>

          {/* Desktop Collapse/Expand Toggle Button */}
          <button
            onClick={toggleCollapse}
            className="hidden md:flex p-1.5 rounded-lg border border-slate-700 text-slate-400 hover:text-white hover:border-slate-600 bg-slate-800 transition-colors cursor-pointer"
            title={isCollapsed ? 'Expand Sidebar' : 'Collapse Sidebar'}
          >
            {isCollapsed ? <ChevronRight className="w-4 h-4" /> : <ChevronLeft className="w-4 h-4" />}
          </button>

          {/* Mobile Close Button */}
          <button
            onClick={() => setMobileSidebarOpen(false)}
            className="md:hidden p-1.5 rounded-lg text-slate-400 hover:text-white"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Navigation Links */}
        <div className="flex-1 overflow-y-auto custom-scrollbar py-4 px-2 space-y-1">
          {menuItems.map((item, index) => (
            <NavLink
              key={index}
              to={item.path}
              onClick={() => {
                if (window.innerWidth < 768) setMobileSidebarOpen(false);
              }}
              className={({ isActive }) => `
                flex items-center ${isCollapsed ? 'md:justify-center px-3.5' : 'px-3.5'} py-2.5 rounded-lg text-sm font-medium transition-colors duration-150
                ${isActive 
                  ? 'border-l-4 border-blue-500 bg-blue-950/40 text-blue-400 font-bold' 
                  : 'text-slate-300 hover:bg-blue-950/20 hover:text-white'}
              `}
              title={isCollapsed ? item.label : undefined}
            >
              <item.icon className={`w-5 h-5 shrink-0 ${isCollapsed ? 'md:mr-0 mr-3' : 'mr-3'}`} />
              {(!isCollapsed || window.innerWidth < 768) && <span className="truncate">{item.label}</span>}
            </NavLink>
          ))}
        </div>

        {/* Footer Profile & Logout */}
        <div className="p-3 border-t border-slate-800 shrink-0 bg-slate-900">
          <div className={`flex items-center p-2 rounded-lg ${isCollapsed ? 'md:justify-center justify-between' : 'justify-between'}`}>
            <div className="flex items-center min-w-0 gap-3">
              <Avatar name={currentUser?.displayName || (isGuest ? 'Guest Visitor' : 'Student User')} size="sm" />
              {(!isCollapsed || window.innerWidth < 768) && (
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
            
            {(!isCollapsed || window.innerWidth < 768) && (
              <button
                onClick={handleLogout}
                className="p-1.5 text-slate-400 hover:text-white transition-colors rounded-md border border-transparent hover:border-slate-700 cursor-pointer"
                title="Log Out"
              >
                <LogOut className="w-4 h-4" />
              </button>
            )}
          </div>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;
