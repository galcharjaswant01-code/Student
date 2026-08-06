import React from 'react';

const categories = [
  'All Courses',
  'In Progress',
  'Completed',
  'Computer Science',
  'Mathematics',
  'Physics',
  'Design',
];

const CourseCategories = ({ activeCategory, setActiveCategory }) => {
  return (
    <div className="flex overflow-x-auto gap-3 pb-2 scrollbar-hide">
      {categories.map((cat, index) => {
        const isActive = activeCategory === cat;
        return (
          <button
            key={index}
            onClick={() => setActiveCategory(cat)}
            className={`
              whitespace-nowrap px-5 py-2.5 rounded-full text-sm font-bold transition-all duration-300 active:scale-[0.95]
              ${isActive 
                ? 'bg-gradient-to-r from-slate-700 to-slate-800 text-white shadow-md shadow-slate-900/20 border border-transparent' 
                : 'bg-white/50 dark:bg-slate-800/50 backdrop-blur-md text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-white/10 hover:bg-white/80 dark:hover:bg-slate-700/50'}
            `}
          >
            {cat}
          </button>
        );
      })}
    </div>
  );
};

export default CourseCategories;
