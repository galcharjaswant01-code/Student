import React, { useState, useEffect, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { 
  ArrowLeft, Paperclip, Send, StopCircle, RefreshCw, 
  Trash2, Copy, Check, File, FileText, Image as ImageIcon, Bot
} from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism';
import { aiService } from '../services/aiService';

const TOOL_NAMES = {
  'tutor': 'AI Tutor',
  'hw-helper': 'Homework Helper',
  'concept-explainer': 'Concept Explainer',
  'pdf-summarizer': 'PDF Summarizer',
  'quiz-gen': 'Quiz Generator',
  'flashcards': 'Flashcard Creator',
  'essay-writer': 'Essay Assistant',
  'grammar-check': 'Grammar Checker',
  'code-gen': 'Code Generator',
  'code-debug': 'Code Debugger',
  'study-planner': 'Study Planner'
};

const SUGGESTED_PROMPTS = [
  "Explain quantum computing simply",
  "Write a Python script to sort an array",
  "Summarize the plot of Hamlet",
  "Create a study schedule for finals"
];

const AIToolView = () => {
  const { toolId } = useParams();
  const navigate = useNavigate();
  const [messages, setMessages] = useState([]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [attachments, setAttachments] = useState([]);
  const messagesEndRef = useRef(null);

  const toolName = TOOL_NAMES[toolId] || 'AI Assistant';

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  useEffect(() => {
    // Initial greeting
    setMessages([
      { id: '1', role: 'assistant', content: `Hello! I'm your ${toolName}. How can I help you today?` }
    ]);
  }, [toolId, toolName]);

  // Helper to read plain text files
  const readTextFile = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = (e) => resolve(e.target.result);
      reader.onerror = (e) => reject(e);
      reader.readAsText(file);
    });
  };

  // Helper to read PDF files using PDF.js from CDN
  const readPdfFile = async (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = async (e) => {
        try {
          const typedarray = new Uint8Array(e.target.result);
          
          // Load PDF.js dynamically if not already loaded
          if (!window.pdfjsLib) {
            await new Promise((res, rej) => {
              const script = document.createElement('script');
              script.src = 'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.4.120/pdf.min.js';
              script.onload = () => {
                window.pdfjsLib.GlobalWorkerOptions.workerSrc = 'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.4.120/pdf.worker.min.js';
                res();
              };
              script.onerror = rej;
              document.head.appendChild(script);
            });
          }

          const pdf = await window.pdfjsLib.getDocument({ data: typedarray }).promise;
          let text = '';
          for (let i = 1; i <= pdf.numPages; i++) {
            const page = await pdf.getPage(i);
            const content = await page.getTextContent();
            const pageText = content.items.map(item => item.str).join(' ');
            text += pageText + '\n';
          }
          resolve(text);
        } catch (err) {
          reject(err);
        }
      };
      reader.onerror = (e) => reject(e);
      reader.readAsArrayBuffer(file);
    });
  };

  const handleSend = async (content = inputValue) => {
    if (!content.trim() && attachments.length === 0) return;

    const currentAttachments = [...attachments];

    const newMessage = { 
      id: Date.now().toString(), 
      role: 'user', 
      content: content.trim(),
      attachments: currentAttachments.map(att => ({ name: att.name, type: att.type, url: att.url }))
    };
    
    setMessages(prev => [...prev, newMessage]);
    setInputValue('');
    setAttachments([]);
    setIsTyping(true);

    // Extract file contents if there are any attachments
    let fileContentsText = '';
    for (const attachment of currentAttachments) {
      if (attachment.file) {
        try {
          let extractedText = '';
          if (attachment.type === 'application/pdf' || attachment.name.toLowerCase().endsWith('.pdf')) {
            extractedText = await readPdfFile(attachment.file);
          } else if (
            attachment.type.startsWith('text/') || 
            attachment.name.toLowerCase().endsWith('.txt') || 
            attachment.name.toLowerCase().endsWith('.js') || 
            attachment.name.toLowerCase().endsWith('.py') || 
            attachment.name.toLowerCase().endsWith('.json') || 
            attachment.name.toLowerCase().endsWith('.csv') || 
            attachment.name.toLowerCase().endsWith('.md')
          ) {
            extractedText = await readTextFile(attachment.file);
          }
          
          if (extractedText) {
            const maxChars = 3000;
            const isTruncated = extractedText.length > maxChars;
            const textToUse = isTruncated ? extractedText.slice(0, maxChars) + "\n\n[File contents truncated due to Groq API free tier size limits...]" : extractedText;
            fileContentsText += `\n\n--- START OF FILE: ${attachment.name} ---\n${textToUse}\n--- END OF FILE: ${attachment.name} ---\n`;
          }
        } catch (fileErr) {
          console.error('Error reading attachment:', fileErr);
        }
      }
    }

    // Placeholder for streaming response
    const assistantMsgId = (Date.now() + 1).toString();
    setMessages(prev => [...prev, { id: assistantMsgId, role: 'assistant', content: '' }]);

    let accumulatedResponse = '';

    try {
      const systemPrompt = `You are a helpful, expert AI assistant acting as a ${toolName}. Provide concise, clear, and extremely accurate responses formatted in markdown. Use code blocks with appropriate languages when necessary.`;
      
      const historyForApi = [
        ...messages.map(m => ({ role: m.role, content: m.content })),
        { role: 'user', content: `${content.trim()}${fileContentsText}`.trim() }
      ];

      await aiService.sendMessageStream(historyForApi, systemPrompt, (chunk) => {
        accumulatedResponse += chunk;
        setMessages(prev => 
          prev.map(msg => msg.id === assistantMsgId ? { ...msg, content: accumulatedResponse } : msg)
        );
      });
    } catch (error) {
      console.error(error);
      const errorMsg = error?.message || 'Unknown error';
      setMessages(prev => 
        prev.map(msg => msg.id === assistantMsgId ? { ...msg, content: `Sorry, I encountered an error: ${errorMsg}` } : msg)
      );
    }

    setIsTyping(false);
  };

  const handleFileUpload = (e) => {
    const files = Array.from(e.target.files);
    const newAttachments = files.map(f => ({
      name: f.name,
      type: f.type,
      url: URL.createObjectURL(f),
      file: f // Keep reference to actual File object to read its content
    }));
    setAttachments(prev => [...prev, ...newAttachments]);
  };

  const removeAttachment = (index) => {
    setAttachments(prev => prev.filter((_, i) => i !== index));
  };

  const clearChat = () => {
    setMessages([{ id: Date.now().toString(), role: 'assistant', content: `Hello! I'm your ${toolName}. How can I help you today?` }]);
  };

  return (
    <div className="h-full flex flex-col bg-slate-50 dark:bg-[#0B1120] relative overflow-hidden">
      
      {/* Header */}
      <div className="h-16 shrink-0 bg-white/70 dark:bg-slate-800/70 backdrop-blur-md border-b border-slate-200 dark:border-white/10 flex items-center justify-between px-6 z-20">
        <div className="flex items-center gap-4">
          <button 
            onClick={() => navigate('/ai-studio')}
            className="p-2 -ml-2 text-slate-500 hover:text-slate-900 dark:hover:text-white rounded-lg hover:bg-slate-100 dark:hover:bg-slate-700/50 transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-primary to-blue-600 flex items-center justify-center text-white shadow-md">
              <Bot className="w-4 h-4" />
            </div>
            <h2 className="font-bold text-slate-900 dark:text-white">{toolName}</h2>
          </div>
        </div>
        
        <div className="flex items-center gap-2">
          <button 
            onClick={clearChat}
            className="p-2 text-slate-500 hover:text-red-500 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-700/50 transition-colors"
            title="Clear Chat"
          >
            <Trash2 className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Chat Area */}
      <div className="flex-1 overflow-y-auto p-6 custom-scrollbar z-10 space-y-6">
        {messages.map((msg) => (
          <div key={msg.id} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
            <div className={`max-w-[85%] md:max-w-[75%] rounded-2xl p-5 ${
              msg.role === 'user' 
                ? 'bg-gradient-to-br from-slate-700 to-slate-800 text-white shadow-md shadow-slate-900/10 rounded-tr-sm' 
                : 'bg-white dark:bg-slate-800/80 border border-slate-200 dark:border-white/5 text-slate-800 dark:text-slate-200 shadow-sm rounded-tl-sm'
            }`}>
              
              {/* Attachments Display */}
              {msg.attachments && msg.attachments.length > 0 && (
                <div className="flex flex-wrap gap-2 mb-3">
                  {msg.attachments.map((file, i) => (
                    <div key={i} className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-white/10 border border-white/20 text-xs font-medium">
                      <File className="w-3.5 h-3.5" />
                      <span className="truncate max-w-[150px]">{file.name}</span>
                    </div>
                  ))}
                </div>
              )}

              {/* Message Content with Markdown */}
              <div className="prose prose-sm dark:prose-invert max-w-none">
                <ReactMarkdown
                  components={{
                    code({node, inline, className, children, ...props}) {
                      const match = /language-(\w+)/.exec(className || '')
                      return !inline && match ? (
                        <SyntaxHighlighter
                          children={String(children).replace(/\n$/, '')}
                          style={vscDarkPlus}
                          language={match[1]}
                          PreTag="div"
                          className="rounded-xl overflow-hidden my-4 text-[13px]"
                          {...props}
                        />
                      ) : (
                        <code className={`${className} bg-black/10 dark:bg-white/10 px-1.5 py-0.5 rounded-md`} {...props}>
                          {children}
                        </code>
                      )
                    }
                  }}
                >
                  {msg.content}
                </ReactMarkdown>
                
                {msg.role === 'assistant' && msg.content === '' && isTyping && (
                  <div className="flex items-center gap-1.5 h-6">
                    <div className="w-2 h-2 rounded-full bg-slate-400 animate-bounce" style={{ animationDelay: '0ms' }} />
                    <div className="w-2 h-2 rounded-full bg-slate-400 animate-bounce" style={{ animationDelay: '150ms' }} />
                    <div className="w-2 h-2 rounded-full bg-slate-400 animate-bounce" style={{ animationDelay: '300ms' }} />
                  </div>
                )}
              </div>
            </div>
          </div>
        ))}
        
        {messages.length === 1 && (
          <div className="flex flex-wrap gap-2 mt-8 max-w-3xl mx-auto">
            {SUGGESTED_PROMPTS.map((prompt, i) => (
              <button
                key={i}
                onClick={() => handleSend(prompt)}
                className="px-4 py-2 bg-white/60 dark:bg-slate-800/60 border border-slate-200 dark:border-white/5 rounded-xl text-sm text-slate-600 dark:text-slate-300 hover:border-primary/50 hover:text-primary transition-all backdrop-blur-sm"
              >
                {prompt}
              </button>
            ))}
          </div>
        )}
        
        <div ref={messagesEndRef} />
      </div>

      {/* Input Area */}
      <div className="p-4 md:p-6 bg-white/70 dark:bg-slate-800/70 backdrop-blur-md border-t border-slate-200 dark:border-white/10 z-20 shrink-0">
        <div className="max-w-4xl mx-auto relative">
          
          {/* Active Attachments */}
          {attachments.length > 0 && (
            <div className="absolute bottom-full left-0 mb-3 w-full flex items-center gap-2 overflow-x-auto pb-1 custom-scrollbar">
              {attachments.map((file, i) => (
                <div key={i} className="flex items-center gap-2 px-3 py-1.5 bg-white dark:bg-slate-800 border border-slate-200 dark:border-white/10 rounded-xl shadow-sm text-xs font-medium">
                  {file.type.includes('image') ? <ImageIcon className="w-3.5 h-3.5 text-blue-500" /> : <FileText className="w-3.5 h-3.5 text-amber-500" />}
                  <span className="truncate max-w-[120px] dark:text-slate-200">{file.name}</span>
                  <button onClick={() => removeAttachment(i)} className="p-0.5 hover:bg-slate-100 dark:hover:bg-slate-700 rounded-md">
                    <Trash2 className="w-3.5 h-3.5 text-slate-400 hover:text-red-500" />
                  </button>
                </div>
              ))}
            </div>
          )}

          <div className="relative flex items-end gap-2 bg-white dark:bg-[#1E293B] border border-slate-200 dark:border-slate-700 rounded-2xl shadow-sm focus-within:ring-2 focus-within:ring-primary/20 focus-within:border-primary transition-all p-2">
            
            <label className="p-3 text-slate-400 hover:text-primary cursor-pointer transition-colors rounded-xl hover:bg-slate-50 dark:hover:bg-slate-800 shrink-0">
              <input type="file" multiple className="hidden" onChange={handleFileUpload} />
              <Paperclip className="w-5 h-5" />
            </label>
            
            <textarea
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter' && !e.shiftKey) {
                  e.preventDefault();
                  handleSend();
                }
              }}
              placeholder={`Message ${toolName}...`}
              className="flex-1 max-h-40 min-h-[44px] bg-transparent resize-none py-3 px-2 text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-none custom-scrollbar"
              rows={1}
            />
            
            <button
              onClick={() => isTyping ? null : handleSend()}
              disabled={(!inputValue.trim() && attachments.length === 0) || isTyping}
              className={`p-3 rounded-xl shrink-0 transition-all ${
                inputValue.trim() || attachments.length > 0
                  ? 'bg-gradient-to-r from-primary to-blue-600 text-white shadow-md' 
                  : 'bg-slate-100 dark:bg-slate-800 text-slate-400'
              }`}
            >
              {isTyping ? <StopCircle className="w-5 h-5" /> : <Send className="w-5 h-5" />}
            </button>
          </div>
          <div className="text-center mt-3 flex flex-col gap-1">
            <span className="text-[11px] text-slate-400 font-medium">AI can make mistakes. Verify important information.</span>
            <span className="text-[10px] text-slate-500 font-semibold">Active Model: llama-3.1-8b-instant (Max file limit: 3,000 characters). Powered by Groq.</span>
          </div>
        </div>
      </div>

    </div>
  );
};

export default AIToolView;
