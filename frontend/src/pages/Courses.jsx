import React, { useState, useEffect } from 'react';

import { Search, Filter, LayoutGrid, List as ListIcon, Maximize2, Minimize2 } from 'lucide-react';
import { useWorkspace } from '../context/WorkspaceContext';

import CourseStats from '../components/courses/CourseStats';
import CourseCategories from '../components/courses/CourseCategories';
import CourseList from '../components/courses/CourseList';
import CourseViewer from '../components/courses/CourseViewer';
import CourseAIAndPath from '../components/courses/CourseAIAndPath';
import { coursesAPI } from '../services/mockDjangoCoursesApi';
import WidgetWrapper from '../components/WidgetWrapper';

const Courses = () => {
  const [courses, setCourses] = useState([]);
  const [stats, setStats] = useState(null);
  const [paths, setPaths] = useState(null);
  const [loading, setLoading] = useState(true);
  
  const [activeCategory, setActiveCategory] = useState('All Categories');
  const [searchTerm, setSearchTerm] = useState('');
  const [viewMode, setViewMode] = useState('grid');
  
  // Viewer state
  const [selectedCourse, setSelectedCourse] = useState(null);
  
  const { isFullscreen, toggleFullscreen } = useWorkspace();

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const [coursesData, statsData, pathsData] = await Promise.all([
          coursesAPI.getCourses(1, 20, { category: activeCategory, search: searchTerm }),
          coursesAPI.getAnalytics(),
          coursesAPI.getLearningPaths()
        ]);
        setCourses(coursesData.results);
        setStats(statsData);
        setPaths(pathsData);
      } catch (error) {
        console.error("Failed to fetch courses data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [activeCategory, searchTerm]);

  const handleCourseClick = async (course) => {
    try {
      const details = await coursesAPI.getCourseDetails(course.id);
      setSelectedCourse(details);
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <div className="p-6 w-full h-full overflow-y-auto custom-scrollbar space-y-8 pb-20 relative overflow-hidden">
      {/* Background Orbs */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary/20 dark:bg-primary/10 rounded-full blur-[100px] pointer-events-none z-0" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-purple-500/20 dark:bg-purple-500/10 rounded-full blur-[100px] pointer-events-none z-0" />
      
      {selectedCourse && (
        <CourseViewer 
          course={selectedCourse} 
          onClose={() => setSelectedCourse(null)} 
        />
      )}

      {/* Top Header Section */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 relative z-10">
        <div>
          <h1 className="text-3xl md:text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-slate-900 to-slate-600 dark:from-white dark:to-slate-400">
            My Learning
          </h1>
          <p className="text-sm text-slate-500 dark:text-slate-400 mt-1 font-medium">Manage your courses, track progress, and continue learning.</p>
        </div>
        
        <div className="flex flex-col sm:flex-row items-center gap-3">
          {/* Fullscreen Toggle */}
          <button 
            onClick={toggleFullscreen}
            className="p-2.5 bg-white/70 dark:bg-slate-800/70 border border-slate-200 dark:border-white/10 rounded-xl text-slate-500 hover:text-primary flex items-center justify-center backdrop-blur-sm transition-colors"
            title={isFullscreen ? "Exit Fullscreen" : "Fullscreen Mode"}
          >
            {isFullscreen ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
          </button>

          <div className="relative w-full sm:w-64">
            <Search className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400" />
            <input 
              type="text" 
              placeholder="Search courses..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-9 pr-4 py-2.5 w-full bg-white/70 dark:bg-slate-800/70 border border-slate-200 dark:border-white/10 rounded-xl text-sm font-medium focus:outline-none focus:border-primary backdrop-blur-sm"
            />
          </div>
          <button className="flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl border border-slate-200 dark:border-white/10 bg-white/70 dark:bg-slate-800/70 text-slate-600 dark:text-slate-300 text-sm font-bold hover:text-primary w-full sm:w-auto backdrop-blur-sm transition-colors">
            <Filter className="w-4 h-4" />
            Sort
          </button>
        </div>
      </div>

      {/* Analytics & Path Grid */}
      <div className="w-full">
        <CourseStats stats={stats} loading={loading} />
      </div>

      <div className="w-full">
        <CourseAIAndPath paths={paths} loading={loading} />
      </div>

      {/* Courses Catalog Area */}
      <WidgetWrapper id="course-catalog" innerClassName="p-0 bg-transparent border-0 -none">
        <div className="flex flex-col space-y-6">
          {/* Toolbar */}
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <CourseCategories activeCategory={activeCategory} setActiveCategory={setActiveCategory} />
            <div className="flex items-center bg-white/50 dark:bg-white/5 backdrop-blur-md rounded-sm p-1 border border-slate-200 dark:border-white/10 shrink-0">
              <button 
                onClick={() => setViewMode('grid')}
                className={`p-1.5 rounded-sm  ${viewMode === 'grid' ? 'bg-indigo-500 text-white ' : 'text-slate-500 hover:text-indigo-500'}`}
              >
                <LayoutGrid className="w-4 h-4" />
              </button>
              <button 
                onClick={() => setViewMode('list')}
                className={`p-1.5 rounded-sm  ${viewMode === 'list' ? 'bg-indigo-500 text-white ' : 'text-slate-500 hover:text-indigo-500'}`}
              >
                <ListIcon className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Catalog */}
          <CourseList 
            courses={courses} 
            loading={loading} 
            viewMode={viewMode} 
            onCourseClick={handleCourseClick}
          />
        </div>
      </WidgetWrapper>

    </div>
  );
};

export default Courses;
