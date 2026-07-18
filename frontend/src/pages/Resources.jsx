import React, { useState, useEffect } from 'react';
import { Search, Maximize2, Minimize2, BookOpen, Layers, PlayCircle, BrainCircuit } from 'lucide-react';
import { useWorkspace } from '../context/WorkspaceContext';


import ResourceStats from '../components/resources/ResourceStats';
import ResourceList from '../components/resources/ResourceList';
import CSLearningHub from '../components/resources/CSLearningHub';
import AIResourceInsights from '../components/resources/AIResourceInsights';
import PDFReaderWidget from '../components/resources/PDFReaderWidget';
import VideoPlayerWidget from '../components/resources/VideoPlayerWidget';
import { resourcesAPI } from '../services/mockDjangoResourcesApi';
import WidgetWrapper from '../components/WidgetWrapper';

const TABS = [
  { id: 'overview', label: 'Overview', icon: BrainCircuit },
  { id: 'library', label: 'Global Library', icon: BookOpen },
  { id: 'cs-hub', label: 'CS Learning Hub', icon: Layers },
  { id: 'videos', label: 'Video Tutorials', icon: PlayCircle },
];

const Resources = () => {
  const [resources, setResources] = useState([]);
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  
  const [activeTab, setActiveTab] = useState('overview');
  const [activeCategory, setActiveCategory] = useState('All');
  const [activeType, setActiveType] = useState('All Types');
  const [searchTerm, setSearchTerm] = useState('');
  
  const { isFullscreen, toggleFullscreen, activeObject, setActiveObject } = useWorkspace();

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const [resourcesData, statsData] = await Promise.all([
          resourcesAPI.getResources(1, 20, { 
            category: activeCategory, 
            type: activeTab === 'videos' ? 'video' : activeType,
            search: searchTerm 
          }),
          resourcesAPI.getAnalytics()
        ]);
        setResources(resourcesData.results);
        setStats(statsData);
      } catch (error) {
        console.error("Failed to fetch resources data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [activeCategory, activeType, searchTerm, activeTab]);

  const handleBookmark = async (id) => {
    try {
      const res = await resourcesAPI.toggleBookmark(id);
      setResources(prev => prev.map(r => r.id === id ? { ...r, isBookmarked: res.isBookmarked } : r));
    } catch (e) {
      console.error(e);
    }
  };

  const handleDownload = async (id) => {
    try {
      const res = await resourcesAPI.downloadResource(id);
      console.log('Downloading from:', res.url);
    } catch (e) {
      console.error(e);
    }
  };

  const handleResourceClick = (resource) => {
    if (resource.type === 'pdf' || resource.type === 'notes' || resource.type === 'ebook') {
      setActiveObject({ type: 'pdf-reader', data: resource });
    } else if (resource.type === 'video') {
      setActiveObject({ type: 'video-player', data: resource });
    }
  };

  // If a viewer is active and user clicks outside or clicks X, we close it
  // This is handled by rendering the activeObject on top
  if (activeObject?.type === 'pdf-reader') {
    return (
      <div className="w-full h-full p-2 sm:p-4">
        <PDFReaderWidget 
          resource={activeObject.data} 
          onClose={() => setActiveObject(null)} 
          onFullscreen={toggleFullscreen}
        />
      </div>
    );
  }

  if (activeObject?.type === 'video-player') {
    return (
      <div className="w-full h-full p-2 sm:p-4">
        <VideoPlayerWidget 
          resource={activeObject.data} 
          onClose={() => setActiveObject(null)} 
          onFullscreen={toggleFullscreen}
        />
      </div>
    );
  }

  return (
    <div className="p-6 w-full h-full overflow-y-auto custom-scrollbar space-y-8 pb-20 relative">
      
      {/* Top Header Section */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-extrabold bg-clip-text text-transparent bg-gradient- bg-primary">
            Learning Resources
          </h1>
          <p className="text-sm text-slate-500 dark:text-slate-400 mt-1 font-medium">Discover PDFs, videos, and practical coding materials.</p>
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

          {(activeTab === 'library' || activeTab === 'videos' || activeTab === 'overview') && (
            <>
              <div className="relative w-full sm:w-64">
                <Search className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400" />
                <input 
                  type="text" 
                  placeholder="Search resources..." 
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-9 pr-4 py-2.5 w-full bg-white/70 dark:bg-slate-800/70 border border-slate-200 dark:border-white/10 rounded-sm text-sm font-medium focus:outline-none focus:border-primary"
                />
              </div>
              
              {activeTab !== 'videos' && (
                <select 
                  value={activeType}
                  onChange={(e) => setActiveType(e.target.value)}
                  className="px-4 py-2.5 bg-white/70 dark:bg-slate-800/70 border border-slate-200 dark:border-white/10 rounded-sm text-sm font-medium focus:outline-none focus:border-primary cursor-pointer"
                >
                  <option value="All Types">All Types</option>
                  <option value="pdf">PDFs</option>
                  <option value="video">Videos</option>
                  <option value="code">Code Snippets</option>
                  <option value="notes">Notes</option>
                  <option value="ebook">E-Books</option>
                </select>
              )}
            </>
          )}
        </div>
      </div>

      {/* Tabs */}
      <div className="flex overflow-x-auto gap-2 pb-2 scrollbar-hide border-b border-slate-200 dark:border-slate-800">
        {TABS.map(tab => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`flex items-center gap-2 px-5 py-3 text-sm font-bold  relative ${
              activeTab === tab.id 
                ? 'text-primary' 
                : 'text-slate-500 hover:text-slate-800 dark:text-slate-400 dark:hover:text-slate-200'
            }`}
          >
            <tab.icon className="w-4 h-4" />
            {tab.label}
            {activeTab === tab.id && (
              <div
                className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary"
              />
            )}
          </button>
        ))}
      </div>

      {/* Categories (only for Library or Videos) */}
      {(activeTab === 'library' || activeTab === 'videos') && (
        <div className="flex overflow-x-auto gap-3 pb-2 scrollbar-hide">
          {['All', 'Web Development', 'Computer Science Core', 'Programming', 'AI & Machine Learning'].map(cat => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`
                whitespace-nowrap px-4 py-2 rounded-sm text-sm font-bold  
                ${activeCategory === cat 
                  ? 'bg-slate-900 text-white dark:bg-white dark:text-slate-900 ' 
                  : 'bg-white/70 text-slate-600 border border-slate-200 hover:bg-slate-50 dark:bg-slate-800/70 dark:border-white/5 dark:text-slate-400 dark:hover:bg-slate-700/70'}
              `}
            >
              {cat}
            </button>
          ))}
        </div>
      )}

      {/* Tab Content */}
      
        <div
          key={activeTab}
          className="space-y-8"
        >
          {activeTab === 'overview' && (
            <>
              <AIResourceInsights />
              <WidgetWrapper id="resources-stats" innerClassName="p-0 bg-transparent border-0 -none">
                <ResourceStats stats={stats} loading={loading} />
              </WidgetWrapper>
              <div>
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-xl font-bold text-slate-900 dark:text-white">Recommended for You</h2>
                </div>
                <ResourceList 
                  resources={resources.slice(0, 4)} 
                  loading={loading} 
                  onBookmark={handleBookmark}
                  onDownload={handleDownload}
                  onResourceClick={handleResourceClick}
                />
              </div>
            </>
          )}

          {activeTab === 'library' && (
            <ResourceList 
              resources={resources} 
              loading={loading} 
              onBookmark={handleBookmark}
              onDownload={handleDownload}
              onResourceClick={handleResourceClick}
            />
          )}

          {activeTab === 'videos' && (
            <ResourceList 
              resources={resources.filter(r => r.type === 'video')} 
              loading={loading} 
              onBookmark={handleBookmark}
              onDownload={handleDownload}
              onResourceClick={handleResourceClick}
            />
          )}

          {activeTab === 'cs-hub' && (
            <CSLearningHub />
          )}

        </div>
      

    </div>
  );
};

export default Resources;
