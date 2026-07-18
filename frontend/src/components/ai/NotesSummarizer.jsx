import React, { useState } from 'react';
import { notesSummarizer } from '../../services/aiService';

const NotesSummarizer = () => {
  const [text, setText] = useState('');
  const [file, setFile] = useState(null);
  const [summary, setSummary] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSummarize = async () => {
    if (!text.trim() && !file) return;
    
    setLoading(true);
    setSummary('');
    
    try {
      const data = await notesSummarizer(text, file);
      setSummary(data.summary);
    } catch (error) {
      setSummary('Error connecting to the Summarizer API.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-slate-800/30 rounded-sm p-6 border border-slate-700/50 -[0_0_50px_rgba(0,0,0,0.3)] flex flex-col h-full w-full max-h-[calc(100vh-140px)]">
      <div className="flex items-center justify-between mb-6 border-b border-slate-700/50 pb-4 shrink-0">
        <div className="flex items-center space-x-4">
          <div className="w-12 h-12 rounded-sm bg-gradient- bg-purple-500 flex items-center justify-center -purple-500/20">
            <span className="text-2xl">📝</span>
          </div>
          <div>
            <h2 className="text-2xl font-bold text-white tracking-tight">AI Notes Summarizer</h2>
            <div className="flex items-center gap-2 mt-1">
              <p className="text-purple-400 text-xs font-medium uppercase tracking-wider">Distill hours of lectures into seconds</p>
            </div>
          </div>
        </div>
      </div>

      <div className="flex-1 flex flex-col lg:flex-row gap-6 min-h-0 overflow-hidden">
        
        {/* Input Column */}
        <div className="flex-1 flex flex-col space-y-4">
          <textarea
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Paste your extensive lecture notes here, or type instructions for the attached document..."
            className="flex-1 bg-slate-900/50 border border-slate-700/50 rounded-sm p-5 text-white focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500 resize-none custom-scrollbar"
          />

          <div className="flex items-center space-x-4 shrink-0">
            <label className="cursor-pointer bg-slate-800 hover:bg-slate-700 text-slate-300 px-6 py-4 rounded-sm font-medium flex-1 text-center truncate border border-slate-700/50 hover:border-slate-600">
              <span className="mr-2">{file ? '✅' : '📄'}</span>
              {file ? file.name : 'Attach Document (PDF, TXT, DOCX)'}
              <input 
                type="file" 
                className="hidden" 
                onChange={(e) => setFile(e.target.files[0])}
                accept=".pdf,.doc,.docx,.txt"
              />
            </label>
          </div>
          
          <button
            onClick={handleSummarize}
            disabled={loading || (!text.trim() && !file)}
            className="bg-gradient- bg-purple-600 hover:bg-purple-500 hover: text-white py-4 rounded-sm font-bold text-lg -purple-500/25 disabled:opacity-50 disabled:scale-100 active:scale-[0.98] shrink-0"
          >
            {loading ? (
              <span className="flex items-center justify-center gap-2">
                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                Analyzing Document...
              </span>
            ) : 'Generate Executive Summary'}
          </button>
        </div>

        {/* Output Column */}
        <div className="flex-1 bg-slate-900/50 border border-slate-700/50 rounded-sm p-5 overflow-hidden flex flex-col">
          <div className="flex items-center justify-between mb-4 shrink-0 border-b border-slate-800 pb-2">
            <h3 className="text-purple-400 font-bold uppercase tracking-wider text-sm flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-purple-500"></span>
              Generated Summary
            </h3>
          </div>
          <div className="flex-1 overflow-y-auto custom-scrollbar pr-2">
            {!summary && !loading && (
              <div className="h-full flex flex-col items-center justify-center text-slate-600 text-center space-y-3">
                <span className="text-4xl opacity-50">✨</span>
                <p>Your distilled summary will appear here.<br/>Ready to process thousands of words instantly.</p>
              </div>
            )}
            {summary && (
              <div className="prose prose-invert prose-purple max-w-none">
                <p className="text-slate-300 leading-relaxed whitespace-pre-wrap">{summary}</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default NotesSummarizer;
