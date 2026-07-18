import React from 'react';
import { Terminal, ChevronRight, CheckCircle2 } from 'lucide-react';

const CodingPractice = () => {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-sm p-6 -[0_2px_10px_rgba(0,0,0,0.02)] border border-gray-100 dark:border-gray-700/50 flex flex-col h-full">
      <div className="flex justify-between items-center mb-6">
        <h3 className="font-bold text-gray-900 dark:text-white flex items-center gap-2">
          <Terminal className="w-5 h-5 text-emerald-500" />
          Coding Practice
        </h3>
        <button className="text-sm text-emerald-600 hover:text-emerald-500 font-medium">Browse All</button>
      </div>

      <div className="flex-1 flex flex-col justify-center">
        <div className="bg-gray-900 rounded-sm p-4 font-mono text-sm text-gray-300 mb-6 border border-gray-800">
          <div className="flex gap-2 mb-2">
            <div className="w-2.5 h-2.5 rounded-full bg-red-500"></div>
            <div className="w-2.5 h-2.5 rounded-full bg-amber-500"></div>
            <div className="w-2.5 h-2.5 rounded-full bg-green-500"></div>
          </div>
          <p><span className="text-pink-400">def</span> <span className="text-blue-400">dfs</span>(graph, start):</p>
          <p className="ml-4 text-gray-500"># TODO: Implement DFS</p>
          <p className="ml-4"><span className="text-pink-400">return</span> visited</p>
        </div>

        <div className="flex items-center justify-between mb-4">
          <div>
            <h4 className="font-semibold text-gray-900 dark:text-white text-sm">Depth First Search</h4>
            <p className="text-xs text-gray-500 mt-0.5">Algorithms • Python</p>
          </div>
          <div className="flex items-center gap-1 text-emerald-500 text-xs font-semibold bg-emerald-50 dark:bg-emerald-500/10 px-2 py-1 rounded-md">
            <CheckCircle2 className="w-3 h-3" />
            Easy
          </div>
        </div>

        <button className="w-full py-2.5 rounded-sm bg-gray-50 dark:bg-gray-700/30 text-gray-900 dark:text-white font-medium text-sm flex items-center justify-center gap-2 hover:bg-emerald-50 hover:text-emerald-600 dark:hover:bg-emerald-500/10 dark:hover:text-emerald-400 border border-gray-200 dark:border-gray-700">
          Start Challenge
        </button>
      </div>
    </div>
  );
};

export default CodingPractice;
