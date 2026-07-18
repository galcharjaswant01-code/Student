import React from 'react';
import { useNavigate } from 'react-router-dom';
import { BookOpen, ArrowRight, PlayCircle } from 'lucide-react';


const CoursesOverviewWidget = () => {
  const navigate = useNavigate();

  const activeCourses = [
    { id: 1, title: 'Introduction to React', instructor: 'Dr. Smith', progress: 75, color: 'bg-blue-500' },
    { id: 2, title: 'Advanced Physics', instructor: 'Prof. Johnson', progress: 42, color: 'bg-purple-500' },
    { id: 3, title: 'Data Structures', instructor: 'Ms. Davis', progress: 15, color: 'bg-green-500' },
  ];

  return (
    <div className="flex flex-col h-full w-full relative z-10">
      <div className="flex justify-between items-center p-5 pb-2 shrink-0">
        <h3 className="text-xl font-bold text-slate-900 dark:text-white tracking-tight flex items-center gap-2">
          <BookOpen className="w-5 h-5 text-primary" />
          Courses
        </h3>
        <button 
          onClick={() => navigate('/courses')}
          className="text-sm text-primary hover:text-blue-700 font-medium flex items-center gap-1 group"
        >
          View All
          <ArrowRight className="w-3 h-3 group-" />
        </button>
      </div>
      
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {activeCourses.map((course, i) => (
          <div key={i} className="group p-4 bg-slate-50 dark:bg-white/5 rounded-sm hover:bg-white dark:hover:bg-slate-800 border border-transparent hover:border-slate-200 dark:hover:border-white/10 hover:">
            <div className="flex justify-between items-start mb-2">
              <div>
                <h4 className="font-semibold text-slate-900 dark:text-white group-hover:text-primary">{course.title}</h4>
                <p className="text-xs text-slate-500 dark:text-slate-400">{course.instructor}</p>
              </div>
              <button 
                onClick={() => navigate('/courses')}
                className="w-8 h-8 rounded-full bg-primary/10 text-primary flex items-center justify-center opacity-0 group-hover:opacity-100 hover:bg-primary hover:text-white"
              >
                <PlayCircle className="w-5 h-5" />
              </button>
            </div>
            
            <div className="mt-3">
              <div className="flex justify-between items-center text-xs mb-1.5">
                <span className="font-medium text-slate-600 dark:text-slate-300">Progress</span>
                <span className="font-bold text-slate-900 dark:text-white">{course.progress}%</span>
              </div>
              <div className="h-2 w-full bg-slate-200 dark:bg-slate-700 rounded-full overflow-hidden">
                <div
                  className={`h-full rounded-full ${course.color}`}
                />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CoursesOverviewWidget;
