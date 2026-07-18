import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { Bell, Search, Settings, LogOut, User, MessageSquare, CheckSquare, Moon, Sun, Command, X, ArrowRight, Menu, LayoutDashboard, ClipboardList, BookOpen, FolderOpen } from 'lucide-react';
import SidebarToggleButton from './SidebarToggleButton';

import useDashboardStore from '../store/useDashboardStore';

const mockNotifications = [
  { id: 1, title: 'New Assignment', message: 'Calculus III Chapter 4 assignment is available', time: '10m ago', icon: Bell, color: 'text-blue-500', bg: 'bg-blue-500/10' },
  { id: 2, title: 'Grade Updated', message: 'Your Physics mid-term was graded: A-', time: '1h ago', icon: CheckSquare, color: 'text-green-500', bg: 'bg-green-500/10' },
  { id: 3, title: 'Study Group Message', message: 'Sarah: "Are we still meeting at 5 PM in the AI Studio?"', time: '2h ago', icon: MessageSquare, color: 'text-purple-500', bg: 'bg-purple-500/10' },
];

import { aiApi } from '../services/aiApi';

// Remove mockSearchResults and use state for results


const TopNavbar = () => {
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [isSearching, setIsSearching] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const navigate = useNavigate();
  
  const { themePreferences, setTheme, isMobileSidebarOpen, setMobileSidebarOpen, setSidebarCollapsed } = useDashboardStore();
  const isDark = themePreferences?.theme !== 'light';
  const isCollapsed = themePreferences?.isSidebarCollapsed ?? false;

  const notifRef = useRef(null);
  const searchRef = useRef(null);
  const searchInputRef = useRef(null);
  const profileRef = useRef(null);
  
  // Flatten items for keyboard navigation
  const flatItems = searchResults.flatMap(s => s.items);

  // Debounced search effect
  useEffect(() => {
    if (!searchQuery) {
      setSearchResults([]);
      return;
    }
    const timer = setTimeout(async () => {
      setIsSearching(true);
      try {
        const results = await aiApi.smartSearch(searchQuery);
        setSearchResults(results);
      } catch (e) {
        console.error(e);
      } finally {
        setIsSearching(false);
      }
    }, 300);
    return () => clearTimeout(timer);
  }, [searchQuery]);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
        e.preventDefault();
        setIsSearchOpen(true);
      }
      if (isSearchOpen) {
        if (e.key === 'Escape') setIsSearchOpen(false);
        if (e.key === 'ArrowDown') {
          e.preventDefault();
          setSelectedIndex(prev => (prev + 1) % flatItems.length);
        }
        if (e.key === 'ArrowUp') {
          e.preventDefault();
          setSelectedIndex(prev => (prev - 1 + flatItems.length) % flatItems.length);
        }
        if (e.key === 'Enter') {
          e.preventDefault();
          const selectedAction = flatItems[selectedIndex];
          if (selectedAction === 'Toggle Dark Mode') setTheme(isDark ? 'light' : 'dark');
          setIsSearchOpen(false);
        }
      }
    };

    const handleClickOutside = (event) => {
      if (notifRef.current && !notifRef.current.contains(event.target)) {
        setIsNotificationsOpen(false);
      }
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setIsSearchOpen(false);
      }
      if (profileRef.current && !profileRef.current.contains(event.target)) {
        setIsProfileOpen(false);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isSearchOpen, selectedIndex, flatItems, isDark, setTheme]);

  useEffect(() => {
    if (isSearchOpen && searchInputRef.current) {
      setTimeout(() => searchInputRef.current.focus(), 50);
      setSelectedIndex(0);
    }
  }, [isSearchOpen]);

  const toggleTheme = () => {
    setTheme(isDark ? 'light' : 'dark');
  };

  return (
    <header className="sticky top-0 z-40 w-full bg-white/70 dark:bg-[#0F172A]/70 border-b border-slate-200/50 dark:border-white/5">
      <div className="flex h-16 items-center justify-between px-4 sm:px-6">
        
        {/* Left Section */}
        <div className="flex items-center gap-2.5 flex-1 relative">
          
          <div className="lg:hidden flex items-center gap-2 pr-2 border-r border-slate-200/50 dark:border-white/10">
            <div className="w-8 h-8 rounded-sm bg-gradient- bg-primary flex items-center justify-center">
              <span className="text-white font-bold text-sm">S</span>
            </div>
          </div>
          
          <div className="relative" ref={searchRef}>
            {/* Desktop Search Bar */}
            <div 
              onClick={() => setIsSearchOpen(true)}
              className="hidden sm:flex items-center w-64 bg-slate-100/80 dark:bg-black/20 hover:bg-slate-200/80 dark:hover:bg-black/40 border border-transparent dark:border-white/5 rounded-sm px-3 py-2 cursor-text group"
            >
              <Search className="w-4 h-4 text-slate-400 group-hover:text-primary" />
              <span className="ml-2 text-sm text-slate-500 dark:text-slate-400 flex-1 select-none">Search...</span>
              <div className="flex items-center gap-1 text-[10px] font-medium text-slate-400 dark:text-slate-500 bg-white dark:bg-white/5 px-1.5 py-0.5 rounded border border-slate-200 dark:border-transparent">
                <Command className="w-3 h-3" />
                <span>K</span>
              </div>
            </div>

            {/* Mobile Search Icon */}
            <button 
              onClick={() => setIsSearchOpen(true)}
              className="sm:hidden p-2 text-slate-500 hover:text-primary dark:text-slate-400 dark:hover:text-white rounded-sm hover:bg-slate-100 dark:hover:bg-white/5"
            >
              <Search className="w-5 h-5" />
            </button>

            {/* Smart Search Dropdown Modal */}
            
              {isSearchOpen && (
                <div
                  className="fixed sm:absolute top-16 sm:top-0 left-4 sm:left-0 right-4 sm:right-auto w-auto sm:w-[500px] max-w-[500px] bg-white/95 dark:bg-[#0F172A]/95 -3xl border border-slate-200 dark:border-white/10 rounded-sm overflow-hidden z-50"
                >
                  <div className="p-3 border-b border-slate-100 dark:border-white/5 flex items-center gap-2">
                    <Search className="w-5 h-5 text-primary" />
                    <input 
                      ref={searchInputRef}
                      type="text" 
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      placeholder="Type a command or search..." 
                      className="flex-1 bg-transparent border-none outline-none text-slate-900 dark:text-white placeholder-slate-400 text-sm"
                    />
                    <div className="flex gap-1">
                      <span className="text-[10px] bg-slate-100 dark:bg-white/10 text-slate-500 px-1.5 py-0.5 rounded">↑↓ to navigate</span>
                      <span className="text-[10px] bg-slate-100 dark:bg-white/10 text-slate-500 px-1.5 py-0.5 rounded">↵ to select</span>
                    </div>
                  </div>
                  
                  <div className="max-h-[60vh] overflow-y-auto p-2 custom-scrollbar">
                    {!searchQuery && searchResults.length === 0 ? (
                      <div className="p-4 text-center text-sm text-slate-500">
                        Type something to start searching...
                      </div>
                    ) : isSearching ? (
                      <div className="p-4 text-center text-sm text-slate-500">
                        Searching for "{searchQuery}"...
                      </div>
                    ) : (
                      <>
                        {searchResults.map((section, idx) => {
                          const startIndex = searchResults.slice(0, idx).reduce((acc, s) => acc + s.items.length, 0);
                          return (
                            <div key={idx} className="mb-2">
                              <div className="px-3 py-1.5 text-xs text-primary/80 font-bold uppercase tracking-wider">
                                {section.category}
                              </div>
                              {section.items.map((item, i) => {
                                const globalIndex = startIndex + i;
                                const isSelected = selectedIndex === globalIndex;
                                return (
                                  <button 
                                    key={i} 
                                    onMouseEnter={() => setSelectedIndex(globalIndex)}
                                    onClick={() => {
                                      if (item === 'Toggle Dark Mode') toggleTheme();
                                      setIsSearchOpen(false);
                                    }}
                                    className={`w-full text-left px-3 py-2.5 text-sm rounded-sm transition-colors flex items-center justify-between
                                      ${isSelected 
                                        ? 'bg-primary text-white shadow-md shadow-primary/20' 
                                        : 'text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-white/5 hover:text-slate-900 dark:hover:text-white'
                                      }`}
                                  >
                                    <span>{item}</span>
                                    {isSelected && <ArrowRight className="w-4 h-4 text-white/70" />}
                                  </button>
                                );
                              })}
                            </div>
                          )
                        })}
                      </>
                    )}
                  </div>
                </div>
              )}
            
          </div>
        </div>

        {/* Right Section */}
        <div className="flex items-center space-x-2 sm:space-x-4">
          


          <div className="relative" ref={notifRef}>
            <button 
              onClick={() => setIsNotificationsOpen(!isNotificationsOpen)}
              className={`p-2 relative rounded-sm  ${
                isNotificationsOpen 
                  ? 'bg-primary/10 text-primary dark:bg-white/10 dark:text-white' 
                  : 'text-slate-500 hover:text-primary hover:bg-primary/10 dark:text-slate-400 dark:hover:text-white dark:hover:bg-white/5'
              }`}
            >
              <Bell className="w-5 h-5" />
              <span className="absolute top-1.5 right-1.5 flex h-2.5 w-2.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-red-500 border-2 border-white dark:border-[#0F172A]"></span>
              </span>
            </button>

            
              {isNotificationsOpen && (
                <div
                  className="absolute right-0 mt-3 w-[calc(100vw-2rem)] sm:w-80 max-w-sm bg-white dark:bg-[#0F172A] rounded-sm border border-slate-200 dark:border-white/10 overflow-hidden transform origin-top-right z-50"
                >
                  <div className="flex items-center justify-between px-4 py-3 border-b border-slate-100 dark:border-white/5 bg-slate-50/50 dark:bg-white/[0.02]">
                    <h3 className="font-semibold text-slate-900 dark:text-white">Notifications</h3>
                    <span className="text-xs font-medium bg-primary/10 text-primary px-2 py-1 rounded-full">
                      3 New
                    </span>
                  </div>
                  
                  <div className="max-h-[calc(100vh-200px)] overflow-y-auto custom-scrollbar">
                    {mockNotifications.map((notif) => (
                      <div key={notif.id} className="flex gap-3 px-4 py-3 hover:bg-slate-50 dark:hover:bg-white/5 cursor-pointer border-b border-slate-50 dark:border-white/5 last:border-0">
                        <div className={`mt-1 flex-shrink-0 w-8 h-8 rounded-full ${notif.bg} flex items-center justify-center`}>
                          <notif.icon className={`w-4 h-4 ${notif.color}`} />
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center justify-between mb-0.5">
                            <p className="text-sm font-semibold text-slate-900 dark:text-white truncate">{notif.title}</p>
                            <span className="text-[10px] text-slate-500 dark:text-slate-400 whitespace-nowrap ml-2">{notif.time}</span>
                          </div>
                          <p className="text-xs text-slate-600 dark:text-slate-300 line-clamp-2">{notif.message}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                  
                  <div className="p-2 border-t border-slate-100 dark:border-white/5 bg-slate-50 dark:bg-white/[0.02]">
                    <button 
                      onClick={() => setIsNotificationsOpen(false)}
                      className="w-full text-center text-xs font-semibold text-primary hover:text-blue-700 dark:text-accent dark:hover:text-cyan-300 py-1.5"
                    >
                      View All Notifications
                    </button>
                  </div>
                </div>
              )}
            
          </div>

          <div className="flex items-center ml-2 pl-4 border-l border-slate-200 dark:border-white/10 relative" ref={profileRef}>
            <div 
              onClick={() => setIsProfileOpen(!isProfileOpen)}
              className="w-8 h-8 rounded-full bg-gradient- bg-primary p-[2px] cursor-pointer -primary/20"
            >
              <img 
                src="https://ui-avatars.com/api/?name=Alex+Johnson&background=111827&color=fff&rounded=true" 
                alt="User avatar" 
                className="w-full h-full rounded-full border-2 border-white dark:border-[#0F172A]"
              />
            </div>

            {isProfileOpen && (
              <div
                className="absolute right-0 top-full mt-3 w-56 bg-white dark:bg-[#0F172A] rounded-sm border border-slate-200 dark:border-white/10 overflow-hidden z-50"
              >
                <div className="p-3 border-b border-slate-100 dark:border-white/5 bg-slate-50/50 dark:bg-white/[0.02]">
                  <p className="font-semibold text-sm text-slate-900 dark:text-white">Alex Johnson</p>
                  <p className="text-xs text-slate-500 dark:text-slate-400 truncate">alex.j@university.edu</p>
                </div>
                
                <div className="p-1">
                  <button className="w-full flex items-center gap-2 px-3 py-2 text-sm text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-white/5 rounded-sm">
                    <User className="w-4 h-4 text-slate-400" />
                    My Profile
                  </button>
                  <button className="w-full flex items-center gap-2 px-3 py-2 text-sm text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-white/5 rounded-sm">
                    <Settings className="w-4 h-4 text-slate-400" />
                    Settings
                  </button>
                </div>
                
                <div className="p-1 border-t border-slate-100 dark:border-white/5">
                  <button className="w-full flex items-center gap-2 px-3 py-2 text-sm text-rose-600 dark:text-rose-400 hover:bg-rose-50 dark:hover:bg-rose-500/10 rounded-sm">
                    <LogOut className="w-4 h-4" />
                    Log Out
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default TopNavbar;
