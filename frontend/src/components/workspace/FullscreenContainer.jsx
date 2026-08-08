import React, { useEffect } from 'react';

import { useWorkspace } from '../../context/WorkspaceContext';

const FullscreenContainer = ({ children }) => {
  const { isFullscreen } = useWorkspace();

  // Prevent background scrolling when in fullscreen
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
      className={`bg-slate-50 dark:bg-[#0B1120] overflow-hidden flex flex-col ${isFullscreen ? 'fixed inset-0 z-[100]' : 'border border-slate-200/50 dark:border-white/5 rounded-2xl w-full h-full'}`}
    >
      {children}
    </div>
  );
};

export default FullscreenContainer;
