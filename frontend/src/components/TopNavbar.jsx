import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { Bell, Search, Settings, LogOut, User, Menu, X, ArrowRight, Command } from 'lucide-react';
import useDashboardStore from '../store/useDashboardStore';
import { useAuth } from '../context/AuthContext';
import Avatar from './ui/Avatar';
import Badge from './ui/Badge';

const mockNotifications = [
  { id: 1, title: 'New Assignment Available', message: 'Calculus III Chapter 4 assignment has been published.', time: '10m ago' },
  { id: 2, title: 'Grade Updated', message: 'Physics Mid-term grade updated.', time: '1h ago' },
];

const mockSearchResults = [
  { category: 'Quick Actions', items: ['View Attendance', 'Browse Courses', 'AI Assistant'] },
  { category: 'Pages', items: ['Dashboard', 'Assignments', 'Courses', 'Settings'] }
];

const TopNavbar = () => {
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [selectedIndex, setSelectedIndex] = useState(0);

  const navigate = useNavigate();
  const { currentUser, logout, isGuest } = useAuth();
  
  const { themePreferences, setTheme, isMobileSidebarOpen, setMobileSidebarOpen, userProfile } = useDashboardStore();
  const isDark = themePreferences?.theme !== 'light';

  const notifRef = useRef(null);
  const searchRef = useRef(null);
  const searchInputRef = useRef(null);
  const profileRef = useRef(null);
  
  const flatItems = (searchResults || []).flatMap(s => s.items || []);

  useEffect(() => {
    if (!searchQuery) {
      setSearchResults([]);
      return;
    }
    const timer = setTimeout(() => {
      const query = searchQuery.toLowerCase();
      const results = mockSearchResults.map(section => ({
        category: section.category,
        items: section.items.filter(item => item.toLowerCase().includes(query))
      })).filter(section => section.items.length > 0);
      setSearchResults(results);
    }, 200);
    return () => clearTimeout(timer);
  }, [searchQuery]);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
        e.preventDefault();
        setIsSearchOpen(true);
      }
    };
    const handleClickOutside = (event) => {
      if (notifRef.current && !notifRef.current.contains(event.target)) setIsNotificationsOpen(false);
      if (searchRef.current && !searchRef.current.contains(event.target)) setIsSearchOpen(false);
      if (profileRef.current && !profileRef.current.contains(event.target)) setIsProfileOpen(false);
    };
    window.addEventListener('keydown', handleKeyDown);
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  useEffect(() => {
    if (isSearchOpen && searchInputRef.current) {
      setTimeout(() => searchInputRef.current.focus(), 50);
    }
  }, [isSearchOpen]);

  return (
    <header className="sticky top-0 z-40 w-full bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 text-slate-900 dark:text-slate-100">
      <div className="flex h-16 items-center justify-between px-4 sm:px-6">
        
        {/* Left Section / Mobile Menu / Search */}
        <div className="flex items-center gap-3 flex-1">
          <button
            onClick={() => setMobileSidebarOpen(!isMobileSidebarOpen)}
            className="lg:hidden p-2 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg transition-colors"
            title="Toggle Menu"
          >
            <Menu className="w-5 h-5" />
          </button>
          
          <div className="relative" ref={searchRef}>
            <div 
              onClick={() => setIsSearchOpen(true)}
              className="hidden sm:flex items-center w-64 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700/80 border border-slate-200 dark:border-slate-700 rounded-lg px-3 py-2 cursor-pointer transition-colors"
            >
              <Search className="w-4 h-4 text-slate-400" />
              <span className="ml-2 text-xs text-slate-500 dark:text-slate-400 flex-1">Search portal...</span>
              <div className="flex items-center gap-1 text-[10px] font-semibold text-slate-400 bg-white dark:bg-slate-900 px-1.5 py-0.5 rounded border border-slate-200 dark:border-slate-800">
                <Command className="w-3 h-3" />
                <span>K</span>
              </div>
            </div>

            <button 
              onClick={() => setIsSearchOpen(true)}
              className="sm:hidden p-2 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg"
            >
              <Search className="w-5 h-5" />
            </button>

            {/* Search Modal */}
            {isSearchOpen && (
              <div className="fixed inset-x-2 top-16 sm:absolute sm:top-0 sm:left-0 sm:w-[480px] bg-white dark:bg-slate-900 shadow-lg border border-slate-200 dark:border-slate-800 rounded-xl overflow-hidden z-50 animate-fade-in">
                <div className="p-3 border-b border-slate-200 dark:border-slate-800 flex items-center gap-2">
                  <Search className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                  <input 
                    ref={searchInputRef}
                    type="text" 
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search courses, pages, or tools..." 
                    className="flex-1 bg-transparent border-none outline-none text-slate-900 dark:text-white text-xs"
                  />
                  <button onClick={() => setIsSearchOpen(false)} className="p-1 text-slate-400 hover:text-slate-700">
                    <X className="w-4 h-4" />
                  </button>
                </div>
                
                <div className="max-h-72 overflow-y-auto p-2 custom-scrollbar">
                  {searchResults.map((section, idx) => (
                    <div key={idx} className="mb-3">
                      <div className="px-3 py-1 text-[10px] text-blue-600 dark:text-blue-400 font-bold uppercase tracking-wider">
                        {section.category}
                      </div>
                      {section.items.map((item, i) => (
                        <button 
                          key={i} 
                          onClick={() => {
                            if (item === 'Dashboard') navigate('/dashboard');
                            if (item === 'Assignments') navigate('/assignments');
                            if (item === 'Courses') navigate('/courses');

                            if (item === 'Settings') navigate('/settings');
                            setIsSearchOpen(false);
                          }}
                          className="w-full text-left px-3 py-2 text-xs rounded-lg text-slate-700 dark:text-slate-300 hover:bg-blue-50 dark:hover:bg-blue-950/40 hover:text-blue-600 dark:hover:text-blue-400 flex items-center justify-between transition-colors"
                        >
                          <span>{item}</span>
                          <ArrowRight className="w-3.5 h-3.5 opacity-60" />
                        </button>
                      ))}
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Right Section / Notifications / Profile */}
        <div className="flex items-center gap-3">
          
          {/* Notifications */}
          <div className="relative" ref={notifRef}>
            <button 
              onClick={() => setIsNotificationsOpen(!isNotificationsOpen)}
              className="p-2 rounded-lg border border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors relative"
            >
              <Bell className="w-5 h-5" />
              <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-blue-600" />
            </button>

            {isNotificationsOpen && (
              <div className="absolute right-0 mt-2 w-80 bg-white dark:bg-slate-900 rounded-xl shadow-lg border border-slate-200 dark:border-slate-800 overflow-hidden z-50 animate-fade-in">
                <div className="flex items-center justify-between px-4 py-3 border-b border-slate-100 dark:border-slate-800">
                  <h3 className="font-bold text-xs text-slate-900 dark:text-white">Notifications</h3>
                  <Badge variant="blue">2 New</Badge>
                </div>
                
                <div className="max-h-64 overflow-y-auto divide-y divide-slate-100 dark:divide-slate-800">
                  {mockNotifications.map((notif) => (
                    <div key={notif.id} className="p-3 hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors">
                      <div className="flex items-center justify-between">
                        <p className="text-xs font-semibold text-slate-900 dark:text-white">{notif.title}</p>
                        <span className="text-[10px] text-slate-400">{notif.time}</span>
                      </div>
                      <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">{notif.message}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Profile Dropdown */}
          <div className="relative" ref={profileRef}>
            <button 
              onClick={() => setIsProfileOpen(!isProfileOpen)}
              className="flex items-center gap-2 p-1 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
            >
              <Avatar name={currentUser?.displayName || (isGuest ? 'Guest Visitor' : 'Alex Johnson')} size="sm" />
            </button>

            {isProfileOpen && (
              <div className="absolute right-0 mt-2 w-56 bg-white dark:bg-slate-900 rounded-xl shadow-lg border border-slate-200 dark:border-slate-800 overflow-hidden z-50 animate-fade-in">
                <div className="p-3 border-b border-slate-100 dark:border-slate-800">
                  <p className="font-bold text-xs text-slate-900 dark:text-white">
                    {currentUser?.displayName || (isGuest ? 'Guest Visitor' : 'Alex Johnson')}
                  </p>
                  <p className="text-[11px] text-slate-500 dark:text-slate-400 truncate">
                    {currentUser?.email || (isGuest ? 'guest@studenthub.edu' : 'alex@university.edu')}
                  </p>
                </div>
                
                <div className="p-1 space-y-0.5">
                  <button 
                    onClick={() => { setIsProfileOpen(false); navigate('/profile'); }}
                    className="w-full flex items-center gap-2 px-3 py-2 text-xs font-medium text-slate-700 dark:text-slate-300 hover:bg-blue-50 dark:hover:bg-blue-950/40 hover:text-blue-600 dark:hover:text-blue-400 rounded-lg transition-colors"
                  >
                    <User className="w-4 h-4" />
                    <span>My Profile</span>
                  </button>
                  <button 
                    onClick={() => { setIsProfileOpen(false); navigate('/settings'); }}
                    className="w-full flex items-center gap-2 px-3 py-2 text-xs font-medium text-slate-700 dark:text-slate-300 hover:bg-blue-50 dark:hover:bg-blue-950/40 hover:text-blue-600 dark:hover:text-blue-400 rounded-lg transition-colors"
                  >
                    <Settings className="w-4 h-4" />
                    <span>Settings</span>
                  </button>
                  <button 
                    onClick={async () => { setIsProfileOpen(false); await logout(); navigate('/login'); }}
                    className="w-full flex items-center gap-2 px-3 py-2 text-xs font-medium text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg transition-colors"
                  >
                    <LogOut className="w-4 h-4" />
                    <span>Log Out</span>
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
