import React, { useState } from 'react';
import Card from '../components/ui/Card';
import Button from '../components/ui/Button';
import Badge from '../components/ui/Badge';
import Input from '../components/ui/Input';
import { BookOpen, User, FolderOpen, Search, ArrowRight, Compass } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

const mockCourses = [
  { id: 1, code: 'MATH 301', title: 'Calculus III & Multivariable Analysis', faculty: 'Dr. Sarah Jenkins', progress: 85, lectures: 30, resources: 14 },
  { id: 2, code: 'CS 202', title: 'Data Structures & Algorithms', faculty: 'Prof. Michael Robert', progress: 92, lectures: 32, resources: 18 },
  { id: 3, code: 'AI 401', title: 'Artificial Intelligence & Neural Networks', faculty: 'Dr. Robert Chen', progress: 78, lectures: 26, resources: 12 },
  { id: 4, code: 'CS 305', title: 'Database Management Systems', faculty: 'Prof. Amanda Miller', progress: 90, lectures: 30, resources: 15 },
  { id: 5, code: 'PHY 202L', title: 'Physics II Experimental Lab', faculty: 'Dr. David Vance', progress: 100, lectures: 15, resources: 8 },
];

const Courses = () => {
  const { isGuest } = useAuth();
  const [searchQuery, setSearchQuery] = useState('');

  const filteredCourses = mockCourses.filter(c => 
    c.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
    c.code.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="p-4 sm:p-6 w-full space-y-6 max-w-7xl mx-auto">
      
      {/* Guest Mode Notice */}
      {isGuest && (
        <div className="p-4 rounded-xl border border-blue-600/30 bg-blue-50/50 dark:bg-blue-950/20 text-slate-800 dark:text-slate-200 text-xs sm:text-sm flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <Compass className="w-5 h-5 text-blue-600 dark:text-blue-400 shrink-0" />
            <div>
              <p className="font-bold text-slate-900 dark:text-white">Guest Visitor Course Directory</p>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">You are exploring public university course syllabus and faculty directory.</p>
            </div>
          </div>
        </div>
      )}

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 dark:text-white tracking-tight">Academic Courses</h1>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">Syllabus, faculty information, lecture materials, and progress.</p>
        </div>
        
        <div className="w-full sm:w-64">
          <Input 
            icon={Search} 
            placeholder="Search course name or code..." 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>

      {/* Course Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredCourses.map((course) => (
          <Card key={course.id} className="flex flex-col justify-between p-5 space-y-4">
            <div>
              <div className="flex items-center justify-between">
                <Badge variant="blue">{course.code}</Badge>
                <span className="text-xs font-bold text-blue-600 dark:text-blue-400">{course.progress}% Completed</span>
              </div>

              <h3 className="text-base font-bold text-slate-900 dark:text-white mt-3 leading-snug">
                {course.title}
              </h3>

              <div className="flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400 mt-2">
                <User className="w-3.5 h-3.5 text-blue-600 dark:text-blue-400" />
                <span>{course.faculty}</span>
              </div>
            </div>

            <div className="space-y-3 pt-3 border-t border-slate-100 dark:border-slate-800">
              {/* Progress Bar */}
              <div className="w-full bg-slate-100 dark:bg-slate-800 h-2 rounded-full overflow-hidden">
                <div className="bg-blue-600 dark:bg-blue-500 h-full rounded-full" style={{ width: `${course.progress}%` }} />
              </div>

              <div className="flex items-center justify-between text-xs text-slate-500 dark:text-slate-400">
                <span>{course.lectures} Lectures</span>
                <span>{course.resources} Resources</span>
              </div>

              <Button variant="secondary" size="sm" className="w-full" icon={ArrowRight}>
                View Course Syllabus
              </Button>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default Courses;
