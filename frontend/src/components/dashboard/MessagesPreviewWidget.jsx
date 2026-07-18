import React from 'react';
import { useNavigate } from 'react-router-dom';
import { MessageSquare, ArrowRight } from 'lucide-react';


const MessagesPreviewWidget = () => {
  const navigate = useNavigate();

  const recentMessages = [
    { id: 1, sender: 'Sarah', avatar: 'S', color: 'bg-secondary ', time: '10m ago', text: 'Are we still meeting at 5 PM?', unread: true },
    { id: 2, sender: 'Dr. Smith', avatar: 'D', color: 'bg-blue-500 ', time: '2h ago', text: 'I have uploaded the final exam review guide.', unread: true },
    { id: 3, sender: 'Study Group', avatar: 'SG', color: 'bg-green-500 ', time: '1d ago', text: 'John: Does anyone have notes from yesterday?', unread: false },
  ];

  return (
    <div className="flex flex-col h-full w-full relative z-10">
      <div className="flex justify-between items-center p-5 pb-2 shrink-0">
        <h3 className="text-xl font-bold text-slate-900 dark:text-white tracking-tight flex items-center gap-2">
          <MessageSquare className="w-5 h-5 text-purple-500" />
          Messages
        </h3>
        <button 
          onClick={() => navigate('/messages')}
          className="text-sm text-primary hover:text-blue-700 font-medium flex items-center gap-1 group"
        >
          Inbox
          <ArrowRight className="w-3 h-3 group-" />
        </button>
      </div>
      
      <div className="flex-1 overflow-y-auto p-4 space-y-3">
        {recentMessages.map((msg, i) => (
          <div 
            key={i} 
            onClick={() => navigate('/messages')}
            className="group flex items-center gap-4 p-3 bg-white dark:bg-slate-800/50 rounded-sm hover:bg-slate-50 dark:hover:bg-slate-700 border border-slate-100 dark:border-white/5 cursor-pointer"
          >
            <div className="relative shrink-0">
              <div className={`w-10 h-10 rounded-full bg-gradient- ${msg.color} text-white flex items-center justify-center font-bold `}>
                {msg.avatar}
              </div>
              {msg.unread && (
                <div className="absolute top-0 right-0 w-3 h-3 bg-red-500 rounded-full border-2 border-white dark:border-[#0F172A]"></div>
              )}
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex justify-between items-baseline mb-0.5">
                <p className={`text-sm truncate group-hover:text-primary  ${msg.unread ? 'font-bold text-slate-900 dark:text-white' : 'font-medium text-slate-700 dark:text-slate-300'}`}>
                  {msg.sender}
                </p>
                <p className="text-[10px] text-slate-400 font-medium shrink-0 ml-2">{msg.time}</p>
              </div>
              <p className={`text-xs truncate ${msg.unread ? 'text-slate-700 dark:text-slate-300 font-medium' : 'text-slate-500 dark:text-slate-400'}`}>
                {msg.text}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MessagesPreviewWidget;
