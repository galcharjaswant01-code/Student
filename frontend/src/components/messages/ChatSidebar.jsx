import React, { useState } from 'react';
import { Search, Plus, Hash, UserCircle, Pin } from 'lucide-react';


const ChatSidebar = ({ conversations, activeChatId, setActiveChatId }) => {
  const [searchTerm, setSearchTerm] = useState('');

  const renderConversation = (chat, isPinned = false) => {
    const isActive = activeChatId === chat.id;
    
    return (
      <div
        key={chat.id}
        onClick={() => setActiveChatId(chat.id)}
        className={`flex items-center gap-3 p-3 rounded-sm cursor-pointer   border ${
          isActive 
            ? 'bg-indigo-50 dark:bg-indigo-500/10 border-indigo-500/30  -indigo-500/5' 
            : 'bg-transparent border-transparent hover:bg-white/50 dark:hover:bg-slate-800/50 hover:border-slate-200 dark:hover:border-white/5'
        }`}
      >
        <div className="relative shrink-0">
          {chat.type === 'direct' ? (
            chat.avatar ? (
              <img src={chat.avatar} alt={chat.name} className="w-12 h-12 rounded-sm object-cover" />
            ) : (
              <UserCircle className="w-12 h-12 text-slate-400" />
            )
          ) : (
            <div className={`w-12 h-12 rounded-sm flex items-center justify-center  ${
              isActive ? 'bg-indigo-500 text-white' : 'bg-slate-100 dark:bg-slate-800 text-slate-500'
            }`}>
              <Hash className="w-6 h-6" />
            </div>
          )}
          
          {chat.online && chat.type === 'direct' && (
            <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-emerald-500 border-2 border-white dark:border-slate-900 rounded-full"></div>
          )}
        </div>

        <div className="flex-1 min-w-0">
          <div className="flex justify-between items-center mb-1">
            <h4 className={`font-bold text-sm truncate ${isActive ? 'text-indigo-900 dark:text-indigo-100' : 'text-slate-900 dark:text-white'}`}>
              {chat.name}
            </h4>
            <span className={`text-[10px] font-bold shrink-0 ml-2 ${chat.unread > 0 ? 'text-indigo-500' : 'text-slate-400'}`}>
              {chat.timestamp}
            </span>
          </div>
          <div className="flex items-center gap-1">
            {isPinned && <Pin className="w-3 h-3 text-slate-400 fill-current shrink-0 transform -rotate-45" />}
            <p className={`text-xs truncate ${isActive ? 'text-indigo-600 dark:text-indigo-300 font-medium' : 'text-slate-500 dark:text-slate-400'}`}>
              {chat.lastMessage}
            </p>
          </div>
        </div>

        {chat.unread > 0 && (
          <div className="w-5 h-5 shrink-0 bg-indigo-600 text-white text-[10px] font-bold flex items-center justify-center rounded-full -indigo-500/30">
            {chat.unread > 9 ? '9+' : chat.unread}
          </div>
        )}
      </div>
    );
  };

  const filteredConversations = conversations.filter(c => c.name.toLowerCase().includes(searchTerm.toLowerCase()));
  const pinned = filteredConversations.filter(c => c.unread > 0 || c.id === 'd1'); // mock logic for pinned/priority
  const groups = filteredConversations.filter(c => c.type === 'group' && !pinned.includes(c));
  const directs = filteredConversations.filter(c => c.type === 'direct' && !pinned.includes(c));

  return (
    <div className="w-full h-full flex flex-col bg-slate-50/50 dark:bg-slate-900/50">
      
      {/* Sidebar Header */}
      <div className="h-[72px] px-6 flex items-center justify-between shrink-0 border-b border-slate-200/50 dark:border-white/10">
        <h2 className="text-2xl font-black text-slate-900 dark:text-white tracking-tight">Chats</h2>
        <button className="p-2 text-indigo-600 bg-indigo-50 hover:bg-indigo-100 dark:text-indigo-400 dark:bg-indigo-500/10 dark:hover:bg-indigo-500/20 rounded-sm">
          <Plus className="w-5 h-5" />
        </button>
      </div>

      {/* Search */}
      <div className="p-4 shrink-0">
        <div className="relative group">
          <Search className="w-4 h-4 absolute left-3.5 top-1/2 transform -translate-y-1/2 text-slate-400 group-focus-within:text-indigo-500" />
          <input 
            id="chat-search-input"
            type="text" 
            placeholder="Search conversations..." 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 bg-white dark:bg-slate-800 border border-slate-200 dark:border-white/10 rounded-sm text-sm font-medium focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 text-slate-900 dark:text-slate-100"
          />
        </div>
      </div>

      {/* Lists */}
      <div className="flex-1 overflow-y-auto px-3 pb-4 custom-scrollbar">
        
          {/* Pinned / Priority Section */}
          {pinned.length > 0 && (
            <div className="mb-6">
              <h3 className="px-3 text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2 flex items-center gap-1">
                <Pin className="w-3 h-3 transform -rotate-45" /> Pinned & Unread
              </h3>
              <div className="flex flex-col gap-1">
                {pinned.map(c => renderConversation(c, true))}
              </div>
            </div>
          )}

          {/* Groups Section */}
          {groups.length > 0 && (
            <div className="mb-6">
              <h3 className="px-3 text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2">Study Groups</h3>
              <div className="flex flex-col gap-1">
                {groups.map(c => renderConversation(c))}
              </div>
            </div>
          )}

          {/* Direct Messages Section */}
          {directs.length > 0 && (
            <div>
              <h3 className="px-3 text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2">Direct Messages</h3>
              <div className="flex flex-col gap-1">
                {directs.map(c => renderConversation(c))}
              </div>
            </div>
          )}
        
      </div>
    </div>
  );
};

export default ChatSidebar;
