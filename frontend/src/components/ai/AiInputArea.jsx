import React, { useState } from 'react';
import { Paperclip, Send, Square, Globe } from 'lucide-react';

const AiInputArea = ({ onSend, isProcessing }) => {
  const [inputText, setInputText] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!inputText.trim() || isProcessing) return;
    onSend(inputText);
    setInputText('');
  };

  return (
    <div className="w-full max-w-4xl mx-auto px-4 pb-6 pt-2">
      <form 
        onSubmit={handleSubmit}
        className="bg-white dark:bg-[#111827] border border-gray-200 dark:border-gray-700 rounded-sm -[0_5px_20px_rgba(0,0,0,0.05)] dark:-none overflow-hidden focus-within:ring-2 focus-within:ring-indigo-500/50 focus-within:border-indigo-500"
      >
        <textarea 
          rows="1"
          placeholder="Ask EduSphere AI anything..."
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          className="w-full bg-transparent border-none focus:outline-none resize-none py-4 px-4 text-base text-gray-900 dark:text-gray-100 max-h-48 min-h-[60px] custom-scrollbar"
          onKeyDown={(e) => {
            if (e.key === 'Enter' && !e.shiftKey) {
              e.preventDefault();
              handleSubmit(e);
            }
          }}
        />
        
        <div className="flex items-center justify-between px-3 pb-3">
          <div className="flex items-center gap-1">
            <button type="button" className="p-2 text-gray-400 hover:text-indigo-600 dark:hover:text-indigo-400 rounded-sm hover:bg-indigo-50 dark:hover:bg-indigo-500/10 flex items-center gap-2 text-sm font-medium">
              <Paperclip className="w-4 h-4" />
              <span className="hidden sm:inline">Attach</span>
            </button>
            <button type="button" className="p-2 text-gray-400 hover:text-indigo-600 dark:hover:text-indigo-400 rounded-sm hover:bg-indigo-50 dark:hover:bg-indigo-500/10 flex items-center gap-2 text-sm font-medium">
              <Globe className="w-4 h-4" />
              <span className="hidden sm:inline">Web Search</span>
            </button>
          </div>
          
          <button 
            type="submit"
            disabled={!inputText.trim() && !isProcessing}
            className={`p-2 rounded-sm flex items-center justify-center  ${
              isProcessing 
                ? 'bg-gray-200 dark:bg-gray-700 text-gray-900 dark:text-gray-100 animate-pulse' 
                : inputText.trim() 
                  ? 'bg-indigo-600 text-white -[0_0_15px_rgba(79,70,229,0.4)] hover:bg-indigo-500' 
                  : 'bg-gray-100 dark:bg-gray-800 text-gray-400'
            }`}
          >
            {isProcessing ? <Square className="w-5 h-5 fill-current" /> : <Send className="w-5 h-5" />}
          </button>
        </div>
      </form>
      <div className="text-center mt-3 text-xs text-gray-400">
        AI can make mistakes. Consider verifying important information.
      </div>
    </div>
  );
};

export default AiInputArea;
