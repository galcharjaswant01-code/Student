import React, { useState, useRef, useEffect } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { 
  LayoutDashboard, BookOpen, ClipboardList, CheckSquare, FolderOpen, 
  MessageSquare, Bot, Calendar, Settings, LogOut, ChevronLeft, ChevronRight, User
} from 'lucide-react';
import useDashboardStore from '../store/useDashboardStore';


const menuItems = [
  { icon: LayoutDashboard, label: 'Dashboard', path: '/dashboard' },
  { icon: ClipboardList, label: 'Assignments', path: '/assignments' },
  { icon: CheckSquare, label: 'Attendance', path: '/attendance' },
  { icon: BookOpen, label: 'Courses', path: '/courses' },
  { icon: FolderOpen, label: 'Resources', path: '/resources' },
  { icon: Bot, label: 'AI Studio', path: '/ai-studio' },
  { icon: Calendar, label: 'Calendar', path: '/calendar' },
];

const Sidebar = () => {
  const { themePreferences, setSidebarWidth, setSidebarCollapsed, isMobileSidebarOpen, setMobileSidebarOpen } = useDashboardStore();
  const isCollapsed = themePreferences?.isSidebarCollapsed ?? false;
  const setIsCollapsed = setSidebarCollapsed;
  const width = themePreferences?.sidebarWidth || 288;
  const isVisible = themePreferences?.isSidebarVisible ?? true;
  const navigate = useNavigate();
  const { currentUser, logout } = useAuth();
  
  const sidebarRef = useRef(null);

  const [isMobile, setIsMobile] = useState(window.innerWidth < 1024);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 1024);
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const handleLogout = async () => {
    try {
      await logout();
      navigate('/login');
    } catch (error) {
      console.error('Failed to log out', error);
    }
  };

  return (
    <div 
      ref={sidebarRef}
      className={`
        fixed top-0 left-0 z-50
        flex flex-col h-screen overflow-hidden
        bg-white/70 dark:bg-[#0F172A]/80 border-r border-slate-200/50 dark:border-white/5 
        transition-all duration-300 ease-in-out
        ${isMobile ? (isMobileSidebarOpen ? 'translate-x-0' : '-translate-x-full') : 'translate-x-0'}
      `}
      style={{ width: isMobile ? 288 : (isCollapsed ? 80 : width) }}
    >
      {/* Header */}
      <div className="h-20 flex items-center justify-between pr-6 pl-6 border-b border-slate-200/50 dark:border-white/5 bg-white/50 dark:bg-transparent relative">
        <div className="flex items-center gap-3 overflow-hidden">
          <div className="w-10 h-10 rounded-sm bg-gradient- bg-primary flex flex-col items-center justify-center shrink-0 dark:-[0_0_15px_rgba(37,99,235,0.4)] relative group overflow-hidden">
             <div className="absolute inset-0 bg-white/20 translate-y-full group-"></div>
             <div className="flex space-x-[2px] mb-[2px]">
               <div className="w-[6px] h-[6px] bg-white rounded-sm"></div>
               <div className="w-[6px] h-[6px] bg-white rounded-sm"></div>
             </div>
             <div className="flex space-x-[2px]">
               <div className="w-[6px] h-[6px] bg-white rounded-sm"></div>
               <div className="w-[6px] h-[6px] bg-accent rounded-sm dark:-[0_0_5px_#06B6D4]"></div>
             </div>
          </div>
          
          
            {!isCollapsed && (
              <span
                className="text-xl font-bold bg-clip-text text-transparent bg-gradient- bg-slate-900 dark:bg-white dark: whitespace-nowrap"
              >
                SyncSpace
              </span>
            )}
          
        </div>
      </div>

      {/* Navigation */}
      <div className="flex-1 overflow-y-auto custom-scrollbar py-6 px-3 space-y-1">
        {menuItems.map((item, index) => {
          return (
            <NavLink
              key={index}
              to={item.path}
              onClick={() => {
                if (isMobile) setMobileSidebarOpen(false);
              }}
              className={({ isActive }) => `
                flex items-center ${isCollapsed ? 'justify-center px-0' : 'px-3'} py-3 mb-1 rounded-sm   group relative overflow-hidden
                ${isActive 
                  ? 'bg-primary/10 text-primary dark:bg-white/10 dark:text-white -[inset_2px_0_0_0_#06B6D4] dark:-[inset_2px_0_0_0_#06B6D4]' 
                  : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-white/5 hover:text-slate-900 dark:hover:text-white '}
              `}
              title={isCollapsed ? item.label : undefined}
            >
              {({ isActive }) => (
                <>
                  
                    {isActive && (
                      <div
                        className="absolute inset-0 bg-gradient- bg-primary/10 dark:bg-white/5 opacity-50"
                      />
                    )}
                  
                  
                  <item.icon className={`w-5 h-5 shrink-0 ${isCollapsed ? '' : 'mr-3'}   relative z-10 ${isActive ? 'text-accent dark:drop--[0_0_8px_rgba(6,182,212,0.5)]' : 'group-'}`} />
                  
                  
                    {!isCollapsed && (
                      <span
                        className="font-medium whitespace-nowrap relative z-10"
                      >
                        {item.label}
                      </span>
                    )}
                  
                </>
              )}
            </NavLink>
          );
        })}
      </div>

      {/* Footer Profile */}
      <div className="p-4 sm:p-5 pb-2">
        <div className={`flex items-center p-2 rounded-xl transition-all duration-300 hover:bg-slate-50/80 dark:hover:bg-white/5 ${isCollapsed ? 'justify-center' : 'justify-between'}`}>
          <div className="flex items-center min-w-0 gap-3">
            <div className="w-9 h-9 rounded-full bg-slate-900 dark:bg-white flex items-center justify-center text-white dark:text-slate-900 shrink-0 shadow-sm transition-transform duration-300 hover:scale-105">
              <User className="w-4 h-4" />
            </div>
            
            {!isCollapsed && (
              <div className="min-w-0 flex flex-col">
                <span className="text-sm font-semibold tracking-tight text-slate-900 dark:text-white truncate">
                  {currentUser?.name || 'User'}
                </span>
                <span className="text-[10px] font-bold text-slate-400 dark:text-slate-500 tracking-wider uppercase truncate mt-0.5">
                  {currentUser?.role || 'Student'}
                </span>
              </div>
            )}
          </div>
          
          {!isCollapsed && (
            <button
              onClick={handleLogout}
              className="p-2 text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors duration-200 rounded-full shrink-0"
              title="Log Out"
            >
              <LogOut className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>

      {/* Developed By */}
      {!isCollapsed && (
        <div className="px-5 pb-5 text-center mt-1">
          <p className="text-[10px] text-slate-400 dark:text-slate-500 font-medium">
            Developed by Jaswant Galchar
          </p>
          <p className="text-[10px] text-slate-400/70 dark:text-slate-500/70 font-medium mt-0.5">
            Powered by Vercel
          </p>
        </div>
      )}
    </div>
  );
};

export default Sidebar;
