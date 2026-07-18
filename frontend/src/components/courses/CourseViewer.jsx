import React, { useState } from 'react';

import { X, PlayCircle, CheckCircle, Clock, BookOpen, User, Star, Download, ChevronRight } from 'lucide-react';
import { useWorkspace } from '../../context/WorkspaceContext';

const CourseViewer = ({ course, onClose }) => {
  const [activeTab, setActiveTab] = useState('syllabus');
  const [activeLesson, setActiveLesson] = useState(course.lessons?.[0] || null);

  if (!course) return null;

  return (
    <div
      className="absolute inset-0 z-50 bg-slate-50 dark:bg-[#0B1120] flex flex-col xl:flex-row overflow-hidden rounded-sm border border-slate-200 dark:border-white/10"
    >
      {/* Left Column: Video & Overview */}
      <div className="flex-1 flex flex-col h-full overflow-y-auto custom-scrollbar border-r border-slate-200 dark:border-white/10 relative">
        
        {/* Header Back Button Overlay */}
        <div className="absolute top-4 left-4 z-20">
          <button 
            onClick={onClose}
            className="flex items-center gap-2 px-4 py-2 bg-black/40 hover:bg-black/60 rounded-sm text-white text-sm font-bold border border-white/20"
          >
            <ChevronRight className="w-4 h-4 rotate-180" /> Back to Courses
          </button>
        </div>

        {/* Video Player Area */}
        <div className="w-full aspect-video bg-black shrink-0 relative">
          {activeLesson ? (
            <iframe 
              src={`${activeLesson.videoUrl}?autoplay=0&rel=0`} 
              className="w-full h-full"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          ) : (
            <div className="w-full h-full flex flex-col items-center justify-center text-slate-500">
              <PlayCircle className="w-16 h-16 mb-4 opacity-50" />
              <p>Select a lesson to start watching</p>
            </div>
          )}
        </div>

        {/* Course Info */}
        <div className="p-6 md:p-10 shrink-0">
          <div className="flex items-start justify-between gap-6 mb-6">
            <div>
              <div className="flex items-center gap-3 mb-3">
                <span className="px-3 py-1 text-xs font-bold uppercase tracking-wider text-indigo-600 bg-indigo-50 dark:bg-indigo-500/10 rounded-sm border border-indigo-200 dark:border-indigo-500/20">
                  {course.category}
                </span>
                <span className="flex items-center gap-1 text-sm font-medium text-amber-500">
                  <Star className="w-4 h-4 fill-current" /> 4.9 (1.2k reviews)
                </span>
              </div>
              <h1 className="text-3xl md:text-4xl font-extrabold text-slate-900 dark:text-white mb-2 leading-tight">
                {course.title}
              </h1>
              <p className="text-lg text-slate-500 dark:text-slate-400">
                {course.description}
              </p>
            </div>
          </div>

          {/* Quick Stats Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-10">
            <div className="p-4 rounded-sm bg-white dark:bg-slate-800/50 border border-slate-200 dark:border-white/5 flex flex-col items-center text-center">
              <User className="w-6 h-6 text-indigo-500 mb-2" />
              <span className="text-sm font-bold text-slate-900 dark:text-white line-clamp-1">{course.instructor}</span>
              <span className="text-xs font-medium text-slate-500">Instructor</span>
            </div>
            <div className="p-4 rounded-sm bg-white dark:bg-slate-800/50 border border-slate-200 dark:border-white/5 flex flex-col items-center text-center">
              <Clock className="w-6 h-6 text-amber-500 mb-2" />
              <span className="text-sm font-bold text-slate-900 dark:text-white">{course.estimatedDuration}</span>
              <span className="text-xs font-medium text-slate-500">Duration</span>
            </div>
            <div className="p-4 rounded-sm bg-white dark:bg-slate-800/50 border border-slate-200 dark:border-white/5 flex flex-col items-center text-center">
              <BookOpen className="w-6 h-6 text-emerald-500 mb-2" />
              <span className="text-sm font-bold text-slate-900 dark:text-white">{course.totalLectures}</span>
              <span className="text-xs font-medium text-slate-500">Lectures</span>
            </div>
            <div className="p-4 rounded-sm bg-white dark:bg-slate-800/50 border border-slate-200 dark:border-white/5 flex flex-col items-center text-center">
              <CheckCircle className="w-6 h-6 text-blue-500 mb-2" />
              <span className="text-sm font-bold text-slate-900 dark:text-white">{course.progress}%</span>
              <span className="text-xs font-medium text-slate-500">Completed</span>
            </div>
          </div>

          <div className="space-y-8">
            <section>
              <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-4">What you'll learn</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {course.learningObjectives?.map((obj, i) => (
                  <div key={i} className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-emerald-500 shrink-0 mt-0.5" />
                    <span className="text-sm text-slate-600 dark:text-slate-300">{obj}</span>
                  </div>
                ))}
              </div>
            </section>
          </div>
        </div>
      </div>

      {/* Right Column: Syllabus & Notes Sidebar */}
      <div className="w-full xl:w-96 flex flex-col h-[50vh] xl:h-full bg-slate-50/50 dark:bg-slate-900/50 shrink-0">
        
        {/* Tabs */}
        <div className="flex border-b border-slate-200 dark:border-white/10 shrink-0 px-2 pt-2">
          {['syllabus', 'notes', 'files'].map(tab => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`flex-1 pb-3 pt-2 text-sm font-bold uppercase tracking-wider  relative ${
                activeTab === tab 
                ? 'text-indigo-600 dark:text-indigo-400' 
                : 'text-slate-500 hover:text-slate-700 dark:hover:text-slate-300'
              }`}
            >
              {tab}
              {activeTab === tab && (
                <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-indigo-600 dark:bg-indigo-400" />
              )}
            </button>
          ))}
        </div>

        {/* Tab Content */}
        <div className="flex-1 overflow-y-auto custom-scrollbar p-4">
          
            {activeTab === 'syllabus' && (
              <div
                key="syllabus"
                className="space-y-6"
              >
                {course.syllabus?.map((module, mIdx) => (
                  <div key={module.id} className="space-y-2">
                    <div className="flex items-center justify-between text-slate-900 dark:text-white">
                      <h4 className="font-bold text-sm">{module.title}</h4>
                      <span className="text-xs font-medium text-slate-500">{module.duration}</span>
                    </div>
                    <div className="space-y-1.5">
                      {course.lessons?.map((lesson, lIdx) => {
                        const isActive = activeLesson?.id === lesson.id;
                        return (
                          <button
                            key={lesson.id}
                            onClick={() => setActiveLesson(lesson)}
                            className={`w-full flex items-center justify-between p-3 rounded-sm  border ${
                              isActive 
                              ? 'bg-indigo-500/10 border-indigo-500/30 text-indigo-700 dark:text-indigo-300' 
                              : 'bg-white dark:bg-slate-800/50 border-slate-200 dark:border-white/5 hover:border-indigo-500/30 text-slate-700 dark:text-slate-300'
                            }`}
                          >
                            <div className="flex items-center gap-3">
                              {module.completed ? (
                                <CheckCircle className="w-4 h-4 text-emerald-500 shrink-0" />
                              ) : (
                                <PlayCircle className={`w-4 h-4 shrink-0 ${isActive ? 'text-indigo-500' : 'text-slate-400'}`} />
                              )}
                              <span className="text-sm font-medium text-left line-clamp-1">{lesson.title}</span>
                            </div>
                            <span className="text-xs font-medium opacity-60 ml-2 shrink-0">{lesson.duration}</span>
                          </button>
                        );
                      })}
                    </div>
                  </div>
                ))}
              </div>
            )}

            {activeTab === 'notes' && (
              <div
                key="notes"
                className="flex flex-col h-full"
              >
                <textarea 
                  placeholder="Take notes for this lesson..."
                  className="w-full flex-1 bg-white/50 dark:bg-slate-800/50 rounded-sm border border-slate-200 dark:border-white/10 p-4 text-sm font-medium focus:outline-none focus:border-indigo-500/50 focus:ring-1 focus:ring-indigo-500/50 resize-none"
                />
                <button className="mt-4 w-full py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-sm text-sm font-bold">
                  Save Notes
                </button>
              </div>
            )}

            {activeTab === 'files' && (
              <div
                key="files"
                className="space-y-3"
              >
                {[
                  { name: 'Lecture Slides.pdf', size: '2.4 MB' },
                  { name: 'Source_Code.zip', size: '1.1 MB' },
                  { name: 'Cheatsheet.pdf', size: '850 KB' }
                ].map((file, i) => (
                  <div key={i} className="flex items-center justify-between p-3 bg-white dark:bg-slate-800/50 rounded-sm border border-slate-200 dark:border-white/5 group">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-sm bg-indigo-500/10 flex items-center justify-center text-indigo-500">
                        <Download className="w-4 h-4" />
                      </div>
                      <div>
                        <p className="text-sm font-bold text-slate-700 dark:text-slate-200">{file.name}</p>
                        <p className="text-xs text-slate-500">{file.size}</p>
                      </div>
                    </div>
                    <button className="opacity-0 group-hover:opacity-100 text-xs font-bold text-indigo-600">
                      Download
                    </button>
                  </div>
                ))}
              </div>
            )}
          
        </div>

      </div>

    </div>
  );
};

export default CourseViewer;
