import React, { useState, useRef, useEffect } from 'react';
import AiMessage from './AiMessage';
import AiSuggestions from './AiSuggestions';
import AiInputArea from './AiInputArea';
import aiApi from '../../services/aiApi';

const AiChatArea = ({ isMobileView, onBack }) => {
  const [messages, setMessages] = useState([]);
  const [isProcessing, setIsProcessing] = useState(false);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isProcessing]);

  const handleSend = async (text) => {
    const newUserMsg = {
      id: Date.now(),
      text,
      sender: 'user',
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages(prev => [...prev, newUserMsg]);
    setIsProcessing(true);

    try {
      const response = await aiApi.sendMessage(text, messages);
      setMessages(prev => [...prev, response]);
    } catch (error) {
      console.error("AI API Error:", error);
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="flex-1 flex flex-col h-full bg-[#F8FAFC] dark:bg-[#0B0F19] relative">
      
      {/* Mobile Header (Only visible on small screens to go back to sidebar) */}
      {isMobileView && (
        <div className="h-14 border-b border-gray-200 dark:border-gray-800 bg-white/80 dark:bg-[#111827]/80 flex items-center px-4 shrink-0 absolute top-0 w-full z-20">
          <button onClick={onBack} className="p-2 -ml-2 text-gray-500 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 flex items-center gap-2 text-sm font-medium">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z" clipRule="evenodd" />
            </svg>
            Back to History
          </button>
        </div>
      )}

      {/* Main Feed Area */}
      <div className={`flex-1 overflow-y-auto custom-scrollbar flex flex-col ${isMobileView ? 'pt-14' : ''}`}>
        {messages.length === 0 ? (
          <div className="flex-1 flex items-center justify-center">
            <AiSuggestions onSuggest={handleSend} />
          </div>
        ) : (
          <div className="pb-8">
            {messages.map(msg => (
              <AiMessage key={msg.id} message={msg} />
            ))}
            {isProcessing && (
              <div className="py-6 px-4 sm:px-6 w-full bg-white dark:bg-[#111827]">
                <div className="max-w-4xl mx-auto flex gap-4 sm:gap-6 items-center">
                  <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-sm bg-gradient- bg-indigo-500 flex items-center justify-center text-white -[0_2px_10px_rgba(99,102,241,0.4)] animate-pulse">
                    <span className="w-2 h-2 bg-white rounded-full mx-0.5 animate-bounce" style={{ animationDelay: '0ms' }}></span>
                    <span className="w-2 h-2 bg-white rounded-full mx-0.5 animate-bounce" style={{ animationDelay: '150ms' }}></span>
                    <span className="w-2 h-2 bg-white rounded-full mx-0.5 animate-bounce" style={{ animationDelay: '300ms' }}></span>
                  </div>
                  <div className="text-gray-500 dark:text-gray-400 text-sm animate-pulse">
                    EduSphere AI is thinking...
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>
        )}
      </div>

      {/* Input Area */}
      <div className="shrink-0 bg-gradient- from-[#F8FAFC] via-[#F8FAFC] dark:from-[#0B0F19] dark:via-[#0B0F19] dark: pt-6">
        <AiInputArea onSend={handleSend} isProcessing={isProcessing} />
      </div>

    </div>
  );
};

export default AiChatArea;
