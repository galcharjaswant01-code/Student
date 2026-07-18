import React, { useState, useEffect } from 'react';
import { FileText, Image, FileCode, Search, Sparkles, X, Download, UserCircle, Bell, Shield, Hash, ChevronRight } from 'lucide-react';
import { messagesApi } from '../../services/mockDjangoMessagesApi';


const ChatDetailsPanel = ({ activeChat, onClose }) => {
  const [files, setFiles] = useState([]);
  const [insights, setInsights] = useState(null);

  useEffect(() => {
    if (activeChat) {
      messagesApi.getSharedFiles(activeChat.id).then(setFiles);
      messagesApi.getAIInsights(activeChat.id).then(setInsights);
    }
  }, [activeChat]);

  if (!activeChat) return null;

  const getFileIcon = (type) => {
    switch(type) {
      case 'pdf': return <FileText className="w-5 h-5 text-rose-500" />;
      case 'image': return <Image className="w-5 h-5 text-indigo-500" />;
      case 'docx': return <FileCode className="w-5 h-5 text-blue-500" />;
      default: return <FileText className="w-5 h-5 text-slate-500" />;
    }
  };

  return (
    <div className="w-80 border-l border-slate-200 dark:border-white/10 bg-white/50 dark:bg-slate-900/50 h-full flex flex-col shrink-0">
      
      {/* Header */}
      <div className="h-[72px] flex items-center justify-between px-4 border-b border-slate-200 dark:border-white/10 shrink-0">
        <h3 className="font-bold text-slate-900 dark:text-white">Chat Details</h3>
        <button 
          onClick={onClose}
          className="p-2 rounded-sm text-slate-500 hover:bg-slate-200 dark:hover:bg-slate-800"
        >
          <X className="w-5 h-5" />
        </button>
      </div>

      <div className="flex-1 overflow-y-auto custom-scrollbar p-5 space-y-8">
        
        {/* Profile Info */}
        <div className="flex flex-col items-center text-center">
          <div className="w-24 h-24 rounded-full overflow-hidden border-4 border-white dark:border-slate-800 mb-4 relative">
            {activeChat.avatar ? (
              <img src={activeChat.avatar} alt={activeChat.name} className="w-full h-full object-cover" />
            ) : (
              <div className="w-full h-full bg-gradient- bg-indigo-500 flex items-center justify-center text-white text-3xl font-black">
                {activeChat.name.charAt(0)}
              </div>
            )}
            {activeChat.online && (
              <div className="absolute bottom-1 right-1 w-4 h-4 bg-emerald-500 border-2 border-white dark:border-slate-800 rounded-full" />
            )}
          </div>
          <h2 className="text-xl font-bold text-slate-900 dark:text-white">{activeChat.name}</h2>
          <p className="text-sm font-medium text-slate-500 mb-2">{activeChat.role}</p>
          <p className="text-xs text-slate-400">{activeChat.statusText}</p>
        </div>

        {/* Quick Actions */}
        <div className="flex justify-center gap-3">
          <button className="flex flex-col items-center gap-1 p-3 rounded-sm hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-600 dark:text-slate-300 w-20">
            <UserCircle className="w-6 h-6" />
            <span className="text-[10px] font-bold uppercase">Profile</span>
          </button>
          <button className="flex flex-col items-center gap-1 p-3 rounded-sm hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-600 dark:text-slate-300 w-20">
            <Search className="w-6 h-6" />
            <span className="text-[10px] font-bold uppercase">Search</span>
          </button>
          <button className="flex flex-col items-center gap-1 p-3 rounded-sm hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-600 dark:text-slate-300 w-20">
            <Bell className="w-6 h-6" />
            <span className="text-[10px] font-bold uppercase">Mute</span>
          </button>
        </div>

        {/* AI Insights */}
        {insights && (
          <div className="bg-gradient- bg-indigo-900 rounded-sm p-4 text-white relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -mr-10 -mt-10 pointer-events-none group-hover:bg-white/20" />
            
            <h4 className="text-xs font-bold uppercase tracking-wider flex items-center gap-1.5 mb-2 opacity-90">
              <Sparkles className="w-3.5 h-3.5 text-yellow-400" /> AI Summary
            </h4>
            <p className="text-sm leading-relaxed font-medium mb-3">
              {insights.summary}
            </p>
            
            <div className="space-y-1.5">
              <p className="text-[10px] uppercase font-bold text-white/50 mb-1">Smart Replies</p>
              {insights.smartReplies.map((reply, i) => (
                <button key={i} className="w-full text-left p-2 rounded-sm bg-white/10 hover:bg-white/20 border border-white/5 text-xs line-clamp-1">
                  {reply}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Shared Files */}
        <div>
          <h4 className="text-sm font-bold text-slate-900 dark:text-white mb-3 flex items-center justify-between">
            Shared Media & Docs
            <span className="text-xs font-medium text-indigo-500 cursor-pointer hover:underline">View All</span>
          </h4>
          
          <div className="space-y-2">
            {files.map(file => (
              <div key={file.id} className="flex items-center gap-3 p-2 rounded-sm hover:bg-slate-100 dark:hover:bg-slate-800 group">
                <div className="w-10 h-10 rounded-sm bg-slate-100 dark:bg-slate-800 flex items-center justify-center shrink-0">
                  {getFileIcon(file.type)}
                </div>
                <div className="flex-1 min-w-0">
                  <h5 className="text-sm font-bold text-slate-900 dark:text-white truncate">{file.name}</h5>
                  <p className="text-[10px] text-slate-500 font-medium">{file.size} • {file.date}</p>
                </div>
                <button className="p-2 text-slate-400 hover:text-indigo-500 opacity-0 group-hover:opacity-100 shrink-0">
                  <Download className="w-4 h-4" />
                </button>
              </div>
            ))}
            
            {files.length === 0 && (
              <p className="text-xs text-slate-500 text-center py-4">No files shared yet.</p>
            )}
          </div>
        </div>

      </div>
    </div>
  );
};

export default ChatDetailsPanel;
