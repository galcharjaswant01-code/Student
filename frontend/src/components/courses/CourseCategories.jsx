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
              whitespace-nowrap px-5 py-2 rounded-full text-sm font-medium transition-all duration-200
              ${isActive 
                ? 'bg-indigo-500 text-white shadow-md shadow-indigo-500/20 border border-indigo-500' 
                : 'bg-white/50 dark:bg-white/5 backdrop-blur-md text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-white/10 hover:bg-white/80 dark:hover:bg-white/10 hover:text-indigo-500 dark:hover:text-indigo-400'}
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
