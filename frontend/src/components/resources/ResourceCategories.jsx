import React from 'react';
import { Book, Code, Calculator, Globe, Database, PenTool } from 'lucide-react';

const categories = [
  { name: 'Computer Science', icon: Code, color: 'text-blue-500', bg: 'bg-blue-100 dark:bg-blue-900/30' },
  { name: 'Mathematics', icon: Calculator, color: 'text-purple-500', bg: 'bg-purple-100 dark:bg-purple-900/30' },
  { name: 'History', icon: Globe, color: 'text-amber-500', bg: 'bg-amber-100 dark:bg-amber-900/30' },
  { name: 'Data Science', icon: Database, color: 'text-emerald-500', bg: 'bg-emerald-100 dark:bg-emerald-900/30' },
  { name: 'Design', icon: PenTool, color: 'text-pink-500', bg: 'bg-pink-100 dark:bg-pink-900/30' },
  { name: 'Literature', icon: Book, color: 'text-indigo-500', bg: 'bg-indigo-100 dark:bg-indigo-900/30' },
];

const ResourceCategories = () => {
  return (
    <div className="w-full overflow-x-auto pb-4 scrollbar-hide">
      <div className="flex gap-4 min-w-max">
        {categories.map((cat, i) => (
          <button 
            key={i}
            className="flex items-center gap-3 bg-white dark:bg-gray-800 px-5 py-3 rounded-sm border border-gray-100 dark:border-gray-700/50 -[0_2px_10px_rgba(0,0,0,0.02)] hover: group"
          >
            <div className={`p-2 rounded-sm ${cat.bg} group- `}>
              <cat.icon className={`w-4 h-4 ${cat.color}`} />
            </div>
            <span className="font-semibold text-gray-700 dark:text-gray-200 text-sm">
              {cat.name}
            </span>
          </button>
        ))}
      </div>
    </div>
  );
};

export default ResourceCategories;
