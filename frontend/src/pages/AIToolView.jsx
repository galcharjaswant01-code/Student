import React, { useState, useEffect, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Paperclip, Send, StopCircle, Trash2, File, FileText, Bot } from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import { aiService } from '../services/aiService';
import Button from '../components/ui/Button';

const TOOL_NAMES = {
  'ai-tutor': 'AI Tutor',
  'quiz-generator': 'Quiz Generator',
  'notes-summarizer': 'Notes Summarizer',
  'study-planner': 'Study Planner',
  'resume-analyzer': 'Resume Analyzer',
  'code-assistant': 'Code Assistant'
};

const AIToolView = () => {
  const { toolId } = useParams();
  const navigate = useNavigate();
  const [messages, setMessages] = useState([]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);

  const toolName = TOOL_NAMES[toolId] || 'AI Assistant';

  useEffect(() => {
    setMessages([
      { id: '1', role: 'assistant', content: `Hello! I am your ${toolName}. How can I assist your study session today?` }
    ]);
  }, [toolId, toolName]);

  const handleSend = async (e) => {
    if (e) e.preventDefault();
    if (!inputValue.trim() || isTyping) return;

    const userMessage = { id: Date.now().toString(), role: 'user', content: inputValue.trim() };
    setMessages(prev => [...prev, userMessage]);
    setInputValue('');
    setIsTyping(true);

    const assistantMsgId = (Date.now() + 1).toString();
    setMessages(prev => [...prev, { id: assistantMsgId, role: 'assistant', content: '' }]);

    let accumulatedResponse = '';
    try {
      const systemPrompt = `You are a helpful, expert AI tutor acting as a ${toolName}. Provide concise, clear, and accurate academic guidance.`;
      const historyForApi = [
        ...messages.map(m => ({ role: m.role, content: m.content })),
        { role: 'user', content: userMessage.content }
      ];

      await aiService.sendMessageStream(historyForApi, systemPrompt, (chunk) => {
        accumulatedResponse += chunk;
        setMessages(prev => 
          prev.map(msg => msg.id === assistantMsgId ? { ...msg, content: accumulatedResponse } : msg)
        );
      });
    } catch (error) {
      console.error(error);
      setMessages(prev => 
        prev.map(msg => msg.id === assistantMsgId ? { ...msg, content: 'Sorry, I encountered a temporary connection issue. Please try again.' } : msg)
      );
    } finally {
      setIsTyping(false);
    }
  };

  return (
    <div className="h-[calc(100vh-4rem)] flex flex-col bg-white dark:bg-slate-950 text-slate-900 dark:text-slate-100">
      {/* Top Header */}
      <div className="h-16 px-6 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between bg-white dark:bg-slate-900">
        <div className="flex items-center gap-3">
          <Button variant="secondary" size="sm" icon={ArrowLeft} onClick={() => navigate('/ai-studio')}>
            Back
          </Button>
          <div className="flex items-center gap-2">
            <Bot className="w-5 h-5 text-blue-600 dark:text-blue-400" />
            <h2 className="font-bold text-sm text-slate-900 dark:text-white">{toolName}</h2>
          </div>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-4 custom-scrollbar">
        {messages.map((msg) => (
          <div key={msg.id} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
            <div className={`max-w-xl p-4 rounded-xl text-xs sm:text-sm leading-relaxed ${
              msg.role === 'user' 
                ? 'bg-blue-600 text-white rounded-br-none' 
                : 'bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-900 dark:text-slate-100 rounded-bl-none'
            }`}>
              <ReactMarkdown>{msg.content}</ReactMarkdown>
            </div>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>

      {/* Input */}
      <form onSubmit={handleSend} className="p-4 border-t border-slate-200 dark:border-slate-800 flex items-center gap-2 bg-white dark:bg-slate-900">
        <input
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          placeholder={`Ask ${toolName} a question...`}
          className="flex-1 py-2.5 px-4 rounded-lg border border-slate-300 dark:border-slate-800 bg-transparent text-xs sm:text-sm text-slate-900 dark:text-white focus:outline-none focus:border-blue-600"
        />
        <Button type="submit" variant="primary" icon={Send} disabled={isTyping || !inputValue.trim()}>
          Send
        </Button>
      </form>
    </div>
  );
};

export default AIToolView;
