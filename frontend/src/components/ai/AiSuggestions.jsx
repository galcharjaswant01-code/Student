import React from 'react';
import { BookOpen, Code, FileText, Lightbulb } from 'lucide-react';

const suggestions = [
  {
    icon: Lightbulb,
    title: 'Explain Quantum Mechanics',
    description: 'Break down complex concepts into simple terms',
    color: 'text-amber-500',
    bg: 'bg-amber-100 dark:bg-amber-900/30'
  },
  {
    icon: FileText,
    title: 'Summarize my notes',
    description: 'Upload a PDF and get a quick summary',
    color: 'text-blue-500',
    bg: 'bg-blue-100 dark:bg-blue-900/30'
  },
  {
    icon: Code,
    title: 'Help me debug this React code',
    description: 'Paste your error and get a solution',
    color: 'text-emerald-500',
    bg: 'bg-emerald-100 dark:bg-emerald-900/30'
  },
  {
    icon: BookOpen,
    title: 'Create a study guide',
    description: 'Generate flashcards for Chapter 4',
    color: 'text-purple-500',
    bg: 'bg-purple-100 dark:bg-purple-900/30'
  }
];

const AiSuggestions = ({ onSuggest }) => {
  return (
    <div className="w-full max-w-4xl mx-auto px-4 mt-12 mb-8">
      <div className="flex flex-col items-center text-center mb-8">
        <div className="w-16 h-16 rounded-sm bg-gradient- bg-indigo-500 flex items-center justify-center text-white -[0_4px_20px_rgba(99,102,241,0.4)] mb-6">
          <Lightbulb className="w-8 h-8" />
        </div>
        <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">How can I help you today?</h2>
        <p className="text-gray-500 dark:text-gray-400 max-w-md">I'm EduSphere AI, your personal tutor. Ask me a question or try one of these suggestions.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {suggestions.map((item, index) => (
          <button
            key={index}
            onClick={() => onSuggest(item.title)}
            className="flex items-start gap-4 p-4 bg-white dark:bg-[#111827] rounded-sm border border-gray-200 dark:border-gray-800 hover:border-indigo-500 dark:hover:border-indigo-500 hover: text-left group"
          >
            <div className={`p-3 rounded-sm ${item.bg} shrink-0 group- `}>
              <item.icon className={`w-5 h-5 ${item.color}`} />
            </div>
            <div>
              <h4 className="font-semibold text-gray-900 dark:text-white text-sm mb-0.5 group-hover:text-indigo-600 dark:group-hover:text-indigo-400">{item.title}</h4>
              <p className="text-xs text-gray-500 dark:text-gray-400">{item.description}</p>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
};

export default AiSuggestions;
