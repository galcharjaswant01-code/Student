import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Bot, Search, Sparkles, BookOpen, GraduationCap, 
  PenTool, Code, Clock, Zap, FileText, Settings, Activity, CheckSquare, Bug
} from 'lucide-react';
import { mockAIApi } from '../services/mockAIApi';

const TOOL_CATEGORIES = [
  { id: 'all', label: 'All Tools' },
  { id: 'study', label: 'Study Assistant', icon: BookOpen },
  { id: 'exam', label: 'Exam Prep', icon: GraduationCap },
  { id: 'writing', label: 'Writing', icon: PenTool },
  { id: 'coding', label: 'Programming', icon: Code },
  { id: 'productivity', label: 'Productivity', icon: Clock }
];

const AI_TOOLS = [
  // Study Assistant
  { id: 'tutor', name: 'AI Tutor', category: 'study', icon: Bot, description: 'Chat with your personalized AI tutor.', color: 'from-blue-500 to-cyan-500' },
  { id: 'hw-helper', name: 'Homework Helper', category: 'study', icon: Zap, description: 'Step-by-step guidance for complex problems.', color: 'from-indigo-500 to-blue-500' },
  { id: 'concept-explainer', name: 'Concept Explainer', category: 'study', icon: Sparkles, description: 'Simplify complex topics like you are 5.', color: 'from-purple-500 to-pink-500' },
  { id: 'pdf-summarizer', name: 'PDF Summarizer', category: 'study', icon: FileText, description: 'Extract key points from any document.', color: 'from-emerald-500 to-teal-500' },
  
  // Exam Prep
  { id: 'quiz-gen', name: 'Quiz Generator', category: 'exam', icon: CheckSquare, description: 'Generate practice quizzes instantly.', color: 'from-orange-500 to-red-500' },
  { id: 'flashcards', name: 'Flashcard Creator', category: 'exam', icon: BookOpen, description: 'Auto-generate spaced repetition cards.', color: 'from-amber-500 to-orange-500' },
  
  // Writing
  { id: 'essay-writer', name: 'Essay Assistant', category: 'writing', icon: PenTool, description: 'Brainstorm, outline, and refine essays.', color: 'from-rose-500 to-pink-500' },
  { id: 'grammar-check', name: 'Grammar Checker', category: 'writing', icon: FileText, description: 'Advanced proofreading and style tips.', color: 'from-slate-500 to-slate-700' },
  
  // Programming
  { id: 'code-gen', name: 'Code Generator', category: 'coding', icon: Code, description: 'Write boilerplate and algorithms fast.', color: 'from-emerald-600 to-emerald-800' },
  { id: 'code-debug', name: 'Code Debugger', category: 'coding', icon: Bug, description: 'Find and fix errors in your code.', color: 'from-red-500 to-rose-700' },
  
  // Productivity
  { id: 'study-planner', name: 'Study Planner', category: 'productivity', icon: Clock, description: 'Optimize your learning schedule.', color: 'from-sky-500 to-blue-600' }
];

const AIStudio = () => {
  const navigate = useNavigate();
  const [activeCategory, setActiveCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [stats, setStats] = useState(null);

  useEffect(() => {
    mockAIApi.generateUsageStats().then(setStats);
  }, []);

  const filteredTools = AI_TOOLS.filter(tool => {
    const matchesCategory = activeCategory === 'all' || tool.category === activeCategory;
    const matchesSearch = tool.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          tool.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="h-full flex flex-col bg-slate-50 dark:bg-[#0B1120] overflow-hidden relative">
      
      {/* Background Orbs */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary/20 dark:bg-primary/10 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-purple-500/20 dark:bg-purple-500/10 rounded-full blur-[100px] pointer-events-none" />

      {/* Header Section */}
      <div className="px-6 py-8 md:px-10 z-10 shrink-0">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-8">
          <div>
            <h1 className="text-3xl md:text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-slate-900 to-slate-600 dark:from-white dark:to-slate-400 mb-2">
              AI Studio
            </h1>
            <p className="text-slate-500 dark:text-slate-400 font-medium">
              Your intelligent learning hub. What do you want to master today?
            </p>
          </div>
          
          <div className="flex items-center gap-3 w-full md:w-auto">
            <div className="relative flex-1 md:w-64">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <input 
                type="text" 
                placeholder="Search tools..." 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 bg-white/70 dark:bg-slate-800/70 border border-slate-200 dark:border-white/10 rounded-xl text-sm focus:outline-none focus:border-primary/50 focus:ring-1 focus:ring-primary/50 backdrop-blur-sm"
              />
            </div>
            <button className="p-2.5 rounded-xl bg-white/70 dark:bg-slate-800/70 border border-slate-200 dark:border-white/10 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700/70 transition-colors backdrop-blur-sm">
              <Settings className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Stats Row */}
        {stats && (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
            <div className="bg-white/60 dark:bg-slate-800/60 backdrop-blur-md rounded-2xl p-4 border border-slate-200 dark:border-white/5 shadow-sm">
              <div className="text-sm font-medium text-slate-500 dark:text-slate-400 mb-1">Chats Today</div>
              <div className="text-2xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
                {stats.chatsToday} <Bot className="w-4 h-4 text-primary" />
              </div>
            </div>
            <div className="bg-white/60 dark:bg-slate-800/60 backdrop-blur-md rounded-2xl p-4 border border-slate-200 dark:border-white/5 shadow-sm">
              <div className="text-sm font-medium text-slate-500 dark:text-slate-400 mb-1">Tokens Used</div>
              <div className="text-2xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
                {stats.tokensUsed.toLocaleString()} <Zap className="w-4 h-4 text-amber-500" />
              </div>
            </div>
            <div className="bg-white/60 dark:bg-slate-800/60 backdrop-blur-md rounded-2xl p-4 border border-slate-200 dark:border-white/5 shadow-sm">
              <div className="text-sm font-medium text-slate-500 dark:text-slate-400 mb-1">Files Analyzed</div>
              <div className="text-2xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
                {stats.filesUploaded} <FileText className="w-4 h-4 text-emerald-500" />
              </div>
            </div>
            <div className="bg-white/60 dark:bg-slate-800/60 backdrop-blur-md rounded-2xl p-4 border border-slate-200 dark:border-white/5 shadow-sm">
              <div className="text-sm font-medium text-slate-500 dark:text-slate-400 mb-1">Time Saved</div>
              <div className="text-2xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
                {stats.timeSaved} <Clock className="w-4 h-4 text-purple-500" />
              </div>
            </div>
          </div>
        )}

        {/* Categories */}
        <div className="flex overflow-x-auto gap-3 pb-2 custom-scrollbar">
          {TOOL_CATEGORIES.map(category => {
            const isActive = activeCategory === category.id;
            const Icon = category.icon;
            return (
              <button
                key={category.id}
                onClick={() => setActiveCategory(category.id)}
                className={`
                  whitespace-nowrap px-5 py-2.5 rounded-full text-sm font-bold transition-all duration-300 active:scale-[0.95] flex items-center gap-2
                  ${isActive 
                    ? 'bg-gradient-to-r from-slate-700 to-slate-800 text-white shadow-md shadow-slate-900/20 border border-transparent' 
                    : 'bg-white/50 dark:bg-slate-800/50 backdrop-blur-md text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-white/10 hover:bg-white/80 dark:hover:bg-slate-700/50'}
                `}
              >
                {Icon && <Icon className="w-4 h-4" />} {category.label}
              </button>
            )
          })}
        </div>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 overflow-y-auto px-6 md:px-10 pb-10 z-10 custom-scrollbar">
        
        {filteredTools.length === 0 ? (
          <div className="w-full h-64 flex flex-col items-center justify-center bg-white/40 dark:bg-slate-800/40 backdrop-blur-sm rounded-2xl border border-white/20 dark:border-white/5 border-dashed">
            <Search className="w-10 h-10 text-slate-400 mb-4" />
            <h3 className="text-lg font-bold text-slate-700 dark:text-slate-300">No tools found</h3>
            <p className="text-slate-500">Try a different search term.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
            {filteredTools.map(tool => (
              <div 
                key={tool.id}
                onClick={() => navigate(`/ai-studio/tool/${tool.id}`)}
                className="group relative overflow-hidden bg-white/70 dark:bg-slate-800/60 backdrop-blur-xl border border-slate-200/60 dark:border-white/5 hover:border-primary/30 dark:hover:border-primary/40 rounded-2xl p-6 cursor-pointer hover:shadow-xl dark:hover:shadow-[0_10px_40px_rgba(0,0,0,0.3)] transition-all duration-300 flex flex-col"
              >
                <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${tool.color} flex items-center justify-center text-white mb-5 shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                  <tool.icon className="w-6 h-6" />
                </div>
                <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2 group-hover:text-primary transition-colors">
                  {tool.name}
                </h3>
                <p className="text-sm font-medium text-slate-500 dark:text-slate-400">
                  {tool.description}
                </p>

                <div className="mt-auto pt-5 flex items-center text-xs font-bold text-primary opacity-0 group-hover:opacity-100 transition-opacity translate-y-2 group-hover:translate-y-0 duration-300">
                  Launch Tool <Activity className="w-3.5 h-3.5 ml-1" />
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

    </div>
  );
};

export default AIStudio;
