import React from 'react';

import { SearchX, LayoutGrid } from 'lucide-react';
import CourseCard from './CourseCard';

const CourseList = ({ courses, loading, viewMode, onCourseClick }) => {
  if (loading) {
    return (
      <div className={`grid gap-6 ${viewMode === 'grid' ? 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3' : 'grid-cols-1'}`}>
        {[...Array(6)].map((_, i) => (
          <div 
            key={i} 
            className={`bg-slate-200/50 dark:bg-slate-800/50 animate-pulse rounded-sm ${viewMode === 'grid' ? 'h-80' : 'h-40'}`} 
          />
        ))}
      </div>
    );
  }

  if (!courses || courses.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center h-64 text-slate-500 dark:text-slate-400">
        <div className="w-16 h-16 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center mb-4">
          <SearchX className="w-8 h-8 opacity-50" />
        </div>
        <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-1">No courses found</h3>
        <p className="text-sm">Try adjusting your search or filters.</p>
      </div>
    );
  }

  return (
    <div
      className={`grid gap-6 ${viewMode === 'grid' ? 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3' : 'grid-cols-1'}`}
    >
      
        {courses.map((course, idx) => (
          <CourseCard 
            key={course.id} 
            course={course} 
            viewMode={viewMode}
            onClick={onCourseClick}
          />
        ))}
      
    </div>
  );
};

export default CourseList;
