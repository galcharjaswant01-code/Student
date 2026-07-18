import React, { useState } from 'react';
import { codingAssistant } from '../../services/aiService';

const CodingAssistant = () => {
  const [query, setQuery] = useState('');
  const [response, setResponse] = useState('');
  const [loading, setLoading] = useState(false);

  const handleAsk = async () => {
    if (!query.trim()) return;
    
    setLoading(true);
    setResponse('');
    
    try {
      const data = await codingAssistant(query);
      setResponse(data.response);
    } catch (error) {
      setResponse('Error connecting to the Coding Assistant API.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-slate-800/30 rounded-sm p-6 border border-slate-700/50 -[0_0_50px_rgba(0,0,0,0.3)] flex flex-col h-full w-full max-h-[calc(100vh-140px)] relative">
      <div className="flex items-center justify-between mb-6 border-b border-slate-700/50 pb-4 shrink-0">
        <div className="flex items-center space-x-4">
          <div className="w-12 h-12 rounded-sm bg-gradient- bg-emerald-400 flex items-center justify-center -emerald-500/20">
            <span className="text-2xl">💻</span>
          </div>
          <div>
            <h2 className="text-2xl font-bold text-white tracking-tight">Coding Assistant</h2>
            <div className="flex items-center gap-2 mt-1">
              <p className="text-emerald-400 text-xs font-medium uppercase tracking-wider">Debug and generate code snippets</p>
            </div>
          </div>
        </div>
      </div>

      <div className="flex-1 flex flex-col min-h-0 overflow-hidden space-y-4">
        <div className="flex space-x-3 shrink-0">
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleAsk()}
            placeholder="Ask a coding question (e.g., 'Write a React hook to fetch data...')"
            className="flex-1 bg-slate-900/80 border border-slate-700/50 rounded-sm px-5 py-4 text-white focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 font-mono text-sm"
          />
          <button
            onClick={handleAsk}
            disabled={loading || !query.trim()}
            className="bg-gradient- bg-emerald-500 hover:bg-emerald-400 hover: text-slate-900 px-8 py-4 rounded-sm font-bold -emerald-500/20 disabled:opacity-50 disabled:scale-100 shrink-0"
          >
            {loading ? (
              <span className="flex items-center gap-2">
                <div className="w-4 h-4 border-2 border-slate-900/30 border-t-slate-900 rounded-full animate-spin"></div>
                Compiling...
              </span>
            ) : 'Generate Code'}
          </button>
        </div>

        <div className="flex-1 overflow-y-auto bg-[#0a0a0a] rounded-sm p-6 font-mono text-sm border border-slate-700/50 custom-scrollbar relative">
          {/* Editor Top Bar Mockup */}
          <div className="absolute top-0 left-0 right-0 h-8 bg-[#1a1a1a] border-b border-slate-800 flex items-center px-4 gap-2">
            <div className="w-3 h-3 rounded-full bg-red-500/80"></div>
            <div className="w-3 h-3 rounded-full bg-yellow-500/80"></div>
            <div className="w-3 h-3 rounded-full bg-green-500/80"></div>
            <span className="ml-4 text-xs text-slate-500 font-sans">assistant.js</span>
          </div>

          <div className="mt-6">
            {response ? (
              <div className="prose prose-invert prose-pre:bg-transparent prose-pre:p-0 max-w-none text-emerald-400/90 whitespace-pre-wrap leading-relaxed">
                {response}
              </div>
            ) : (
              <div className="h-full flex flex-col items-center justify-center text-slate-600 mt-20 space-y-4">
                <span className="text-4xl opacity-50">👨‍💻</span>
                <p>Paste your code here or ask a programming question to get started.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CodingAssistant;
