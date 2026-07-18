import React, { useEffect, useState } from 'react';

import { MessageSquare, Users, FileText, Sparkles, Send, BellRing, PhoneCall, Video } from 'lucide-react';
import { messagesApi } from '../../services/mockDjangoMessagesApi';

const MessagesDashboard = ({ onStartChat }) => {
  const [metrics, setMetrics] = useState(null);

  useEffect(() => {
    messagesApi.getDashboardMetrics().then(setMetrics);
  }, []);

  if (!metrics) {
    return <div className="w-full h-full bg-slate-100/50 dark:bg-slate-900/50 animate-pulse" />;
  }

  return (
    <div className="w-full h-full overflow-y-auto custom-scrollbar p-6 bg-slate-50 dark:bg-slate-900">
      
      <div className="flex flex-col items-center justify-center py-12 text-center">
        <div className="w-20 h-20 bg-indigo-100 dark:bg-indigo-500/20 rounded-sm flex items-center justify-center text-indigo-600 dark:text-indigo-400 mb-6 -indigo-500/10">
          <MessageSquare className="w-10 h-10" />
        </div>
        <h2 className="text-3xl font-extrabold text-slate-900 dark:text-white mb-2">Welcome to Messages</h2>
        <p className="text-slate-500 dark:text-slate-400 max-w-md mx-auto">
          Connect with teachers and students instantly. Share files, collaborate on projects, and stay updated with your academic groups.
        </p>
        
        <button 
          onClick={onStartChat}
          className="mt-8 px-6 py-3 bg-indigo-600 hover:bg-indigo-700 text-white font-bold rounded-sm -indigo-600/30 flex items-center gap-2"
        >
          <Send className="w-5 h-5" /> Start New Conversation
        </button>
      </div>

      {/* Metrics Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 max-w-5xl mx-auto">
        <MetricCard 
          icon={<BellRing className="w-6 h-6 text-amber-500" />}
          title="Unread Messages"
          value={metrics.unreadMessages}
          bg="bg-amber-50 dark:bg-amber-500/10"
        />
        <MetricCard 
          icon={<Users className="w-6 h-6 text-emerald-500" />}
          title="Online Teachers"
          value={metrics.onlineTeachers}
          bg="bg-emerald-50 dark:bg-emerald-500/10"
        />
        <MetricCard 
          icon={<MessageSquare className="w-6 h-6 text-blue-500" />}
          title="Total Conversations"
          value={metrics.totalConversations}
          bg="bg-blue-50 dark:bg-blue-500/10"
        />
        <MetricCard 
          icon={<FileText className="w-6 h-6 text-purple-500" />}
          title="Shared Files"
          value={metrics.recentFiles}
          bg="bg-purple-50 dark:bg-purple-500/10"
        />
      </div>

      {/* Quick Actions */}
      <div className="mt-12 max-w-5xl mx-auto">
        <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-4 flex items-center gap-2">
          <Sparkles className="w-5 h-5 text-indigo-500" /> Quick Actions
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <ActionCard icon={<Users />} title="Create Study Group" desc="Start a new group chat for your subjects" />
          <ActionCard icon={<PhoneCall />} title="Schedule Call" desc="Request a 1-on-1 session with a teacher" />
          <ActionCard icon={<Video />} title="Join Lecture Chat" desc="Connect to live class discussions" />
        </div>
      </div>
      
    </div>
  );
};

const MetricCard = ({ icon, title, value, bg }) => (
  <div className="bg-white/70 dark:bg-slate-800/70 border border-slate-200/50 dark:border-white/5 p-5 rounded-sm">
    <div className={`w-12 h-12 rounded-sm flex items-center justify-center mb-4 ${bg}`}>
      {icon}
    </div>
    <div className="text-3xl font-black text-slate-900 dark:text-white mb-1">{value}</div>
    <div className="text-sm font-medium text-slate-500">{title}</div>
  </div>
);

const ActionCard = ({ icon, title, desc }) => (
  <div className="bg-white/70 dark:bg-slate-800/70 border border-slate-200/50 dark:border-white/5 p-5 rounded-sm cursor-pointer hover:border-indigo-500/50 hover: group">
    <div className="w-10 h-10 bg-slate-100 dark:bg-slate-700 rounded-sm flex items-center justify-center text-slate-500 dark:text-slate-400 group-hover:text-indigo-500 group-hover:bg-indigo-50 dark:group-hover:bg-indigo-500/20 mb-3">
      {icon}
    </div>
    <h4 className="font-bold text-slate-900 dark:text-white mb-1 group-hover:text-indigo-500">{title}</h4>
    <p className="text-xs text-slate-500">{desc}</p>
  </div>
);

export default MessagesDashboard;
