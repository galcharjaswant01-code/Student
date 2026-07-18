import React, { useState } from 'react';
import { aiChatbot } from '../../services/aiService';

const AIChatbot = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSend = async () => {
    if (!input.trim() && !file) return;

    const userMsg = { text: input, file: file, sender: 'user' };
    const newMessages = [...messages, userMsg];
    setMessages(newMessages);
    setInput('');
    setFile(null);
    setLoading(true);

    try {
      // Create a placeholder for the AI message
      const aiMsgId = Date.now();
      
      const response = await aiChatbot(newMessages);
      
      let aiText = "Empty response.";
      if (typeof response === 'string') {
        aiText = response;
      } else if (response?.message?.content) {
        aiText = typeof response.message.content === 'string' ? response.message.content : JSON.stringify(response.message.content);
      } else if (response?.text) {
        aiText = response.text;
      } else if (response?.toString && typeof response.toString === 'function' && response.toString() !== '[object Object]') {
        aiText = response.toString();
      } else {
        aiText = JSON.stringify(response);
      }

      setMessages((prev) => [...prev, { 
        id: aiMsgId, 
        text: aiText, 
        images: [], 
        sender: 'ai' 
      }]);
    } catch (error) {
      setMessages((prev) => [...prev, { id: Date.now(), text: `Error connecting to AI: ${error.message || error}`, sender: 'ai' }]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-slate-800/30 rounded-sm p-6 border border-slate-700/50 -[0_0_50px_rgba(0,0,0,0.3)] flex flex-col h-full w-full max-h-[calc(100vh-140px)] relative">
      <div className="flex items-center justify-between mb-6 border-b border-slate-700/50 pb-4 shrink-0">
        <div className="flex items-center space-x-4">
          <div className="w-12 h-12 rounded-sm bg-gradient- bg-blue-500 flex items-center justify-center -blue-500/20">
            <span className="text-2xl">🤖</span>
          </div>
          <div>
            <h2 className="text-2xl font-bold text-white tracking-tight">AI Chat Assistant</h2>
            <div className="flex items-center gap-2 mt-1">
              <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></div>
              <p className="text-emerald-400/80 text-xs font-medium uppercase tracking-wider">Claude 3.5 Sonnet Online</p>
            </div>
          </div>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto mb-20 space-y-6 pr-4 custom-scrollbar scroll-smooth">
        {messages.length === 0 && (
          <div className="flex flex-col items-center justify-center h-full text-center space-y-4">
            <div className="w-16 h-16 rounded-full bg-slate-800 flex items-center justify-center">
              <span className="text-3xl">✨</span>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-slate-200">How can I help you today?</h3>
              <p className="text-slate-500 mt-2 max-w-md">Ask me anything about your studies, request code generation, or ask me to draw an image.</p>
            </div>
          </div>
        )}
        {messages.map((msg, idx) => (
          <div key={msg.id || idx} className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
            {msg.sender === 'ai' && (
               <div className="w-8 h-8 rounded-full bg-blue-500/20 flex items-center justify-center shrink-0 mr-3 mt-1">
                 <span className="text-sm">🤖</span>
               </div>
            )}
            <div className={`max-w-[85%] p-4 rounded-sm  ${
              msg.sender === 'user' 
                ? 'bg-gradient- bg-blue-600  text-white rounded-br-sm' 
                : 'bg-slate-800/80  border border-slate-700/50 text-slate-200 rounded-bl-sm'
              }`}
            >
              <div className="whitespace-pre-wrap leading-relaxed prose prose-invert max-w-none">{msg.text}</div>
              {msg.file && (
                <div className="mt-3 text-sm bg-black/30 px-3 py-2 rounded-sm truncate flex items-center gap-2 border border-white/10 w-fit">
                  <span>📎</span> {msg.file.name}
                </div>
              )}
              {msg.images && msg.images.length > 0 && (
                <div className="mt-4 flex flex-wrap gap-3">
                  {msg.images.map((img, imgIdx) => (
                    <img 
                      key={imgIdx} 
                      src={img.image_url?.url || img.url} 
                      alt="AI Generated" 
                      className="rounded-sm max-w-full h-auto object-contain border border-slate-700/50 hover:scale-[1.02]"
                    />
                  ))}
                </div>
              )}
            </div>
          </div>
        ))}
        {loading && (
          <div className="flex justify-start">
             <div className="w-8 h-8 rounded-full bg-blue-500/20 flex items-center justify-center shrink-0 mr-3 mt-1">
               <span className="text-sm animate-bounce">🤖</span>
             </div>
            <div className="bg-slate-800/80 border border-slate-700/50 text-slate-400 p-4 rounded-sm rounded-bl-sm flex items-center gap-2">
              <div className="w-2 h-2 bg-blue-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
              <div className="w-2 h-2 bg-blue-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
              <div className="w-2 h-2 bg-blue-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
            </div>
          </div>
        )}
      </div>

      {/* Floating Input Bar */}
      <div className="absolute bottom-6 left-6 right-6 flex items-end space-x-3 bg-slate-900/90 p-2 rounded-sm border border-slate-700/50 -[0_10px_40px_rgba(0,0,0,0.5)]">
        <div className="flex-1 relative">
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault();
                handleSend();
              }
            }}
            placeholder="Message AI Studio..."
            className="w-full bg-transparent border-none px-4 py-3 text-white focus:outline-none focus:ring-0 resize-none max-h-32 min-h-[52px]"
            rows="1"
          />
        </div>
        <button
          onClick={handleSend}
          disabled={loading || (!input.trim() && !file)}
          className="bg-gradient- bg-blue-600 hover:bg-blue-500 hover: text-white w-12 h-12 rounded-full flex items-center justify-center shrink-0 mr-1 mb-1 disabled:opacity-50 disabled:"
        >
          <span className="text-xl">↑</span>
        </button>
      </div>
    </div>
  );
};

export default AIChatbot;
