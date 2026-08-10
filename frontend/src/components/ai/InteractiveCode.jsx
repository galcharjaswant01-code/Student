import React, { useState } from 'react';
import { Code, Copy, Check, Terminal } from 'lucide-react';

const InteractiveCode = ({ data }) => {
  const code = data?.code || '';
  const explanation = data?.explanation || '';
  const [copied, setCopied] = useState(false);

  if (!code && !explanation) return null;

  const handleCopy = () => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="my-3 rounded-2xl border border-slate-200 dark:border-slate-800 bg-slate-900 text-white shadow-sm overflow-hidden max-w-xl">
      {/* Code Header */}
      <div className="px-4 py-2.5 bg-slate-950 border-b border-slate-800 flex items-center justify-between">
        <div className="flex items-center gap-2 text-xs font-mono text-blue-400">
          <Terminal className="w-4 h-4" />
          <span>Code Assistant Solution</span>
        </div>
        <button
          onClick={handleCopy}
          className="flex items-center gap-1 text-[11px] font-medium px-2 py-1 rounded bg-slate-800 hover:bg-slate-700 text-slate-300 transition-colors"
        >
          {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
          <span>{copied ? 'Copied' : 'Copy Code'}</span>
        </button>
      </div>

      {/* Code Snippet Box */}
      {code && (
        <div className="p-4 overflow-x-auto bg-slate-950 font-mono text-xs text-slate-200 leading-relaxed custom-scrollbar">
          <pre>{code}</pre>
        </div>
      )}

      {/* Explanation Footer */}
      {explanation && (
        <div className="p-4 bg-slate-900 border-t border-slate-800 text-xs text-slate-300 space-y-1">
          <p className="font-semibold text-white flex items-center gap-1.5">
            <Code className="w-3.5 h-3.5 text-blue-400" />
            <span>Algorithm Explanation:</span>
          </p>
          <p className="text-slate-400 leading-relaxed">{explanation}</p>
        </div>
      )}
    </div>
  );
};

export default InteractiveCode;
