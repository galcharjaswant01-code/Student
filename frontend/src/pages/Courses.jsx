import React, { useState, useEffect } from 'react';
import { useLocation, Link } from 'react-router-dom';
import { Search, Filter, LayoutGrid, List as ListIcon, Maximize2, Minimize2, Compass, ArrowRight } from 'lucide-react';
import { useWorkspace } from '../context/WorkspaceContext';
import { useAuth } from '../context/AuthContext';

import CourseStats from '../components/courses/CourseStats';
import CourseCategories from '../components/courses/CourseCategories';
import CourseList from '../components/courses/CourseList';
import CourseViewer from '../components/courses/CourseViewer';
import CourseAIAndPath from '../components/courses/CourseAIAndPath';
import { coursesAPI } from '../services/mockDjangoCoursesApi';
import WidgetWrapper from '../components/WidgetWrapper';

const Courses = () => {
  const { isGuest } = useAuth();
  const location = useLocation();
  const guestNotice = location.state?.guestNotice;

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
    <div className="p-3.5 sm:p-6 w-full h-full overflow-y-auto custom-scrollbar space-y-6 sm:space-y-8 pb-20 relative overflow-x-hidden">
      
      {/* Guest Mode Banner */}
      {(isGuest || guestNotice) && (
        <div className="p-4 rounded-2xl bg-gradient-to-r from-indigo-900/40 via-purple-900/30 to-slate-900/60 border border-indigo-500/30 backdrop-blur-md flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-slate-200 text-xs sm:text-sm animate-fade-in shadow-lg">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-xl bg-indigo-500/20 text-indigo-400 border border-indigo-500/30">
              <Compass className="w-5 h-5" />
            </div>
            <div>
              <p className="font-bold text-white">Guest Visitor Preview Mode</p>
              <p className="text-slate-300 text-xs mt-0.5">
                {guestNotice || 'Browsing public courses and university catalogue. Sign in with a student account to unlock your personal dashboard, attendance tracking, assignments & AI studio.'}
              </p>
            </div>
          </div>
          <Link
            to="/login"
            className="px-3.5 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-semibold text-xs transition-colors shrink-0 flex items-center gap-1.5 shadow-md shadow-indigo-600/30"
          >
            <span>Sign In as Student</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      )}

      {selectedCourse && (
        <CourseViewer 
          course={selectedCourse} 
          onClose={() => setSelectedCourse(null)} 
        />
      )}

      {/* Top Header Section */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold bg-clip-text text-transparent bg-gradient- bg-primary">
            My Learning
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1 font-medium">Manage your courses, track progress, and continue learning.</p>
        </div>
        
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2.5 w-full md:w-auto">
          <div className="flex items-center gap-2">
            {/* Fullscreen Toggle */}
            <button 
              onClick={toggleFullscreen}
              className="p-2.5 bg-white/70 dark:bg-slate-800/70 border border-slate-200 dark:border-white/10 rounded-lg text-slate-500 hover:text-primary flex items-center justify-center transition-colors"
              title={isFullscreen ? "Exit Fullscreen" : "Fullscreen Mode"}
            >
              {isFullscreen ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
            </button>
            <button className="flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg border border-slate-200 dark:border-white/10 bg-white/70 dark:bg-slate-800/70 text-slate-600 dark:text-slate-300 text-sm font-bold hover:text-primary flex-1 sm:flex-initial">
              <Filter className="w-4 h-4" />
              Sort
            </button>
          </div>

          <div className="relative w-full sm:w-64">
            <Search className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400" />
            <input 
              type="text" 
              placeholder="Search courses..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-9 pr-4 py-2.5 w-full bg-white/70 dark:bg-slate-800/70 border border-slate-200 dark:border-white/10 rounded-lg text-sm font-medium focus:outline-none focus:border-primary"
            />
          </div>
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
