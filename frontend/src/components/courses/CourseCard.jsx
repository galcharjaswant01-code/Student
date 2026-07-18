import React from 'react';

import { PlayCircle, Clock, BookOpen, CheckCircle, ArrowRight } from 'lucide-react';
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';

const CourseCard = ({ course, viewMode = 'grid', onClick }) => {
  const isList = viewMode === 'list';
  const isCompleted = course.progress === 100;

  const getStatusColor = () => {
    if (isCompleted) return 'text-emerald-500 bg-emerald-50 dark:bg-emerald-500/10 border-emerald-200 dark:border-emerald-500/20';
    if (course.status === 'In Progress') return 'text-indigo-500 bg-indigo-50 dark:bg-indigo-500/10 border-indigo-200 dark:border-indigo-500/20';
    return 'text-slate-500 bg-slate-50 dark:bg-slate-500/10 border-slate-200 dark:border-slate-500/20';
  };

  const getProgressColor = () => {
    if (isCompleted) return '#10b981'; // emerald-500
    if (course.progress > 50) return '#6366f1'; // indigo-500
    return '#f59e0b'; // amber-500
  };

  return (
    <div
      onClick={() => onClick(course)}
      className={`group relative overflow-hidden bg-white/70 dark:bg-slate-800/70  border border-slate-200/50 dark:border-white/5 rounded-sm -[0_8px_30px_rgb(0,0,0,0.04)] dark:-[0_8px_30px_rgb(0,0,0,0.1)] cursor-pointer  hover: hover:border-indigo-500/30 ${isList ? 'flex flex-col sm:flex-row' : 'flex flex-col'}`}
    >
      {/* Thumbnail */}
      <div className={`relative overflow-hidden ${isList ? 'w-full sm:w-64 shrink-0' : 'w-full aspect-video'}`}>
        <img 
          src={course.thumbnail} 
          alt={course.title}
          className="w-full h-full object-cover group-"
        />
        <div className="absolute inset-0 bg-gradient- bg-slate-900/80" />
        
        {/* Category Badge */}
        <div className="absolute top-4 left-4">
          <span className="px-2.5 py-1 text-xs font-bold uppercase tracking-wider text-white bg-black/40 rounded-sm border border-white/20">
            {course.category}
          </span>
        </div>

        {/* Play Overlay (Hover) */}
        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100">
          <div className="w-14 h-14 rounded-full bg-indigo-600/90 flex items-center justify-center text-white -indigo-600/40 transform scale-75 group-">
            <PlayCircle className="w-8 h-8 ml-1" />
          </div>
        </div>
      </div>

      {/* Content */}
      <div className={`flex flex-col flex-1 p-5 ${isList ? 'justify-center' : ''}`}>
        
        <div className="flex items-start justify-between gap-4 mb-2">
          <div>
            <h3 className="font-bold text-lg text-slate-900 dark:text-white leading-tight group-hover:text-indigo-600 dark:group-hover:text-indigo-400 line-clamp-2">
              {course.title}
            </h3>
            <p className="text-sm font-medium text-slate-500 dark:text-slate-400 mt-1">
              by {course.instructor}
            </p>
          </div>

          {/* Circular Progress (Grid View) */}
          {!isList && course.progress > 0 && (
            <div className="w-12 h-12 shrink-0 relative">
              <CircularProgressbar 
                value={course.progress} 
                styles={buildStyles({
                  pathColor: getProgressColor(),
                  trailColor: 'rgba(148, 163, 184, 0.2)',
                  strokeLinecap: 'round'
                })}
              />
              <div className="absolute inset-0 flex items-center justify-center text-[10px] font-bold text-slate-700 dark:text-slate-200">
                {course.progress}%
              </div>
            </div>
          )}
        </div>

        {/* Meta Info */}
        <div className="flex items-center gap-4 text-xs font-medium text-slate-500 dark:text-slate-400 mb-4 mt-auto">
          <div className="flex items-center gap-1.5">
            <BookOpen className="w-4 h-4 text-indigo-500" />
            <span>{course.completedLectures}/{course.totalLectures} Lessons</span>
          </div>
          <div className="flex items-center gap-1.5">
            <Clock className="w-4 h-4 text-amber-500" />
            <span>{course.estimatedDuration}</span>
          </div>
        </div>

        {/* Footer: Progress Bar (List View) or Status Badge */}
        <div className="flex items-center justify-between mt-auto pt-4 border-t border-slate-100 dark:border-white/5">
          <div className={`px-2.5 py-1 text-xs font-bold rounded-sm border ${getStatusColor()}`}>
            {course.status}
          </div>

          {isList && course.progress > 0 && (
            <div className="flex items-center gap-3 w-48">
              <span className="text-xs font-bold text-slate-700 dark:text-slate-300">{course.progress}%</span>
              <div className="flex-1 h-1.5 bg-slate-100 dark:bg-slate-700 rounded-full overflow-hidden">
                <div 
                  className="h-full rounded-full"
                  style={{ width: `${course.progress}%`, backgroundColor: getProgressColor() }}
                />
              </div>
            </div>
          )}

          {!isList && (
            <button className="text-xs font-bold text-indigo-600 dark:text-indigo-400 flex items-center gap-1 group-hover:gap-2">
              {isCompleted ? 'Review Course' : 'Continue'} <ArrowRight className="w-3 h-3" />
            </button>
          )}
        </div>

      </div>
    </div>
  );
};

export default CourseCard;
