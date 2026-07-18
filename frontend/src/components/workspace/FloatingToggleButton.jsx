import React from 'react';

import { useWorkspace } from '../../context/WorkspaceContext';
import { Maximize2, Minimize2, Menu } from 'lucide-react';

const FloatingToggleButton = () => {
  const { isFullscreen, toggleFullscreen, toggleNavigator } = useWorkspace();

  if (!isFullscreen) return null;

  return (
    <div className="fixed top-6 right-6 z-[200] flex gap-3">
      <button
        onClick={toggleNavigator}
        className="w-10 h-10 rounded-full bg-slate-800 border border-slate-700 flex items-center justify-center text-white hover:bg-slate-700 shadow-xl"
      >
        <Menu className="w-5 h-5" />
      </button>

      <button
        onClick={toggleFullscreen}
        className="w-10 h-10 rounded-full bg-blue-600 hover:bg-blue-500 flex items-center justify-center text-white shadow-xl"
      >
        <Minimize2 className="w-5 h-5" />
      </button>
    </div>
  );
};

export default FloatingToggleButton;
