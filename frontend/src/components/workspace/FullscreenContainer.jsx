import React, { useEffect } from 'react';
import { useWorkspace } from '../../context/WorkspaceContext';

const FullscreenContainer = ({ children }) => {
  const { isFullscreen } = useWorkspace();

  useEffect(() => {
    if (isFullscreen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [isFullscreen]);

  return (
    <div
      id="workspace-fullscreen-container"
      className={`w-full h-full flex flex-col ${isFullscreen ? 'fixed inset-0 z-[100] bg-white dark:bg-slate-950 p-4' : 'bg-transparent'}`}
    >
      {children}
    </div>
  );
};

export default FullscreenContainer;
