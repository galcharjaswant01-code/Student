import React from 'react';

import { Check, CheckCheck, FileText, Image, Download, FileCode } from 'lucide-react';

const MessageBubble = ({ message }) => {
  const isMe = message.isMe;

  const getStatusIcon = () => {
    if (!isMe) return null;
    if (message.status === 'sent') return <Check className="w-3 h-3 text-white/70" />;
    if (message.status === 'delivered') return <CheckCheck className="w-3 h-3 text-white/70" />;
    if (message.status === 'read') return <CheckCheck className="w-3 h-3 text-emerald-400" />;
    return <Check className="w-3 h-3 text-white/30" />;
  };

  const renderFile = (file) => {
    const getIcon = () => {
      if (file.type === 'pdf') return <FileText className="w-6 h-6 text-rose-500" />;
      if (file.type === 'image') return <Image className="w-6 h-6 text-indigo-500" />;
      return <FileCode className="w-6 h-6 text-blue-500" />;
    };

    return (
      <div className={`mt-1 mb-2 p-3 rounded-sm flex items-center gap-3 ${isMe ? 'bg-indigo-700/50' : 'bg-slate-100 dark:bg-slate-700/50'}`}>
        <div className="w-10 h-10 bg-white dark:bg-slate-800 rounded-sm flex items-center justify-center shrink-0">
          {getIcon()}
        </div>
        <div className="flex-1 min-w-0 pr-4">
          <p className="text-sm font-bold truncate leading-tight">{file.name}</p>
          <p className={`text-[10px] ${isMe ? 'text-indigo-200' : 'text-slate-500'}`}>{file.size}</p>
        </div>
        <button className={`p-2 rounded-sm hover:bg-white/20  ${isMe ? 'text-white' : 'text-slate-500 hover:text-indigo-600'}`}>
          <Download className="w-4 h-4" />
        </button>
      </div>
    );
  };

  return (
    <div
      className={`flex flex-col mb-4 max-w-[85%] ${isMe ? 'self-end items-end' : 'self-start items-start'}`}
    >
      
      {/* Sender Info for others */}
      {!isMe && message.senderName && (
        <div className="flex items-center gap-2 mb-1 pl-1">
          {message.avatar && <img src={message.avatar} alt={message.senderName} className="w-5 h-5 rounded-full object-cover" />}
          <span className="text-xs font-semibold text-slate-500 dark:text-slate-400">{message.senderName}</span>
          <span className="text-[10px] text-slate-400">{message.timestamp}</span>
        </div>
      )}

      {/* Bubble */}
      <div 
        className={`px-4 py-2.5 rounded-sm  text-sm group relative ${
          isMe 
            ? 'bg-gradient- bg-indigo-500  text-white rounded-br-sm -indigo-500/20' 
            : 'bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100 border border-slate-200/50 dark:border-white/5 rounded-bl-sm'
        }`}
      >
        {message.file && renderFile(message.file)}
        {message.text && <p className="leading-relaxed whitespace-pre-wrap">{message.text}</p>}
        
        {/* Timestamp and Status for 'Me' */}
        {isMe && (
          <div className="flex items-center justify-end gap-1 mt-1 opacity-70">
            <span className="text-[9px] font-medium">{message.timestamp}</span>
            {getStatusIcon()}
          </div>
        )}
      </div>

    </div>
  );
};

export default MessageBubble;
