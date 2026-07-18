import React, { createContext, useContext, useState, useEffect } from 'react';

const WorkspaceContext = createContext();

export const WorkspaceProvider = ({ children }) => {
  const [isFullscreen, setIsFullscreen] = useState(!!document.fullscreenElement);
  const [isNavigatorOpen, setIsNavigatorOpen] = useState(false);
  const [activeObject, setActiveObject] = useState(null);
  
  // Custom objects for navigator specific to the page using the workspace
  const [objects, setObjects] = useState([]); 

  const toggleFullscreen = () => {
    if (!document.fullscreenElement && !isFullscreen) {
      const container = document.getElementById('workspace-fullscreen-container') || document.documentElement;
      container.requestFullscreen()
        .then(() => {
          // The event listener will handle setting state
        })
        .catch((err) => {
          console.warn(`Browser native fullscreen blocked/failed. Using simulated viewport fullscreen instead. Error: ${err.message}`);
          setIsFullscreen(true);
        });
    } else {
      if (document.fullscreenElement) {
        if (document.exitFullscreen) {
          document.exitFullscreen();
        }
      } else {
        setIsFullscreen(false);
      }
    }
  };

  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement);
    };

    document.addEventListener('fullscreenchange', handleFullscreenChange);
    return () => document.removeEventListener('fullscreenchange', handleFullscreenChange);
  }, []);

  const toggleNavigator = () => setIsNavigatorOpen(prev => !prev);

  return (
    <WorkspaceContext.Provider value={{
      isFullscreen,
      setIsFullscreen,
      isNavigatorOpen,
      setIsNavigatorOpen,
      activeObject,
      setActiveObject,
      objects,
      setObjects,
      toggleFullscreen,
      toggleNavigator
    }}>
      {children}
    </WorkspaceContext.Provider>
  );
};

export const useWorkspace = () => {
  const context = useContext(WorkspaceContext);
  if (!context) {
    throw new Error('useWorkspace must be used within a WorkspaceProvider');
  }
  return context;
};
