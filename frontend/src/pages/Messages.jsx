import React, { useState } from 'react';
import Card from '../components/ui/Card';
import Button from '../components/ui/Button';
import Input from '../components/ui/Input';
import Avatar from '../components/ui/Avatar';
import Badge from '../components/ui/Badge';
import { Search, Send, Paperclip, Phone, Video, MoreVertical, MessageSquare } from 'lucide-react';

const mockConversations = [
  { id: 1, name: 'Dr. Sarah Jenkins', role: 'Calculus III Professor', lastMsg: 'Please review the solution sheet for Chapter 4.', time: '10:42 AM', unread: 2 },
  { id: 2, name: 'Physics Study Group', role: 'Group Chat (4 members)', lastMsg: 'Meeting in campus library at 3 PM today.', time: 'Yesterday', unread: 0 },
  { id: 3, name: 'Prof. Michael Robert', role: 'Computer Science HOD', lastMsg: 'Your lab report has been received.', time: 'Aug 7', unread: 0 },
];

const mockChatHistory = [
  { id: 1, sender: 'them', text: 'Hello Alex! Did you get a chance to solve practice set #4?', time: '10:30 AM' },
  { id: 2, sender: 'me', text: 'Yes Dr. Jenkins, I completed questions 1 through 8. Had a small query on Q9.', time: '10:35 AM' },
  { id: 3, sender: 'them', text: 'Please review the solution sheet for Chapter 4.', time: '10:42 AM' },
];

const Messages = () => {
  const [activeConv, setActiveConv] = useState(mockConversations[0]);
  const [messages, setMessages] = useState(mockChatHistory);
  const [inputText, setInputText] = useState('');
  const [searchQuery, setSearchQuery] = useState('');

  const handleSend = (e) => {
    e.preventDefault();
    if (!inputText.trim()) return;

    setMessages(prev => [
      ...prev,
      { id: Date.now(), sender: 'me', text: inputText, time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) }
    ]);
    setInputText('');
  };

  return (
    <div className="p-4 sm:p-6 w-full h-[calc(100vh-4rem)] flex flex-col space-y-4">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-slate-900 dark:text-white tracking-tight">Academic Messages</h1>
        <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">Communicate with faculty, professors, and study groups.</p>
      </div>

      {/* Main Chat Grid */}
      <div className="flex-1 grid grid-cols-1 lg:grid-cols-12 border border-slate-200 dark:border-slate-800 rounded-xl bg-white dark:bg-slate-900 overflow-hidden shadow-xs">
        
        {/* Left: Conversation List */}
        <div className="lg:col-span-4 border-r border-slate-200 dark:border-slate-800 flex flex-col bg-white dark:bg-slate-900">
          <div className="p-3 border-b border-slate-200 dark:border-slate-800">
            <Input 
              icon={Search} 
              placeholder="Search conversations..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>

          <div className="flex-1 overflow-y-auto custom-scrollbar divide-y divide-slate-100 dark:divide-slate-800">
            {mockConversations.map((conv) => (
              <button
                key={conv.id}
                onClick={() => setActiveConv(conv)}
                className={`w-full p-4 text-left flex items-start gap-3 transition-colors ${activeConv.id === conv.id ? 'bg-blue-50 dark:bg-blue-950/40 border-l-4 border-blue-600 dark:border-blue-500' : 'hover:bg-slate-50 dark:hover:bg-slate-800/50'}`}
              >
                <Avatar name={conv.name} size="md" />
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between">
                    <p className="text-xs font-bold text-slate-900 dark:text-white truncate">{conv.name}</p>
                    <span className="text-[10px] text-slate-400">{conv.time}</span>
                  </div>
                  <p className="text-[11px] text-slate-500 dark:text-slate-400 truncate mt-0.5">{conv.lastMsg}</p>
                </div>
                {conv.unread > 0 && (
                  <Badge variant="blue" className="shrink-0">{conv.unread}</Badge>
                )}
              </button>
            ))}
          </div>
        </div>

        {/* Right: Active Chat Window */}
        <div className="lg:col-span-8 flex flex-col bg-white dark:bg-slate-950">
          {/* Top Bar */}
          <div className="p-4 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between bg-white dark:bg-slate-900">
            <div className="flex items-center gap-3">
              <Avatar name={activeConv.name} size="md" />
              <div>
                <h3 className="text-xs font-bold text-slate-900 dark:text-white">{activeConv.name}</h3>
                <p className="text-[10px] text-slate-500 dark:text-slate-400">{activeConv.role}</p>
              </div>
            </div>

            <div className="flex items-center gap-2 text-slate-500">
              <button className="p-2 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg text-slate-600 dark:text-slate-300">
                <Phone className="w-4 h-4" />
              </button>
              <button className="p-2 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg text-slate-600 dark:text-slate-300">
                <Video className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Messages Feed */}
          <div className="flex-1 p-4 overflow-y-auto custom-scrollbar space-y-3 bg-slate-50/50 dark:bg-slate-950">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex flex-col ${msg.sender === 'me' ? 'items-end' : 'items-start'}`}
              >
                <div
                  className={`max-w-md px-4 py-2.5 rounded-xl text-xs leading-relaxed ${
                    msg.sender === 'me'
                      ? 'bg-blue-600 text-white rounded-br-none'
                      : 'bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-100 border border-slate-200 dark:border-slate-800 rounded-bl-none shadow-xs'
                  }`}
                >
                  {msg.text}
                </div>
                <span className="text-[10px] text-slate-400 mt-1 px-1">{msg.time}</span>
              </div>
            ))}
          </div>

          {/* Input Form */}
          <form onSubmit={handleSend} className="p-3 border-t border-slate-200 dark:border-slate-800 flex items-center gap-2 bg-white dark:bg-slate-900">
            <button
              type="button"
              className="p-2 text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 rounded-lg border border-slate-200 dark:border-slate-800"
              title="Attach File"
            >
              <Paperclip className="w-4 h-4" />
            </button>
            <input
              type="text"
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              placeholder="Type your message..."
              className="flex-1 py-2.5 px-3 rounded-lg border border-slate-300 dark:border-slate-800 bg-white dark:bg-slate-950 text-xs text-slate-900 dark:text-white focus:outline-none focus:border-blue-600"
            />
            <Button type="submit" variant="primary" icon={Send} size="sm">
              Send
            </Button>
          </form>

        </div>

      </div>
    </div>
  );
};

export default Messages;
