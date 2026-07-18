import React, { useState, useEffect } from 'react';
import { useWorkspace } from '../context/WorkspaceContext';
import { messagesApi } from '../services/mockDjangoMessagesApi';
import useResponsive from '../hooks/useResponsive';
import { Maximize2, Minimize2 } from 'lucide-react';

import ChatSidebar from '../components/messages/ChatSidebar';
import ChatWindow from '../components/messages/ChatWindow';
import MessagesDashboard from '../components/messages/MessagesDashboard';
import ChatDetailsPanel from '../components/messages/ChatDetailsPanel';
import WidgetWrapper from '../components/WidgetWrapper';

const Messages = () => {
  const [conversations, setConversations] = useState([]);
  const [activeChatId, setActiveChatId] = useState(null);
  const [showDetailsPanel, setShowDetailsPanel] = useState(false);
  
  const { isFullscreen, toggleFullscreen } = useWorkspace();
  const { isMobile: isMobileView, isTablet } = useResponsive();

  useEffect(() => {
    messagesApi.getConversations().then(data => {
      setConversations(data);
    });
  }, []);

  const activeChat = conversations.find(c => c.id === activeChatId) || null;

  // Layout Logic
  // Mobile: Only show ONE view at a time (Sidebar OR ChatWindow OR DetailsPanel)
  // Tablet: Show Sidebar + ChatWindow (hide details)
  // Desktop: Show Sidebar + ChatWindow + DetailsPanel (if active)
  
  const showSidebar = !isMobileView || (isMobileView && !activeChatId && !showDetailsPanel);
  const showChatArea = activeChatId && (!isMobileView || (isMobileView && !showDetailsPanel));
  const showDetails = showDetailsPanel && activeChat && !isFullscreen;

  return (
    <div className={`relative w-full ${isFullscreen ? 'h-full border-0 rounded-none' : 'h-[calc(100vh-80px)] sm:h-[calc(100vh-140px)] border border-slate-200/50 dark:border-white/5 rounded-sm'} flex flex-col overflow-hidden bg-slate-50 dark:bg-slate-950`}>
      
      {/* Fullscreen Toggle Header */}
      <div className="absolute top-4 right-4 z-50 pointer-events-none flex justify-end">
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
            <ChatSidebar 
              conversations={conversations} 
              activeChatId={activeChatId} 
              setActiveChatId={(id) => {
                setActiveChatId(id);
                setShowDetailsPanel(false);
              }} 
            />
          </div>
        )}

        {/* Center Pane: Chat Area or Dashboard */}
        <div className={`flex-1 h-full flex flex-col min-h-0 min-w-0 ${!showChatArea && isMobileView ? 'hidden' : 'block'}`}>
          {activeChat ? (
            <ChatWindow 
              activeChat={activeChat} 
              isMobileView={isMobileView}
              onBack={() => {
                setActiveChatId(null);
                setShowDetailsPanel(false);
              }}
              onToggleDetails={() => setShowDetailsPanel(!showDetailsPanel)}
              showDetailsPanel={showDetailsPanel}
            />
          ) : (
            <div className="h-full hidden sm:block">
              <MessagesDashboard 
                onStartChat={() => {
                  // Focus search or start new chat flow
                  document.getElementById('chat-search-input')?.focus();
                }} 
              />
            </div>
          )}
        </div>

        {/* Right Pane: Details */}
        {showDetails && (
          <div className={`${isMobileView ? 'absolute inset-0 z-40 bg-white dark:bg-slate-900' : 'block'} h-full`}>
            <ChatDetailsPanel 
              activeChat={activeChat} 
              onClose={() => setShowDetailsPanel(false)} 
            />
          </div>
        )}

      </div>
    </div>
  );
};

export default Messages;
