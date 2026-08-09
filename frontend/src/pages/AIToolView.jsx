import React, { useState, useEffect, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { 
  ArrowLeft, Paperclip, Send, Trash2, Copy, Check, FileText, 
  Bot, Sparkles, HelpCircle, Calendar, FileCheck, Code, Shield
} from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import { aiService } from '../services/aiService';
import Button from '../components/ui/Button';

const TOOL_DEFINITIONS = {
  'ai-tutor': {
    name: 'AI Tutor',
    desc: 'Ask complex academic questions and get step-by-step explanations.',
    icon: Bot,
    prompts: [
      'Explain quantum entanglement in simple terms',
      'How does backpropagation work in neural networks?',
      'Solve and explain the integral of x * e^x',
    ],
  },
  'quiz-generator': {
    name: 'Quiz Generator',
    desc: 'Generate practice quizzes and flashcards from your study materials.',
    icon: HelpCircle,
    prompts: [
      'Create a 5-question quiz on Data Structures',
      'Generate practice questions for Organic Chemistry',
      'Create flashcards for Calculus III derivatives',
    ],
  },
  'notes-summarizer': {
    name: 'Notes Summarizer',
    desc: 'Summarize lengthy textbooks and PDF guides into bullet points.',
    icon: FileText,
    prompts: [
      'Summarize the key takeaways of the French Revolution',
      'Extract main arguments from an economics paper',
      'Create a bulleted summary of Operating System processes',
    ],
  },
  'study-planner': {
    name: 'Study Planner',
    desc: 'Create optimized exam prep schedules and study timetables.',
    icon: Calendar,
    prompts: [
      'Create a 7-day study timetable for 4 final exams',
      'How should I structure 3 hours of daily study time?',
      'Build a revision schedule for Computer Science finals',
    ],
  },
  'resume-analyzer': {
    name: 'Resume Analyzer',
    desc: 'Analyze and format student resumes for tech & academic internships.',
    icon: FileCheck,
    prompts: [
      'Review my resume bullet points for a Software Intern role',
      'How can I highlight my university course projects?',
      'What technical skills should I include for AI roles?',
    ],
  },
  'code-assistant': {
    name: 'Code Assistant',
    desc: 'Debug computer science assignments and optimize code algorithms.',
    icon: Code,
    prompts: [
      'Debug this Python binary search algorithm',
      "Explain how Dijkstra's shortest path algorithm works",
      'Write a C++ implementation of a LinkedList',
    ],
  },
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
    prompts: [
      'Explain this concept step-by-step',
      'Help me solve this problem',
      'Summarize key study points',
    ],
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
        content: `Hello! I am your **${toolConfig.name}**. How can I assist your study session today?`,
      },
    ]);
    setInputValue('');
    setAttachments([]);
  }, [toolId]);

  const handleSend = async (customPrompt) => {
    const textToSend = (customPrompt || inputValue).trim();
    if (!textToSend || isTyping) return;

    const userMessage = {
      id: Date.now().toString(),
      role: 'user',
      content: textToSend,
      attachments: [...attachments],
    };

    setMessages(prev => [...prev, userMessage]);
    setInputValue('');
    setAttachments([]);
    setIsTyping(true);

    const assistantMsgId = (Date.now() + 1).toString();
    setMessages(prev => [...prev, { id: assistantMsgId, role: 'assistant', content: '' }]);

    let accumulated = '';
    try {
      const systemPrompt = `You are an expert academic AI assistant acting as a ${toolConfig.name}. Provide clear, accurate, well-formatted markdown responses to help university students excel in their studies.`;

      const historyForApi = [
        ...messages.map(m => ({ role: m.role, content: m.content })),
        { role: 'user', content: userMessage.content },
      ];

      await aiService.sendMessageStream(historyForApi, systemPrompt, (chunk) => {
        accumulated += chunk;
        setMessages(prev =>
          prev.map(msg =>
            msg.id === assistantMsgId ? { ...msg, content: accumulated } : msg
          )
        );
      });

      if (!accumulated.trim()) {
        const fallback = `### 🎯 Academic Overview: "${textToSend.slice(0, 80)}"\n\nHere is a structured breakdown:\n\n1. **Core Concept** — Understanding the fundamental principles.\n2. **Practical Steps** — Apply active recall and worked examples.\n3. **Next Action** — Ask a follow-up or request a practice quiz!\n\n*The AI backend may be starting up. Please retry in a moment.*`;
        setMessages(prev =>
          prev.map(msg =>
            msg.id === assistantMsgId ? { ...msg, content: fallback } : msg
          )
        );
      }
    } catch (err) {
      console.error('AI stream error:', err);
      setMessages(prev =>
        prev.map(msg =>
          msg.id === assistantMsgId
            ? { ...msg, content: 'There was an error reaching the AI. Please try again in a moment.' }
            : msg
        )
      );
    } finally {
      setIsTyping(false);
    }
  };

  const copyToClipboard = (text, id) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const handleFileUpload = (e) => {
    const files = Array.from(e.target.files);
    setAttachments(prev => [
      ...prev,
      ...files.map(f => ({ name: f.name, size: (f.size / 1024).toFixed(1) + ' KB' })),
    ]);
  };

  const clearChat = () => {
    setMessages([
      {
        id: Date.now().toString(),
        role: 'assistant',
        content: `Hello! I am your **${toolConfig.name}**. How can I assist your study session today?`,
      },
    ]);
  };

  return (
    <div className="h-[calc(100vh-4rem)] flex flex-col bg-white dark:bg-slate-950 text-slate-900 dark:text-slate-100">

      {/* ── Top Header ── */}
      <div className="h-16 px-4 sm:px-6 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between bg-white dark:bg-slate-900 shrink-0">
        <div className="flex items-center gap-3">
          <Button variant="secondary" size="sm" icon={ArrowLeft} onClick={() => navigate('/ai-studio')}>
            Back
          </Button>
          <div className="flex items-center gap-2">
            <div className="p-1.5 rounded-lg border border-blue-600 dark:border-blue-500 text-blue-600 dark:text-blue-400">
              <toolConfig.icon className="w-4 h-4" />
            </div>
            <div>
              <h2 className="font-bold text-xs sm:text-sm text-slate-900 dark:text-white leading-snug">
                {toolConfig.name}
              </h2>
              <p className="text-[10px] text-slate-500 dark:text-slate-400 hidden sm:block">
                {toolConfig.desc}
              </p>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-2">
          {/* Secure indicator — no key exposure */}
          <div
            className="px-2.5 py-1.5 rounded-lg border border-green-300 dark:border-green-800 text-green-700 dark:text-green-400 text-xs font-semibold flex items-center gap-1.5"
            title="AI powered by secure backend — your API key is never exposed"
          >
            <Shield className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Secure AI</span>
          </div>

          <Button variant="secondary" size="sm" icon={Trash2} onClick={clearChat}>
            Clear
          </Button>
        </div>
      </div>

      {/* ── Messages Scroll Feed ── */}
      <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-4 custom-scrollbar">
        {messages.map((msg) => (
          <div key={msg.id} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
            <div
              className={`max-w-2xl p-4 rounded-xl text-xs sm:text-sm leading-relaxed space-y-2 relative group ${
                msg.role === 'user'
                  ? 'bg-blue-600 text-white rounded-br-none'
                  : 'bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-900 dark:text-slate-100 rounded-bl-none'
              }`}
            >
              {/* Attachments */}
              {msg.attachments && msg.attachments.length > 0 && (
                <div className="flex flex-wrap gap-2 pb-2 border-b border-white/20 dark:border-slate-800">
                  {msg.attachments.map((att, idx) => (
                    <div key={idx} className="flex items-center gap-1.5 px-2 py-1 bg-white/10 dark:bg-slate-800 rounded text-[11px]">
                      <FileText className="w-3 h-3" />
                      <span>{att.name}</span>
                    </div>
                  ))}
                </div>
              )}

              <div className="prose dark:prose-invert prose-xs sm:prose-sm max-w-none">
                <ReactMarkdown>{msg.content}</ReactMarkdown>
              </div>

              {msg.role === 'assistant' && msg.content && (
                <button
                  onClick={() => copyToClipboard(msg.content, msg.id)}
                  className="absolute bottom-2 right-2 p-1.5 rounded-md bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-500 hover:text-slate-900 dark:hover:text-white opacity-0 group-hover:opacity-100 transition-opacity"
                  title="Copy text"
                >
                  {copiedId === msg.id
                    ? <Check className="w-3.5 h-3.5 text-blue-600" />
                    : <Copy className="w-3.5 h-3.5" />}
                </button>
              )}
            </div>
          </div>
        ))}

        {isTyping && (
          <div className="flex items-center gap-2 text-xs text-slate-400 font-medium">
            <Sparkles className="w-4 h-4 text-blue-600 animate-spin" />
            <span>AI is generating response...</span>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* ── Suggested Prompts ── */}
      {messages.length <= 1 && (
        <div className="px-6 py-2 flex flex-wrap gap-2">
          <span className="text-xs font-semibold text-slate-400 w-full mb-1">Try a suggested prompt:</span>
          {toolConfig.prompts.map((prompt, idx) => (
            <button
              key={idx}
              onClick={() => handleSend(prompt)}
              className="text-xs px-3 py-1.5 rounded-lg border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900 text-slate-700 dark:text-slate-300 hover:border-blue-600 hover:text-blue-600 dark:hover:text-blue-400 transition-colors flex items-center gap-1.5 text-left cursor-pointer"
            >
              <Sparkles className="w-3 h-3 text-blue-600 shrink-0" />
              <span>{prompt}</span>
            </button>
          ))}
        </div>
      )}

      {/* ── Attachments Preview ── */}
      {attachments.length > 0 && (
        <div className="px-6 py-2 flex flex-wrap gap-2 border-t border-slate-100 dark:border-slate-800">
          {attachments.map((att, idx) => (
            <div key={idx} className="flex items-center gap-2 px-3 py-1 bg-blue-50 dark:bg-blue-950/40 text-blue-600 dark:text-blue-400 border border-blue-200 dark:border-blue-800 rounded-lg text-xs">
              <FileText className="w-3.5 h-3.5" />
              <span>{att.name}</span>
              <button
                onClick={() => setAttachments(prev => prev.filter((_, i) => i !== idx))}
                className="hover:text-blue-900 ml-1"
              >
                ×
              </button>
            </div>
          ))}
        </div>
      )}

      {/* ── Input Bar ── */}
      <div className="p-4 border-t border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shrink-0">
        <div className="flex items-center gap-2 max-w-4xl mx-auto">
          <label className="p-2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 cursor-pointer rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors">
            <Paperclip className="w-5 h-5" />
            <input type="file" multiple onChange={handleFileUpload} className="hidden" />
          </label>

          <input
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSend()}
            placeholder={`Ask ${toolConfig.name}...`}
            className="flex-1 px-4 py-2.5 rounded-lg border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-white text-xs sm:text-sm focus:outline-none focus:border-blue-600 transition-colors"
          />

          <Button
            variant="primary"
            icon={Send}
            onClick={() => handleSend()}
            disabled={!inputValue.trim() || isTyping}
          >
            Send
          </Button>
        </div>
      </div>

    </div>
  );
};

export default AIToolView;
