import React, { useState, useEffect, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { 
  ArrowLeft, Paperclip, Send, Trash2, Copy, Check, FileText, 
  Bot, Sparkles, RefreshCw, HelpCircle, Calendar, FileCheck, Code, Key, X
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
  const [showKeyModal, setShowKeyModal] = useState(false);
  const [geminiKey, setGeminiKey] = useState(() => localStorage.getItem('gemini_api_key') || '');
  const [groqKey, setGroqKey] = useState(() => localStorage.getItem('groq_api_key') || '');
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

  const saveKey = () => {
    if (geminiKey.trim()) {
      localStorage.setItem('gemini_api_key', geminiKey.trim());
    } else {
      localStorage.removeItem('gemini_api_key');
    }
    if (groqKey.trim()) {
      localStorage.setItem('groq_api_key', groqKey.trim());
    } else {
      localStorage.removeItem('groq_api_key');
    }
    setShowKeyModal(false);
  };

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

  const copyToClipboard = (text, id) => {
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
              <h2 className="font-bold text-xs sm:text-sm text-slate-900 dark:text-white leading-snug">{toolConfig.name}</h2>
              <p className="text-[10px] text-slate-500 dark:text-slate-400 hidden sm:block">{toolConfig.desc}</p>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setShowKeyModal(true)}
            className="px-2.5 py-1.5 rounded-lg border border-slate-300 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer"
            title="Configure Groq API Key"
          >
            <Key className="w-3.5 h-3.5 text-blue-600 dark:text-blue-400" />
            <span className="hidden sm:inline">{(localStorage.getItem('gemini_api_key') || localStorage.getItem('groq_api_key')) ? '🟢 Key Active' : 'Set API Key'}</span>
          </button>

          <Button variant="secondary" size="sm" icon={Trash2} onClick={clearChat}>
            Clear
          </Button>
        </div>
      </div>

      {/* API Key Modal */}
      {showKeyModal && (
        <div className="fixed inset-0 bg-slate-950/60 z-50 flex items-center justify-center p-4">
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-6 w-full max-w-md space-y-4 shadow-xl">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Key className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                <h3 className="font-bold text-sm text-slate-900 dark:text-white">Groq API Key Settings</h3>
              </div>
              <button onClick={() => setShowKeyModal(false)} className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-200">
                <X className="w-5 h-5" />
              </button>
            </div>

            <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
              Add your <strong>Google Gemini</strong> or <strong>Groq</strong> API key to enable live AI streaming. Keys are saved in your browser's localStorage only.
            </p>

            <div className="space-y-3">
              <div>
                <label className="text-[11px] font-semibold text-slate-600 dark:text-slate-400 uppercase tracking-wider block mb-1">Google Gemini API Key (Recommended — free, no CORS)</label>
                <input
                  type="password"
                  value={geminiKey}
                  onChange={(e) => setGeminiKey(e.target.value)}
                  placeholder="Paste Gemini API Key (AIza...)"
                  className="w-full px-3 py-2 text-xs rounded-lg border border-slate-300 dark:border-slate-700 bg-transparent text-slate-900 dark:text-white focus:border-blue-600 outline-none font-mono"
                />
              </div>
              <div>
                <label className="text-[11px] font-semibold text-slate-600 dark:text-slate-400 uppercase tracking-wider block mb-1">Groq API Key (Optional fallback)</label>
                <input
                  type="password"
                  value={groqKey}
                  onChange={(e) => setGroqKey(e.target.value)}
                  placeholder="Paste Groq API Key (gsk_...)"
                  className="w-full px-3 py-2 text-xs rounded-lg border border-slate-300 dark:border-slate-700 bg-transparent text-slate-900 dark:text-white focus:border-blue-600 outline-none font-mono"
                />
              </div>
            </div>

            <p className="text-[11px] text-slate-400 dark:text-slate-500">Get a free Gemini key at <a href="https://aistudio.google.com/app/apikey" target="_blank" className="text-blue-600 underline">aistudio.google.com</a></p>

            <div className="flex items-center justify-end gap-2 pt-2">
              <Button variant="secondary" size="sm" onClick={() => setShowKeyModal(false)}>Cancel</Button>
              <Button variant="primary" size="sm" onClick={saveKey}>Save Key</Button>
            </div>
          </div>
        </div>
      )}

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
                  {copiedId === msg.id ? <Check className="w-3.5 h-3.5 text-blue-600" /> : <Copy className="w-3.5 h-3.5" />}
                </button>
              )}
            </div>
          </div>
        ))}

        {isTyping && (
          <div className="flex items-center gap-2 text-xs text-slate-400 font-medium">
            <Sparkles className="w-4 h-4 text-blue-600 animate-spin" />
            <span>AI is typing response...</span>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Suggested Prompts */}
      {messages.length <= 1 && (
        <div className="px-6 py-2 flex flex-wrap gap-2">
          <span className="text-xs font-semibold text-slate-400 w-full mb-1">Try one of these suggested prompts:</span>
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

      {/* Attachments Preview */}
      {attachments.length > 0 && (
        <div className="px-6 py-2 flex flex-wrap gap-2 border-t border-slate-100 dark:border-slate-800">
          {attachments.map((att, idx) => (
            <div key={idx} className="flex items-center gap-2 px-3 py-1 bg-blue-50 dark:bg-blue-950/40 text-blue-600 dark:text-blue-400 border border-blue-200 dark:border-blue-800 rounded-lg text-xs">
              <FileText className="w-3.5 h-3.5" />
              <span>{att.name}</span>
              <button onClick={() => setAttachments(prev => prev.filter((_, i) => i !== idx))} className="hover:text-blue-900">
                ×
              </button>
            </div>
          ))}
        </div>
      )}

      {/* Input Box Bar */}
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

          <Button variant="primary" icon={Send} onClick={() => handleSend()} disabled={!inputValue.trim() || isTyping}>
            Send
          </Button>
        </div>
      </div>

    </div>
  );
};

export default AIToolView;
