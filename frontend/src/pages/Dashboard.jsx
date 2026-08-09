import React from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { 
  TrendingUp, BookOpen, Clock, Calendar as CalendarIcon, CheckCircle, 
  ArrowRight, MessageSquare, ClipboardList, FolderOpen, User, Plus, Compass, Bot, Sparkles
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import Card from '../components/ui/Card';
import Button from '../components/ui/Button';
import Badge from '../components/ui/Badge';
import Avatar from '../components/ui/Avatar';

const Dashboard = () => {
  const navigate = useNavigate();
  const { currentUser, isGuest } = useAuth();

  const userName = currentUser?.displayName || (isGuest ? 'Guest Visitor' : 'Alex Johnson');

  const stats = [
    { title: 'Attendance Rate', value: '95%', subtitle: 'Verified biometric & QR tracking', icon: CheckCircle },
    { title: 'Enrolled Courses', value: '5 Courses', subtitle: 'Computer Science & AI Major', icon: BookOpen },
    { title: 'Pending Assignments', value: '3 Due Soon', subtitle: 'Calculus III, Data Structures', icon: ClipboardList },
    { title: 'Study Hours', value: '28.5 Hours', subtitle: 'This week active learning', icon: Clock },
  ];

  const upcomingClasses = [
    { time: '09:00 AM', title: 'Calculus III Lecture', room: 'Hall 302 • Dr. Sarah Jenkins' },
    { time: '11:30 AM', title: 'Data Structures Lab', room: 'Computer Lab 4 • Prof. Michael' },
    { time: '02:00 PM', title: 'Artificial Intelligence Seminar', room: 'Auditorium B • Dr. Robert' },
  ];

  const assignmentDeadlines = [
    { title: 'Calculus III - Assignment 4', course: 'Math 301', due: 'Tomorrow, 11:59 PM' },
    { title: 'Binary Trees Code Lab', course: 'CS 202', due: 'Friday, 5:00 PM' },
    { title: 'Neural Networks Essay', course: 'AI 401', due: 'Next Monday' },
  ];

  const recentResources = [
    { title: 'Calculus III Chapter 4 Notes.pdf', size: '2.4 MB', type: 'Lecture Notes' },
    { title: 'Data Structures Lab Guide 3.pdf', size: '1.8 MB', type: 'Lab Guide' },
    { title: 'AI Ethics Case Study.pdf', size: '3.1 MB', type: 'Reading Material' },
  ];

  const recentMessages = [
    { sender: 'Dr. Sarah Jenkins', text: 'Solution sheet for Chapter 4 has been uploaded.', time: '10m ago' },
    { sender: 'Physics Study Group', text: 'Meeting in campus library at 3 PM today.', time: '1h ago' },
  ];

  return (
    <div className="p-4 sm:p-6 w-full space-y-6 max-w-7xl mx-auto">
      
      {/* Welcome Banner */}
      <div className="bg-slate-900 border border-slate-800 rounded-xl p-6 text-white flex flex-col md:flex-row items-start md:items-center justify-between gap-6 shadow-xs">
        <div className="space-y-1.5 max-w-2xl">
          <div className="flex items-center gap-2 mb-1">
            <Badge variant="blue">{isGuest ? 'Guest Visitor Mode' : 'Academic Portal'}</Badge>
            <span className="text-xs text-blue-400 font-semibold flex items-center gap-1">
              <Sparkles className="w-3.5 h-3.5" /> AI Academic Assistant Active
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-white">
            Welcome back, <span className="text-blue-400">{userName}!</span>
          </h1>
          <p className="text-xs sm:text-sm text-slate-300 font-normal leading-relaxed">
            Here is your daily academic overview, upcoming classes, deadlines, and AI study tools.
          </p>
        </div>

        {/* Banner Action Buttons - Explicit high-contrast white & blue styling */}
        <div className="flex items-center gap-3 w-full md:w-auto shrink-0">
          <button
            onClick={() => navigate('/courses')}
            className="px-4 py-2 text-xs sm:text-sm font-semibold rounded-lg border border-slate-700 bg-slate-800 text-white hover:bg-slate-700 transition-colors flex items-center gap-2 cursor-pointer"
          >
            <BookOpen className="w-4 h-4 text-blue-400" />
            <span>My Courses</span>
          </button>

          <button
            onClick={() => navigate('/ai-studio')}
            className="px-4 py-2 text-xs sm:text-sm font-bold rounded-lg border border-blue-500 bg-blue-600/20 text-blue-400 hover:bg-blue-600 hover:text-white transition-colors flex items-center gap-2 cursor-pointer"
          >
            <Bot className="w-4 h-4" />
            <span>Open AI Studio</span>
          </button>
        </div>
      </div>

      {/* AI Assistant Spotlight Card */}
      <div className="p-4 rounded-xl border border-blue-600/30 bg-blue-50/40 dark:bg-blue-950/20 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="p-2.5 rounded-lg border border-blue-600 text-blue-600 dark:text-blue-400 bg-transparent shrink-0">
            <Bot className="w-5 h-5" />
          </div>
          <div>
            <h4 className="text-sm font-bold text-slate-900 dark:text-white">AI Study Assistant & Tutoring Suite</h4>
            <p className="text-xs text-slate-600 dark:text-slate-400 mt-0.5">Generate practice quizzes, summarize lecture PDFs, and debug code assignments.</p>
          </div>
        </div>
        
        <Button variant="primary" size="sm" icon={ArrowRight} onClick={() => navigate('/ai-studio')} className="shrink-0">
          Launch AI Studio
        </Button>
      </div>

      {/* 4 Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat, idx) => (
          <Card key={idx} className="p-4">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold text-slate-500 dark:text-slate-400">{stat.title}</span>
              <stat.icon className="w-4 h-4 text-blue-600 dark:text-blue-400" />
            </div>
            <div className="text-xl font-bold text-slate-900 dark:text-white mt-2">{stat.value}</div>
            <p className="text-[11px] text-slate-400 dark:text-slate-500 mt-1">{stat.subtitle}</p>
          </Card>
        ))}
      </div>

      {/* Main Grid Section */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Left Column (8 cols): Attendance & Assignments */}
        <div className="lg:col-span-8 space-y-6">
          
          {/* Attendance & Class Overview */}
          <Card title="Today's Schedule & Attendance" subtitle="Classes scheduled for today">
            <div className="space-y-3">
              {upcomingClasses.map((cls, idx) => (
                <div key={idx} className="flex items-center justify-between p-3 rounded-lg border border-slate-100 dark:border-slate-800 hover:bg-blue-50/50 dark:hover:bg-blue-950/20 transition-colors">
                  <div className="flex items-center gap-3">
                    <div className="px-2.5 py-1 rounded-md bg-blue-50 dark:bg-blue-950/40 text-blue-600 dark:text-blue-400 font-bold text-xs border border-blue-200 dark:border-blue-800">
                      {cls.time}
                    </div>
                    <div>
                      <h4 className="text-xs font-bold text-slate-900 dark:text-white">{cls.title}</h4>
                      <p className="text-[11px] text-slate-500 dark:text-slate-400">{cls.room}</p>
                    </div>
                  </div>
                  <Badge variant="outline">Scheduled</Badge>
                </div>
              ))}
            </div>
          </Card>

          {/* Pending Assignment Deadlines */}
          <Card title="Assignment Deadlines" subtitle="Upcoming academic submissions">
            <div className="space-y-3">
              {assignmentDeadlines.map((item, idx) => (
                <div key={idx} className="flex items-center justify-between p-3 rounded-lg border border-slate-100 dark:border-slate-800">
                  <div className="flex items-center gap-3">
                    <ClipboardList className="w-4 h-4 text-blue-600 dark:text-blue-400 shrink-0" />
                    <div>
                      <h4 className="text-xs font-bold text-slate-900 dark:text-white">{item.title}</h4>
                      <p className="text-[11px] text-slate-500 dark:text-slate-400">{item.course}</p>
                    </div>
                  </div>
                  <span className="text-xs font-semibold text-slate-700 dark:text-slate-300">{item.due}</span>
                </div>
              ))}
            </div>
          </Card>

        </div>

        {/* Right Column (4 cols): Quick Actions, Resources, Messages */}
        <div className="lg:col-span-4 space-y-6">
          
          {/* Quick Actions */}
          <Card title="Quick Actions">
            <div className="grid grid-cols-2 gap-2">
              <Button variant="secondary" size="sm" icon={BookOpen} onClick={() => navigate('/courses')}>
                Courses
              </Button>
              <Button variant="secondary" size="sm" icon={FolderOpen} onClick={() => navigate('/resources')}>
                Resources
              </Button>
              <Button variant="secondary" size="sm" icon={Bot} onClick={() => navigate('/ai-studio')}>
                AI Studio
              </Button>
              <Button variant="secondary" size="sm" icon={MessageSquare} onClick={() => navigate('/messages')}>
                Messages
              </Button>
            </div>
          </Card>

          {/* Recent Resources */}
          <Card title="Recent Resources" subtitle="Latest uploaded study notes">
            <div className="space-y-3">
              {recentResources.map((res, idx) => (
                <div key={idx} className="flex items-center justify-between p-2.5 rounded-lg border border-slate-100 dark:border-slate-800 text-xs">
                  <div className="flex items-center gap-2.5 truncate">
                    <FolderOpen className="w-4 h-4 text-blue-600 dark:text-blue-400 shrink-0" />
                    <span className="font-semibold text-slate-900 dark:text-white truncate">{res.title}</span>
                  </div>
                  <span className="text-[10px] text-slate-400 shrink-0">{res.size}</span>
                </div>
              ))}
            </div>
          </Card>

          {/* Messages */}
          <Card title="Recent Messages">
            <div className="space-y-3">
              {recentMessages.map((msg, idx) => (
                <div key={idx} className="p-2.5 rounded-lg border border-slate-100 dark:border-slate-800 space-y-1 text-xs">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-slate-900 dark:text-white">{msg.sender}</span>
                    <span className="text-[10px] text-slate-400">{msg.time}</span>
                  </div>
                  <p className="text-slate-500 dark:text-slate-400 text-[11px] truncate">{msg.text}</p>
                </div>
              ))}
            </div>
          </Card>

        </div>

      </div>
    </div>
  );
};

export default Dashboard;
