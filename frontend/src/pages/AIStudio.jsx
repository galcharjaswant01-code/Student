import React, { useState, useEffect } from 'react';
import { useWorkspace } from '../context/WorkspaceContext';
import useResponsive from '../hooks/useResponsive';
import { Maximize2, Minimize2, Info } from 'lucide-react';

import AISidebar from '../components/ai/AiSidebar';

import AIInsightsPanel from '../components/ai/AIInsightsPanel';

// Workspaces
import AIChatWorkspace from '../components/ai/workspaces/AIChatWorkspace';
import CodeAssistantWorkspace from '../components/ai/workspaces/CodeAssistantWorkspace';
import ResumeAnalyzerWorkspace from '../components/ai/workspaces/ResumeAnalyzerWorkspace';
import QuizGeneratorWorkspace from '../components/ai/workspaces/QuizGeneratorWorkspace';
import NotesSummarizerWorkspace from '../components/ai/workspaces/NotesSummarizerWorkspace';
import StudyPlannerWorkspace from '../components/ai/workspaces/StudyPlannerWorkspace';
import AIRecommendationsWorkspace from '../components/ai/workspaces/AIRecommendationsWorkspace';

const AIStudio = () => {
  const [activeToolId, setActiveToolId] = useState('chat');
  const [showInsightsPanel, setShowInsightsPanel] = useState(false);
  
  const { isFullscreen, toggleFullscreen } = useWorkspace();
  const { isMobile: isMobileView, isTablet } = useResponsive();

  // Layout Logic
  // Mobile: Only show ONE view at a time (Sidebar OR Workspace OR InsightsPanel)
  // Tablet: Show Sidebar + Workspace (hide insights)
  // Desktop: Show Sidebar + Workspace + InsightsPanel (if active)
  
  // If we are on mobile and a tool is selected, hide sidebar unless they click 'back'
  // If we are on mobile, default to showing the sidebar
  const [mobileViewTarget, setMobileViewTarget] = useState('sidebar'); // 'sidebar', 'workspace', 'insights'


  const showSidebar = !isMobileView || (isMobileView && mobileViewTarget === 'sidebar');
  const showWorkspace = !isMobileView || (isMobileView && mobileViewTarget === 'workspace');
  const showInsights = showInsightsPanel && !isFullscreen && (!isMobileView || (isMobileView && mobileViewTarget === 'insights'));

  const renderActiveWorkspace = () => {
    const props = {
      isMobileView,
      onBack: () => setMobileViewTarget('sidebar'),
      onToggleInsights: () => {
        if (isMobileView) {
          setMobileViewTarget('insights');
        } else {
          setShowInsightsPanel(!showInsightsPanel);
        }
      }
    };

    switch (activeToolId) {
      case 'chat': return <AIChatWorkspace {...props} />;
      case 'code': return <CodeAssistantWorkspace {...props} />;
      case 'resume': return <ResumeAnalyzerWorkspace {...props} />;
      case 'quiz': return <QuizGeneratorWorkspace {...props} />;
      case 'notes': return <NotesSummarizerWorkspace {...props} />;
      case 'planner': return <StudyPlannerWorkspace {...props} />;
      case 'recommendations': return <AIRecommendationsWorkspace {...props} />;
      default: return <AIChatWorkspace {...props} />;
    }
  };

  return (
    <div className={`relative w-full ${isFullscreen ? 'h-full border-0 rounded-none' : 'h-[calc(100vh-80px)] sm:h-[calc(100vh-140px)] border border-slate-200/50 dark:border-white/5 rounded-sm'} flex flex-col overflow-hidden bg-slate-50 dark:bg-slate-950`}>
      
      {/* Fullscreen Toggle Header */}
      <div className="absolute top-4 right-16 z-50 pointer-events-none flex justify-end">
        <button 
          onClick={toggleFullscreen}
          className="pointer-events-auto p-2 bg-white/70 dark:bg-slate-800/70 border border-slate-200 dark:border-white/10 rounded-sm text-slate-500 hover:text-indigo-600"
          title="Toggle Fullscreen"
        >
          {isFullscreen ? <Minimize2 className="w-5 h-5" /> : <Maximize2 className="w-5 h-5" />}
        </button>
      </div>

      <div className="flex flex-1 overflow-hidden h-full">
        {/* Left Pane: Sidebar */}
        {showSidebar && (
          <div className="w-full sm:w-80 border-r border-slate-200 dark:border-white/10 shrink-0 h-full bg-white dark:bg-slate-900 flex flex-col min-h-0">
            <AISidebar 
              activeToolId={activeToolId} 
              setActiveToolId={(id) => {
                setActiveToolId(id);
                if (isMobileView) setMobileViewTarget('workspace');
              }} 
            />
          </div>
        )}

        {/* Center Pane: Active AI Workspace */}
        <div className={`flex-1 h-full flex flex-col min-h-0 min-w-0 ${!showWorkspace && isMobileView ? 'hidden' : 'flex'}`}>
          {renderActiveWorkspace()}
        </div>

        {/* Right Pane: AI Insights */}
        {(showInsights || (isMobileView && mobileViewTarget === 'insights')) && (
          <div className={`${isMobileView ? 'absolute inset-0 z-40 bg-white dark:bg-slate-900' : 'w-80 shrink-0'} h-full flex flex-col`}>
            <AIInsightsPanel 
              activeToolId={activeToolId}
              onClose={() => {
                if (isMobileView) {
                  setMobileViewTarget('workspace');
                } else {
                  setShowInsightsPanel(false);
                }
              }} 
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default AIStudio;
