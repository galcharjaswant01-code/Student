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
              whitespace-nowrap px-5 py-2 rounded-full text-sm font-medium  
              ${isActive 
                ? 'bg-gray-900 text-white dark:bg-white dark:text-gray-900 ' 
                : 'bg-white text-gray-600 border border-gray-200 hover:bg-gray-50 hover:text-gray-900 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white'}
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
