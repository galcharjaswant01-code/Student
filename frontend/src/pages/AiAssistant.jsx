import React, { useState } from 'react';

import AiSidebar from '../components/ai/AiSidebar';
import AiInsights from '../components/ai/AiInsights';
import AIChatbot from '../components/AI/AIChatbot';
import NotesSummarizer from '../components/AI/NotesSummarizer';
import CodingAssistant from '../components/AI/CodingAssistant';
import ResumeAnalyzer from '../components/AI/ResumeAnalyzer';
import StudyRoom from '../components/AI/StudyRoom';
import useResponsive from '../hooks/useResponsive';
import { Menu, X } from 'lucide-react';

const AiAssistant = () => {
  const { isMobile, isTablet } = useResponsive();
  const [activeTool, setActiveTool] = useState('chat');
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);

  // Map tool IDs to their respective components
  const renderWorkspace = () => {
    switch (activeTool) {
      case 'chat':
        return <AIChatbot key="chat" />;
      case 'notes':
        return <NotesSummarizer key="notes" />;
      case 'coding':
        return <CodingAssistant key="coding" />;
      case 'resume':
        return <ResumeAnalyzer key="resume" />;
      case 'study-room':
        return <StudyRoom key="study-room" />;
      default:
        return (
          <div className="flex flex-col items-center justify-center h-full text-slate-500">
            <div className="text-6xl mb-4">🚀</div>
            <h2 className="text-2xl font-bold text-slate-300">Coming Soon</h2>
            <p>This intelligent tool is currently under development.</p>
          </div>
        );
    }
  };

  const handleSelectTool = (tool) => {
    setActiveTool(tool);
    if (isMobile) setIsMobileSidebarOpen(false);
  };

  return (
    <div className="flex h-[calc(100vh-64px)] w-full overflow-hidden rounded-tl-2xl relative">
      
      {/* Mobile Sidebar Overlay */}
      {isMobile && isMobileSidebarOpen && (
        <div 
          className="fixed inset-0 bg-black/60 z-40"
          onClick={() => setIsMobileSidebarOpen(false)}
        />
      )}

      {/* Tool Navigation Sidebar */}
      <div className={`
        ${isMobile ? 'fixed inset-y-0 left-0 z-50   ' + (isMobileSidebarOpen ? 'translate-x-0' : '-translate-x-full') : 'relative z-10'}
      `}>
        <AiSidebar 
          activeTool={activeTool}
          onSelectTool={handleSelectTool}
          isMobile={isMobile} 
        />
        {isMobile && (
          <button 
            onClick={() => setIsMobileSidebarOpen(false)}
            className="absolute top-4 right-4 p-2 bg-slate-800 text-white rounded-full md:hidden"
          >
            <X className="w-5 h-5" />
          </button>
        )}
      </div>

      {/* Main Intelligent Workspace */}
      <div className="flex-1 flex flex-col relative bg-slate-900/60 overflow-hidden">
        
        {/* Workspace Header (Mobile Only for Sidebar Toggle) */}
        {isMobile && (
          <div className="md:hidden p-4 border-b border-slate-800 bg-[#0F172A] shrink-0 flex items-center justify-between">
            <button onClick={() => setIsMobileSidebarOpen(true)} className="text-white flex items-center gap-2 px-3 py-1.5 bg-white/10 rounded-sm hover:bg-white/20">
              <Menu className="w-5 h-5" />
              <span className="font-medium text-sm">Tools Menu</span>
            </button>
            <span className="text-slate-400 font-medium text-sm capitalize">{activeTool.replace('-', ' ')}</span>
          </div>
        )}

        {/* Dynamic Tool Rendering with Framer Motion */}
        <div className="flex-1 overflow-hidden p-4 md:p-6 lg:p-8 custom-scrollbar">
          
            <div
              key={activeTool}
              className="w-full h-full"
            >
              {renderWorkspace()}
            </div>
          
        </div>
      </div>

      {/* Right Insights Panel */}
      {(!isMobile && !isTablet) && (
        <AiInsights />
      )}

    </div>
  );
};

export default AiAssistant;
