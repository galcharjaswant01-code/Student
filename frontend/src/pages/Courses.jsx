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
    <div className="p-6 w-full h-full overflow-y-auto custom-scrollbar space-y-8 pb-20 relative">
      
      
        {selectedCourse && (
          <CourseViewer 
            course={selectedCourse} 
            onClose={() => setSelectedCourse(null)} 
          />
        )}
      

      {/* Top Header Section */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-extrabold bg-clip-text text-transparent bg-gradient- bg-primary">
            My Learning
          </h1>
          <p className="text-sm text-slate-500 dark:text-slate-400 mt-1 font-medium">Manage your courses, track progress, and continue learning.</p>
        </div>
        
        <div className="flex flex-col sm:flex-row items-center gap-3">
          {/* Fullscreen Toggle */}
          <button 
            onClick={toggleFullscreen}
            className="p-2.5 bg-white/70 dark:bg-slate-800/70 border border-slate-200 dark:border-white/10 rounded-sm text-slate-500 hover:text-primary flex items-center justify-center"
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
              className="pl-9 pr-4 py-2.5 w-full bg-white/70 dark:bg-slate-800/70 border border-slate-200 dark:border-white/10 rounded-sm text-sm font-medium focus:outline-none focus:border-primary"
            />
          </div>
          <button className="flex items-center justify-center gap-2 px-4 py-2.5 rounded-sm border border-slate-200 dark:border-white/10 bg-white/70 dark:bg-slate-800/70 text-slate-600 dark:text-slate-300 text-sm font-bold hover:text-primary w-full sm:w-auto">
            <Filter className="w-4 h-4" />
            Sort
          </button>
        </div>
      </div>

      {/* Analytics & Path Grid */}
      <WidgetWrapper id="course-stats" innerClassName="p-0 bg-transparent border-0 -none">
        <CourseStats stats={stats} loading={loading} />
      </WidgetWrapper>

      <WidgetWrapper id="course-ai-path" innerClassName="p-0 bg-transparent border-0 -none">
        <CourseAIAndPath paths={paths} loading={loading} />
      </WidgetWrapper>

      {/* Courses Catalog Area */}
      <WidgetWrapper id="course-catalog" innerClassName="p-0 bg-transparent border-0 -none">
        <div className="flex flex-col space-y-6">
          {/* Toolbar */}
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <CourseCategories activeCategory={activeCategory} setActiveCategory={setActiveCategory} />
            
            <div className="flex items-center bg-white/70 dark:bg-slate-800/70 rounded-sm p-1 border border-slate-200 dark:border-white/10 shrink-0">
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
