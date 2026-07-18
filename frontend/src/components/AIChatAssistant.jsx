import React, { useState, useRef } from 'react';
import { MessageSquare, X, Send, Bot, Maximize2, Minimize2, GripHorizontal, Sparkles } from 'lucide-react';


const AIChatAssistant = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const [messages, setMessages] = useState([
    { id: 1, text: "Hello! I'm your AI study assistant. How can I help you accelerate your learning today?", isUser: false }
  ]);
  const [input, setInput] = useState('');
  
  const constraintsRef = useRef(null);
  
  const smartPrompts = [
    "Summarize Calculus Ch. 4",
    "Quiz me on Physics",
    "Explain React Hooks"
  ];

  const handleSend = (e, customText = null) => {
    if (e) e.preventDefault();
    const textToSend = customText || input;
    if (!textToSend.trim()) return;
    
    // Add user message
    const newMsg = { id: Date.now(), text: textToSend, isUser: true };
    setMessages([...messages, newMsg]);
    if (!customText) setInput('');
    
    // Mock AI response
    setTimeout(() => {
      setMessages(prev => [...prev, { 
        id: Date.now(), 
        text: "I'm currently running in demo mode with this stunning new UI. Once the backend is fully connected, I'll generate real responses!", 
        isUser: false 
      }]);
    }, 1000);
  };

  return (
    <>
      <div ref={constraintsRef} className="fixed inset-0 pointer-events-none z-50" />
      <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end pointer-events-none">
        
        {/* Chat Window */}
        
          {isOpen && (
            <div
              drag
              dragConstraints={constraintsRef}
              dragElastic={0.1}
              dragMomentum={false}
              className="bg-white/90 dark:bg-[#0F172A]/90 -3xl rounded-sm dark:-[0_0_50px_rgba(6,182,212,0.15)] border border-slate-200/50 dark:border-white/10 flex flex-col overflow-hidden mb-4 pointer-events-auto max-w-[90vw] max-h-[80vh]"
              style={{ originX: 1, originY: 1 }}
            >
              {/* Header (Drag Handle) */}
              <div className="bg-gradient- from-[#0F172A] text-white p-4 flex justify-between items-center cursor-move active:cursor-grabbing border-b border-white/10 relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient- bg-primary/20 pointer-events-none" />
                <div className="flex items-center relative z-10">
                  <GripHorizontal className="w-4 h-4 mr-3 text-white/40" />
                  <div className="w-8 h-8 rounded-full bg-gradient- bg-primary flex items-center justify-center mr-3 -[0_0_10px_rgba(37,99,235,0.5)]">
                    <Bot className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <h3 className="font-bold text-sm tracking-wide">SyncSpace AI</h3>
                    <div className="flex items-center gap-1.5 mt-0.5">
                      <div className="w-1.5 h-1.5 rounded-full bg-success -[0_0_5px_#22C55E]" />
                      <span className="text-[10px] text-white/60 uppercase font-semibold">Online</span>
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-1 cursor-default relative z-10" onPointerDown={e => e.stopPropagation()}>
                  <button 
                    onClick={() => setIsExpanded(!isExpanded)} 
                    className="p-1.5 text-white/50 hover:text-white hover:bg-white/10 rounded-sm"
                  >
                    {isExpanded ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
                  </button>
                  <button 
                    onClick={() => setIsOpen(false)} 
                    className="p-1.5 text-white/50 hover:text-white hover:bg-white/10 rounded-sm"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>
              </div>
              
              {/* Messages Area */}
              <div className="flex-1 overflow-y-auto p-5 space-y-5 bg-transparent cursor-default custom-scrollbar relative">
                {messages.map((msg) => (
                  <div
                    key={msg.id} 
                    className={`flex ${msg.isUser ? 'justify-end' : 'justify-start'}`}
                  >
                    {!msg.isUser && (
                      <div className="w-6 h-6 rounded-full bg-gradient- bg-primary shrink-0 flex items-center justify-center mr-2 mt-1">
                        <Sparkles className="w-3 h-3 text-white" />
                      </div>
                    )}
                    <div className={`max-w-[80%] p-3.5 rounded-sm text-sm leading-relaxed  ${
                      msg.isUser 
                        ? 'bg-gradient- bg-primary  text-white rounded-tr-sm -primary/20' 
                        : 'bg-white dark:bg-white/5 border border-slate-100 dark:border-white/5 text-slate-800 dark:text-slate-200 rounded-tl-sm'
                    }`}>
                      {msg.text}
                    </div>
                  </div>
                ))}
              </div>

              {/* Smart Prompts */}
              {messages.length === 1 && (
                <div className="px-4 pb-2 flex gap-2 overflow-x-auto custom-scrollbar cursor-default hide-scrollbar">
                  {smartPrompts.map((prompt, i) => (
                    <button 
                      key={i}
                      onClick={() => handleSend(null, prompt)}
                      className="whitespace-nowrap px-3 py-1.5 text-xs font-medium bg-primary/10 hover:bg-primary/20 text-primary dark:bg-white/5 dark:hover:bg-white/10 dark:text-slate-300 rounded-full border border-primary/20 dark:border-white/5"
                    >
                      {prompt}
                    </button>
                  ))}
                </div>
              )}
              
              {/* Input Area */}
              <div className="p-4 bg-white/50 dark:bg-black/20 border-t border-slate-200/50 dark:border-white/5 cursor-default">
                <form onSubmit={e => handleSend(e)} className="flex items-center gap-2 relative">
                  <input
                    type="text"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    placeholder="Ask AI anything..."
                    className="flex-1 pl-4 pr-12 py-3 bg-white dark:bg-[#0F172A] border border-slate-200 dark:border-white/10 focus:border-primary dark:focus:border-primary rounded-sm outline-none text-slate-900 dark:text-white text-sm"
                  />
                  <button 
                    type="submit"
                    disabled={!input.trim()}
                    className="absolute right-2 p-2 bg-gradient- bg-primary text-white rounded-sm hover: hover:-primary/30 disabled:opacity-50 disabled:hover:-none"
                  >
                    <Send className="w-4 h-4" />
                  </button>
                </form>
                <p className="text-[10px] text-center text-slate-400 mt-2 font-medium">AI can make mistakes. Consider verifying important information.</p>
              </div>
            </div>
          )}
        

        {/* Floating Toggle Button */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="bg-gradient- bg-primary text-white p-4 rounded-sm dark:-[0_0_20px_rgba(6,182,212,0.4)] pointer-events-auto relative group flex items-center justify-center overflow-hidden border border-white/20"
        >
          <div className="absolute inset-0 bg-white/20 opacity-0 group-hover:opacity-100" />
          <div
          >
            {isOpen ? <X className="w-6 h-6" /> : <Sparkles className="w-6 h-6 animate-pulse" />}
          </div>
        </button>
      </div>
    </>
  );
};

export default AIChatAssistant;
