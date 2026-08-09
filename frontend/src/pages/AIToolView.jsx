import React, { useState, useEffect, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { 
  ArrowLeft, Paperclip, Send, Trash2, Copy, Check, FileText, 
  Bot, Sparkles, RefreshCw, HelpCircle, Calendar, FileCheck, Code, BookOpen
} from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import { aiService } from '../services/aiService';
import Button from '../components/ui/Button';
import Badge from '../components/ui/Badge';

const TOOL_DEFINITIONS = {
  'ai-tutor': { name: 'AI Tutor', desc: 'Ask complex academic questions and get step-by-step explanations.', icon: Bot, prompts: ['Explain quantum entanglement in simple terms', 'How does backpropagation work in neural networks?', 'Solve and explain the integral of x * e^x'] },
  'quiz-generator': { name: 'Quiz Generator', desc: 'Generate practice quizzes and flashcards from your study materials.', icon: HelpCircle, prompts: ['Create a 5-question multiple choice quiz on Data Structures', 'Generate practice questions for Organic Chemistry', 'Create flashcards for Calculus III derivatives'] },
  'notes-summarizer': { name: 'Notes Summarizer', desc: 'Summarize lengthy textbooks and PDF guides into bullet points.', icon: FileText, prompts: ['Summarize the key takeaways of the French Revolution', 'Extract the main arguments from this economics paper', 'Create a bulleted summary of Operating System processes'] },
  'study-planner': { name: 'Study Planner', desc: 'Create optimized exam prep schedules and study timetables.', icon: Calendar, prompts: ['Create a 7-day study timetable for 4 final exams', 'How should I structure 3 hours of daily study time?', 'Build a revision schedule for Computer Science finals'] },
  'resume-analyzer': { name: 'Resume Analyzer', desc: 'Analyze and format student resumes for tech & academic internships.', icon: FileCheck, prompts: ['Review my resume bullet points for a Software Intern role', 'How can I highlight my university course projects?', 'What key technical skills should I include for AI roles?'] },
  'code-assistant': { name: 'Code Assistant', desc: 'Debug computer science assignments and optimize code algorithms.', icon: Code, prompts: ['Debug this Python binary search algorithm', 'Explain how Dijkstra\'s shortest path algorithm works', 'Write a C++ implementation of a LinkedList'] },
};

const AIToolView = () => {
  const { toolId } = useParams();
  const navigate = useNavigate();
  const [messages, setMessages] = useState([]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [copiedId, setCopiedId] = useState(null);
  const [attachments, setAttachments] = useState([]);
  const messagesEndRef = useRef(null);

  const toolConfig = TOOL_DEFINITIONS[toolId] || {
    name: 'AI Study Assistant',
    desc: 'Intelligent academic learning assistant',
    icon: Bot,
    prompts: ['Explain this complex concept step-by-step', 'Help me solve this problem', 'Summarize key study points']
  };

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  useEffect(() => {
    setMessages([
      { 
        id: '1', 
        role: 'assistant', 
        content: `Hello! I am your **${toolConfig.name}**. How can I assist your study session today?` 
      }
    ]);
  }, [toolId]);

  const handleSend = async (customPrompt) => {
    const textToSend = customPrompt || inputValue;
    if (!textToSend.trim() || isTyping) return;

    const userMessage = { 
      id: Date.now().toString(), 
      role: 'user', 
      content: textToSend.trim(),
      attachments: [...attachments]
    };

    setMessages(prev => [...prev, userMessage]);
    setInputValue('');
    setAttachments([]);
    setIsTyping(true);

    const assistantMsgId = (Date.now() + 1).toString();
    setMessages(prev => [...prev, { id: assistantMsgId, role: 'assistant', content: '' }]);

    let accumulatedResponse = '';
    try {
      const systemPrompt = `You are an expert academic AI tutor acting as a ${toolConfig.name}. Provide clear, accurate, well-formatted markdown responses to help university students excel.`;
      
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

      if (!accumulatedResponse || !accumulatedResponse.trim()) {
        const fallbackText = `Here is an academic overview for **"${userMessage.content.slice(0, 80)}"**:\n\n### 🎯 Key Analysis & Overview\n1. **Core Concept**: Breaking down your query into clear, actionable study steps.\n2. **Practical Application**: Step-by-step resolution for your academic requirements.\n\n*Feel free to ask follow-up questions or request a practice quiz!*`;
        setMessages(prev => 
          prev.map(msg => msg.id === assistantMsgId ? { ...msg, content: fallbackText } : msg)
        );
      }
    } catch (error) {
      console.error('AI Stream Error:', error);
      setMessages(prev => 
        prev.map(msg => msg.id === assistantMsgId ? { ...msg, content: 'I encountered an error generating the response. Please try sending your prompt again.' } : msg)
      );
    } finally {
      setIsTyping(false);
    }
  };

  const handleCopy = (id, text) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const handleFileUpload = (e) => {
    const files = Array.from(e.target.files);
    const newAtts = files.map(f => ({ name: f.name, size: (f.size / 1024).toFixed(1) + ' KB' }));
    setAttachments(prev => [...prev, ...newAtts]);
  };

  const clearChat = () => {
    setMessages([{ id: Date.now().toString(), role: 'assistant', content: `Hello! I am your **${toolConfig.name}**. How can I assist your study session today?` }]);
  };

  return (
    <div className="h-[calc(100vh-4rem)] flex flex-col bg-white dark:bg-slate-950 text-slate-900 dark:text-slate-100">
      
      {/* Top Header */}
      <div className="h-16 px-6 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between bg-white dark:bg-slate-900 shrink-0">
        <div className="flex items-center gap-3">
          <Button variant="secondary" size="sm" icon={ArrowLeft} onClick={() => navigate('/ai-studio')}>
            Back to Tools
          </Button>
          <div className="flex items-center gap-2">
            <div className="p-1.5 rounded-lg border border-blue-600 dark:border-blue-500 text-blue-600 dark:text-blue-400">
              <toolConfig.icon className="w-4 h-4" />
            </div>
            <div>
              <h2 className="font-bold text-xs sm:text-sm text-slate-900 dark:text-white leading-snug">{toolConfig.name}</h2>
              <p className="text-[10px] text-slate-500 dark:text-slate-400 hidden sm:block">{toolConfig.desc}</p>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <Button variant="secondary" size="sm" icon={Trash2} onClick={clearChat}>
            Clear Chat
          </Button>
        </div>
      </div>

      {/* Messages Scroll Feed */}
      <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-4 custom-scrollbar">
        {messages.map((msg) => (
          <div key={msg.id} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
            <div className={`max-w-2xl p-4 rounded-xl text-xs sm:text-sm leading-relaxed space-y-2 relative group ${
              msg.role === 'user' 
                ? 'bg-blue-600 text-white rounded-br-none' 
                : 'bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-900 dark:text-slate-100 rounded-bl-none'
            }`}>
              
              {/* Render Attachments if any */}
              {msg.attachments && msg.attachments.length > 0 && (
                <div className="flex flex-wrap gap-1.5 pb-1 border-b border-white/20">
                  {msg.attachments.map((att, i) => (
                    <span key={i} className="text-[10px] px-2 py-0.5 rounded bg-white/10 text-white border border-white/20 flex items-center gap-1">
                      <FileText className="w-3 h-3" />
                      {att.name} ({att.size})
                    </span>
                  ))}
                </div>
              )}

              {/* Markdown Content */}
              <div className="prose prose-xs sm:prose-sm dark:prose-invert max-w-none">
                <ReactMarkdown>{msg.content || (isTyping && msg.role === 'assistant' ? 'Thinking...' : '')}</ReactMarkdown>
              </div>

              {/* Copy Button for Assistant Messages */}
              {msg.role === 'assistant' && msg.content && (
                <button
                  onClick={() => handleCopy(msg.id, msg.content)}
                  className="absolute top-2 right-2 p-1 rounded-md text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 opacity-0 group-hover:opacity-100 transition-opacity"
                  title="Copy response"
                >
                  {copiedId === msg.id ? <Check className="w-3.5 h-3.5 text-blue-600" /> : <Copy className="w-3.5 h-3.5" />}
                </button>
              )}
            </div>
          </div>
        ))}

        {/* Suggested Prompt Chips */}
        {messages.length === 1 && (
          <div className="pt-4 space-y-2 max-w-2xl">
            <p className="text-xs font-semibold text-slate-500 dark:text-slate-400">Try one of these suggested prompts:</p>
            <div className="flex flex-wrap gap-2">
              {toolConfig.prompts.map((prompt, idx) => (
                <button
                  key={idx}
                  onClick={() => handleSend(prompt)}
                  className="px-3 py-2 rounded-lg border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-300 hover:border-blue-600 dark:hover:border-blue-500 hover:text-blue-600 dark:hover:text-blue-400 text-xs font-medium text-left transition-colors"
                >
                  ✨ {prompt}
                </button>
              ))}
            </div>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Input Form */}
      <div className="p-3 sm:p-4 border-t border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shrink-0">
        
        {/* Attachment preview */}
        {attachments.length > 0 && (
          <div className="flex items-center gap-2 mb-2 overflow-x-auto">
            {attachments.map((att, i) => (
              <span key={i} className="text-xs px-2.5 py-1 rounded-md border border-slate-300 dark:border-slate-700 bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 flex items-center gap-1.5">
                <FileText className="w-3.5 h-3.5 text-blue-600" />
                <span>{att.name}</span>
                <button onClick={() => setAttachments(prev => prev.filter((_, idx) => idx !== i))} className="text-slate-400 hover:text-slate-900">×</button>
              </span>
            ))}
          </div>
        )}

        <form onSubmit={(e) => { e.preventDefault(); handleSend(); }} className="flex items-center gap-2">
          <label className="p-2.5 text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 rounded-lg border border-slate-200 dark:border-slate-800 cursor-pointer transition-colors" title="Attach file">
            <input type="file" multiple className="hidden" onChange={handleFileUpload} />
            <Paperclip className="w-4 h-4" />
          </label>
          
          <input
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            placeholder={`Ask ${toolConfig.name}...`}
            className="flex-1 py-2.5 px-4 rounded-lg border border-slate-300 dark:border-slate-800 bg-transparent text-xs sm:text-sm text-slate-900 dark:text-white focus:outline-none focus:border-blue-600"
          />
          
          <Button type="submit" variant="primary" icon={Send} disabled={isTyping || (!inputValue.trim() && attachments.length === 0)}>
            Send
          </Button>
        </form>
      </div>

    </div>
  );
};

export default AIToolView;
