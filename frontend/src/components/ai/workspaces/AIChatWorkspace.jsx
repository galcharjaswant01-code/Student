import React, { useState, useEffect, useRef } from 'react';

import { Send, Mic, Paperclip, Bot, User, Sparkles, Copy, RotateCw, FileText, X } from 'lucide-react';
import { aiApi } from '../../../services/aiApi';

const AIChatWorkspace = ({ isMobileView, onBack, onToggleInsights }) => {
  const [messages, setMessages] = useState([
    {
      id: 1,
      role: 'ai',
      text: "Hello! I'm your AI Studio Assistant. How can I help you with your studies today? I can explain concepts, help with research, or give you career advice.",
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    }
  ]);
  const [inputText, setInputText] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);
  const [isRecording, setIsRecording] = useState(false);
  const messagesEndRef = useRef(null);
  const fileInputRef = useRef(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isTyping]);

  const handleSend = async (e) => {
    e?.preventDefault();
    if (!inputText.trim()) return;

    const fileSuffix = selectedFile ? `\n\n📎 Attached file: ${selectedFile.name}` : "";
    const userMsg = {
      id: Date.now(),
      role: 'user',
      text: inputText + fileSuffix,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages(prev => [...prev, userMsg]);
    setInputText('');
    setSelectedFile(null); // Clear selected file
    setIsTyping(true);

    const aiResponse = await aiApi.sendChatMessage(userMsg.text);
    
    setIsTyping(false);
    setMessages(prev => [...prev, { ...aiResponse, id: Date.now() + 1 }]);
  };

  const handleMicClick = () => {
    if (isRecording) return;
    setIsRecording(true);
    setInputText('Listening...');
    setTimeout(() => {
      setInputText('Explain the difference between SQL and NoSQL databases.');
      setIsRecording(false);
    }, 2000);
  };

  const renderMessageText = (text) => {
    // Basic mock markdown rendering for bold and code blocks
    const parts = text.split(/(`{1,3}[^`]+`{1,3}|\*\*[^*]+\*\*)/g);
    
    return parts.map((part, idx) => {
      if (part.startsWith('```')) {
        const code = part.replace(/```[a-z]*\n?/g, '').replace(/```/g, '');
        return (
          <div key={idx} className="my-3 rounded-sm overflow-hidden bg-[#1E1E1E] text-slate-300 font-mono text-xs border border-white/10">
            <div className="px-4 py-2 bg-[#2D2D2D] border-b border-white/5 flex items-center justify-between">
              <span className="text-white/50 text-[10px] uppercase tracking-wider">Code Snippet</span>
              <button 
                className="text-white/50 hover:text-white"
                onClick={() => navigator.clipboard.writeText(code)}
              >
                <Copy className="w-3 h-3" />
              </button>
            </div>
            <pre className="p-4 overflow-x-auto"><code>{code}</code></pre>
          </div>
        );
      }
      if (part.startsWith('`')) {
        return <code key={idx} className="bg-slate-200 dark:bg-slate-700 px-1.5 py-0.5 rounded text-sm text-pink-500 font-mono">{part.replace(/`/g, '')}</code>;
      }
      if (part.startsWith('**')) {
        return <strong key={idx} className="font-bold">{part.replace(/\*\*/g, '')}</strong>;
      }
      return <span key={idx}>{part}</span>;
    });
  };

  return (
    <div className="flex flex-col h-full bg-slate-50 dark:bg-[#0B0F19] relative">
      
      {/* Header */}
      <div className="h-[72px] px-6 border-b border-slate-200 dark:border-slate-800 bg-white/70 dark:bg-slate-900/70 flex items-center justify-between shrink-0">
        <div className="flex items-center gap-3">
          {isMobileView && (
            <button onClick={onBack} className="p-2 -ml-2 text-slate-500 rounded-sm hover:bg-slate-100 dark:hover:bg-slate-800">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>
          )}
          <div className="w-10 h-10 rounded-sm bg-indigo-500/10 text-indigo-500 flex items-center justify-center">
            <Bot className="w-5 h-5" />
          </div>
          <div>
            <h2 className="font-bold text-lg text-slate-900 dark:text-white leading-tight flex items-center gap-2">
              AI Chat <Sparkles className="w-4 h-4 text-amber-500" />
            </h2>
            <p className="text-xs text-slate-500">Powered by Gemini 1.5 Pro</p>
          </div>
        </div>
        <button onClick={onToggleInsights} className="p-2 text-slate-400 hover:text-indigo-500 hover:bg-indigo-50 dark:hover:bg-indigo-500/10 rounded-sm">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        </button>
      </div>

      {/* Chat Feed */}
      <div className="flex-1 overflow-y-auto p-4 sm:p-8 custom-scrollbar">
        <div className="max-w-4xl mx-auto space-y-8">
          {messages.map(msg => (
            <div 
              key={msg.id}
              className={`flex gap-4 ${msg.role === 'user' ? 'flex-row-reverse' : ''}`}
            >
              <div className={`w-8 h-8 rounded-sm shrink-0 flex items-center justify-center ${
                msg.role === 'user' ? 'bg-indigo-600 text-white' : 'bg-gradient- bg-indigo-500  text-white '
              }`}>
                {msg.role === 'user' ? <User className="w-4 h-4" /> : <Bot className="w-4 h-4" />}
              </div>
              
              <div className={`max-w-[85%] ${msg.role === 'user' ? 'items-end flex flex-col' : ''}`}>
                <div className="flex items-center gap-2 mb-1 px-1">
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">{msg.role === 'user' ? 'You' : 'AI Assistant'}</span>
                  <span className="text-[10px] text-slate-500">{msg.timestamp}</span>
                </div>
                <div className={`p-4 rounded-sm text-sm leading-relaxed ${
                  msg.role === 'user' 
                    ? 'bg-slate-200 dark:bg-slate-800 text-slate-900 dark:text-white rounded-tr-sm' 
                    : 'bg-white dark:bg-[#111827] text-slate-800 dark:text-slate-200  border border-slate-200/50 dark:border-white/5 rounded-tl-sm'
                }`}>
                  <div className="whitespace-pre-wrap">{renderMessageText(msg.text)}</div>
                </div>

                {msg.role === 'ai' && (
                  <div className="flex gap-2 mt-2 px-1 opacity-0 hover:opacity-100 group-hover:opacity-100">
                    <button onClick={() => navigator.clipboard.writeText(msg.text)} className="p-1 text-slate-400 hover:text-indigo-500"><Copy className="w-3.5 h-3.5" /></button>
                    <button onClick={() => {
                        const lastUserMsg = messages.filter(m => m.role === 'user').pop();
                        if (lastUserMsg) {
                          setInputText(lastUserMsg.text);
                        }
                      }} className="p-1 text-slate-400 hover:text-indigo-500"><RotateCw className="w-3.5 h-3.5" /></button>
                  </div>
                )}
              </div>
            </div>
          ))}
          
          {isTyping && (
            <div className="flex gap-4">
               <div className="w-8 h-8 rounded-sm shrink-0 bg-gradient- bg-indigo-500 flex items-center justify-center text-white">
                <Bot className="w-4 h-4" />
              </div>
              <div className="bg-white dark:bg-[#111827] px-4 py-3 rounded-sm rounded-tl-sm border border-slate-200/50 dark:border-white/5 flex gap-1 items-center h-[46px]">
                <span className="w-2 h-2 bg-indigo-500/50 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                <span className="w-2 h-2 bg-indigo-500/50 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                <span className="w-2 h-2 bg-indigo-500/50 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
              </div>
            </div>
          )}
          <div ref={messagesEndRef} className="h-4" />
        </div>
      </div>

      {/* Input Area */}
      <div className="p-4 bg-white/70 dark:bg-slate-900/70 border-t border-slate-200/50 dark:border-white/10 shrink-0">
        <div className="max-w-4xl mx-auto">
          {selectedFile && (
            <div className="flex items-center gap-2 p-1.5 px-3 bg-indigo-50 dark:bg-indigo-500/10 border border-indigo-200 dark:border-indigo-500/20 rounded-md text-xs text-indigo-700 dark:text-indigo-300 w-fit mb-2">
              <FileText className="w-3.5 h-3.5" />
              <span className="font-bold truncate max-w-[150px]">{selectedFile.name}</span>
              <button type="button" onClick={() => setSelectedFile(null)} className="hover:text-rose-500 font-bold ml-1">
                <X className="w-3.5 h-3.5" />
              </button>
            </div>
          )}
          <form onSubmit={handleSend} className="relative flex items-end gap-2 bg-white dark:bg-slate-800 p-2 rounded-sm border border-slate-200 dark:border-slate-700 focus-within:ring-2 focus-within:ring-indigo-500/50">
            <input 
              type="file" 
              ref={fileInputRef} 
              onChange={(e) => {
                if (e.target.files && e.target.files[0]) {
                  setSelectedFile(e.target.files[0]);
                }
              }} 
              className="hidden" 
            />
            <button 
              type="button" 
              onClick={() => fileInputRef.current?.click()}
              className="p-3 text-slate-400 hover:text-indigo-500 hover:bg-slate-100 dark:hover:bg-slate-700 rounded-sm"
            >
              <Paperclip className="w-5 h-5" />
            </button>
            
            <textarea 
              rows="1"
              placeholder={isRecording ? "Listening..." : "Ask the AI Assistant anything..."}
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              className="flex-1 bg-transparent border-none focus:outline-none resize-none py-3 px-2 text-sm text-slate-900 dark:text-slate-100 max-h-40 min-h-[48px] custom-scrollbar font-medium"
              onKeyDown={(e) => {
                if (e.key === 'Enter' && !e.shiftKey) {
                  e.preventDefault();
                  handleSend(e);
                }
              }}
            />
            
            <div className="flex items-center gap-1 shrink-0 pb-1 pr-1">
              <button 
                type="button" 
                onClick={handleMicClick}
                className={`p-2 rounded-sm ${isRecording ? 'text-rose-500 animate-pulse bg-rose-500/10' : 'text-slate-400 hover:text-rose-500'} hidden sm:block`}
              >
                <Mic className="w-5 h-5" />
              </button>
              <button 
                type="submit"
                disabled={!inputText.trim()}
                className={`p-3 rounded-sm flex items-center justify-center  ${
                  inputText.trim() 
                    ? 'bg-indigo-600 text-white  -indigo-600/30 hover:bg-indigo-500 ' 
                    : 'bg-slate-100 dark:bg-slate-700 text-slate-400'
                }`}
              >
                <Send className="w-5 h-5 ml-0.5" />
              </button>
            </div>
          </form>
          <div className="text-center mt-2">
            <span className="text-[10px] text-slate-400">AI can make mistakes. Verify important information.</span>
          </div>
        </div>
      </div>

    </div>
  );
};

export default AIChatWorkspace;
