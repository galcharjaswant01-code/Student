import React from 'react';
import { Bot, User, Copy, ThumbsUp, ThumbsDown, RotateCcw } from 'lucide-react';
import ReactMarkdown from 'react-markdown';

const AiMessage = ({ message }) => {
  const isAi = message.sender === 'ai';

  return (
    <div className={`py-6 px-4 sm:px-6 w-full ${isAi ? 'bg-white dark:bg-[#111827]' : 'bg-transparent'}`}>
      <div className="max-w-4xl mx-auto flex gap-4 sm:gap-6">
        
        {/* Avatar */}
        <div className="shrink-0 mt-1">
          {isAi ? (
            <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-sm bg-gradient- bg-indigo-500 flex items-center justify-center text-white -[0_2px_10px_rgba(99,102,241,0.4)]">
              <Bot className="w-5 h-5 sm:w-6 sm:h-6" />
            </div>
          ) : (
            <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-gray-200 dark:bg-gray-700 flex items-center justify-center text-gray-500 dark:text-gray-400 overflow-hidden border border-gray-300 dark:border-gray-600">
              <User className="w-5 h-5" />
            </div>
          )}
        </div>

        {/* Content */}
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-1.5">
            <span className="font-bold text-sm sm:text-base text-gray-900 dark:text-white">
              {isAi ? 'EduSphere AI' : 'You'}
            </span>
            <span className="text-xs text-gray-400">{message.timestamp}</span>
          </div>
          
          <div className="prose prose-sm sm:prose-base dark:prose-invert prose-indigo max-w-none text-gray-700 dark:text-gray-300">
            <ReactMarkdown>
              {message.text}
            </ReactMarkdown>
          </div>

          {/* Quick Actions (Only for AI) */}
          {isAi && (
            <div className="mt-4 flex items-center gap-2 opacity-0 group-hover:opacity-100">
              <div className="flex items-center bg-gray-100 dark:bg-gray-800 rounded-sm p-1 opacity-70 hover:opacity-100">
                <button className="p-1.5 text-gray-500 hover:text-indigo-600 dark:hover:text-indigo-400 rounded-md" title="Copy">
                  <Copy className="w-4 h-4" />
                </button>
                <button className="p-1.5 text-gray-500 hover:text-emerald-600 dark:hover:text-emerald-400 rounded-md" title="Good Response">
                  <ThumbsUp className="w-4 h-4" />
                </button>
                <button className="p-1.5 text-gray-500 hover:text-red-600 dark:hover:text-red-400 rounded-md" title="Bad Response">
                  <ThumbsDown className="w-4 h-4" />
                </button>
              </div>
              <button className="flex items-center gap-1.5 px-2.5 py-1.5 text-xs font-medium text-gray-500 hover:text-indigo-600 dark:hover:text-indigo-400 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-sm">
                <RotateCcw className="w-3.5 h-3.5" />
                Regenerate
              </button>
            </div>
          )}
        </div>

      </div>
    </div>
  );
};

export default AiMessage;
