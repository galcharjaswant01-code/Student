import React, { useState, useEffect, useRef } from 'react';
import { Phone, Video, Info, Paperclip, Smile, Send, Hash, UserCircle, UploadCloud, X } from 'lucide-react';

import MessageBubble from './MessageBubble';
import { messagesApi } from '../../services/mockDjangoMessagesApi';

const ChatWindow = ({ activeChat, isMobileView, onBack, onToggleDetails, showDetailsPanel }) => {
  const [messages, setMessages] = useState([]);
  const [inputText, setInputText] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [pendingFile, setPendingFile] = useState(null);
  
  const messagesEndRef = useRef(null);
  const fileInputRef = useRef(null);

  useEffect(() => {
    if (activeChat) {
      setMessages([]); // clear current
      messagesApi.getMessages(activeChat.id).then(setMessages);
    }
  }, [activeChat]);

  // Auto-scroll to bottom
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isTyping]);

  const handleSend = async (e) => {
    e?.preventDefault();
    if (!inputText.trim() && !pendingFile) return;

    const textToSend = inputText;
    const fileToSend = pendingFile;
    
    setInputText('');
    setPendingFile(null);

    // Optimistic UI update handled partly by mock API returning immediately
    const newMsg = await messagesApi.sendMessage(activeChat.id, textToSend, fileToSend);
    setMessages(prev => [...prev, newMsg]);

    // Simulate other person typing after a short delay
    if (activeChat.type === 'direct' && textToSend.includes('?')) {
      setTimeout(() => {
        setIsTyping(true);
        setTimeout(() => {
          setIsTyping(false);
          setMessages(prev => [
            ...prev, 
            {
              id: Date.now(),
              senderId: activeChat.id,
              text: 'I will look into that and get back to you shortly.',
              timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
              isMe: false,
              senderName: activeChat.name,
              avatar: activeChat.avatar
            }
          ]);
        }, 3000);
      }, 1000);
    }
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFileSelect(e.dataTransfer.files[0]);
    }
  };

  const handleFileSelect = (file) => {
    if (!file) return;
    setPendingFile({
      name: file.name,
      size: (file.size / (1024 * 1024)).toFixed(2) + ' MB',
      type: file.name.endsWith('.pdf') ? 'pdf' : file.type.startsWith('image/') ? 'image' : 'docx'
    });
  };

  if (!activeChat) return null;

  return (
    <div 
      className="flex-1 flex flex-col h-full bg-slate-50 dark:bg-slate-950 relative min-h-0"
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
    >
      
      {/* Drag Overlay */}
      
        {isDragging && (
          <div
            className="absolute inset-0 z-50 bg-indigo-500/90 flex flex-col items-center justify-center text-white border-4 border-dashed border-white/50 m-4 rounded-sm"
          >
            <UploadCloud className="w-20 h-20 mb-4 animate-bounce" />
            <h2 className="text-3xl font-black">Drop files to share</h2>
            <p className="mt-2 font-medium opacity-80">PDFs, Images, and Documents supported</p>
          </div>
        )}
      

      {/* Chat Header */}
      <div className="h-[72px] px-4 sm:px-6 border-b border-slate-200/50 dark:border-white/10 bg-white/70 dark:bg-slate-900/70 flex items-center justify-between shrink-0 w-full z-10">
        <div className="flex items-center gap-4">
          {/* Mobile Back */}
          {isMobileView && (
            <button onClick={onBack} className="p-2 -ml-2 text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-sm">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>
          )}

          <div className="relative">
            {activeChat.type === 'direct' ? (
              activeChat.avatar ? (
                <img src={activeChat.avatar} alt={activeChat.name} className="w-12 h-12 rounded-sm object-cover" />
              ) : (
                <UserCircle className="w-12 h-12 text-slate-400" />
              )
            ) : (
              <div className="w-12 h-12 rounded-sm bg-indigo-500/20 text-indigo-500 flex items-center justify-center">
                <Hash className="w-6 h-6" />
              </div>
            )}
            {activeChat.online && activeChat.type === 'direct' && (
              <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-emerald-500 border-2 border-white dark:border-slate-900 rounded-full"></div>
            )}
          </div>
          <div>
            <h3 className="font-bold text-lg text-slate-900 dark:text-white leading-tight">{activeChat.name}</h3>
            <span className={`text-xs font-medium ${activeChat.online ? 'text-emerald-500' : 'text-slate-500'}`}>
              {activeChat.type === 'group' ? 'Study Group' : (activeChat.online ? 'Active now' : 'Offline')}
            </span>
          </div>
        </div>

        <div className="flex items-center gap-1 sm:gap-2">
          <button className="p-2.5 text-slate-400 hover:text-indigo-600 hover:bg-indigo-50 dark:hover:bg-indigo-500/20 rounded-sm hidden sm:block">
            <Phone className="w-5 h-5" />
          </button>
          <button className="p-2.5 text-slate-400 hover:text-indigo-600 hover:bg-indigo-50 dark:hover:bg-indigo-500/20 rounded-sm hidden sm:block">
            <Video className="w-5 h-5" />
          </button>
          <button 
            onClick={onToggleDetails}
            className={`p-2.5 rounded-sm  ${showDetailsPanel ? 'bg-indigo-500 text-white ' : 'text-slate-400 hover:text-indigo-600 hover:bg-indigo-50 dark:hover:bg-indigo-500/20'}`}
          >
            <Info className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Message Feed */}
      <div className="flex-1 overflow-y-auto p-4 sm:p-6 flex flex-col custom-scrollbar relative">
        {/* Date Divider mock */}
        <div className="flex justify-center mb-6">
          <span className="px-3 py-1 bg-white dark:bg-slate-800 border border-slate-200 dark:border-white/10 rounded-full text-[10px] font-bold text-slate-400 uppercase tracking-widest">
            Today
          </span>
        </div>

        {messages.map(msg => (
          <MessageBubble key={msg.id} message={msg} />
        ))}
        
        {isTyping && (
          <div className="flex items-center gap-2 mb-4 self-start bg-white dark:bg-slate-800 px-4 py-3 rounded-sm rounded-bl-sm border border-slate-200/50 dark:border-white/5">
            <div className="flex gap-1">
              <span className="w-2 h-2 bg-slate-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
              <span className="w-2 h-2 bg-slate-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
              <span className="w-2 h-2 bg-slate-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
            </div>
          </div>
        )}
        <div ref={messagesEndRef} className="h-4" />
      </div>

      {/* Input Area */}
      <div className="w-full p-4 bg-white/70 dark:bg-slate-900/70 border-t border-slate-200/50 dark:border-white/10 shrink-0">
        
        
          {pendingFile && (
            <div
              className="mb-3 p-3 bg-indigo-50 dark:bg-indigo-500/10 border border-indigo-200 dark:border-indigo-500/30 rounded-sm flex items-center justify-between"
            >
              <div className="flex items-center gap-3">
                <Paperclip className="w-5 h-5 text-indigo-500" />
                <div>
                  <p className="text-sm font-bold text-slate-900 dark:text-white">{pendingFile.name}</p>
                  <p className="text-[10px] text-slate-500">{pendingFile.size}</p>
                </div>
              </div>
              <button onClick={() => setPendingFile(null)} className="p-1 text-slate-400 hover:text-red-500 rounded-sm">
                <X className="w-5 h-5" />
              </button>
            </div>
          )}
        

        <form onSubmit={handleSend} className="flex items-end gap-2 bg-white dark:bg-slate-800 p-2.5 rounded-sm border border-slate-200 dark:border-white/10 focus-within:ring-2 focus-within:ring-indigo-500/50 focus-within:border-indigo-500">
          
          <input 
            type="file" 
            ref={fileInputRef} 
            className="hidden" 
            onChange={(e) => handleFileSelect(e.target.files[0])}
          />
          <button 
            type="button" 
            onClick={() => fileInputRef.current?.click()}
            className="p-2.5 text-slate-400 hover:text-indigo-500 hover:bg-slate-100 dark:hover:bg-slate-700 shrink-0 rounded-sm"
          >
            <Paperclip className="w-5 h-5" />
          </button>
          
          <textarea 
            rows="1"
            placeholder={pendingFile ? "Add a message with your file..." : `Message ${activeChat.name}...`}
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            className="flex-1 bg-transparent border-none focus:outline-none resize-none py-2.5 px-2 text-sm text-slate-900 dark:text-slate-100 max-h-32 min-h-[40px] custom-scrollbar font-medium"
            onKeyDown={(e) => {
              if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault();
                handleSend(e);
              }
            }}
          />
          
          <div className="flex items-center gap-1 shrink-0 pb-1 pr-1">
            <button type="button" className="p-2 text-slate-400 hover:text-amber-500 hidden sm:block">
              <Smile className="w-5 h-5" />
            </button>
            <button 
              type="submit"
              disabled={!inputText.trim() && !pendingFile}
              className={`p-3 rounded-sm flex items-center justify-center  ${
                inputText.trim() || pendingFile 
                  ? 'bg-indigo-600 text-white  -indigo-600/30 hover:bg-indigo-500 ' 
                  : 'bg-slate-100 dark:bg-slate-700 text-slate-400'
              }`}
            >
              <Send className="w-5 h-5 ml-1" />
            </button>
          </div>
        </form>
      </div>
      
    </div>
  );
};

export default ChatWindow;
