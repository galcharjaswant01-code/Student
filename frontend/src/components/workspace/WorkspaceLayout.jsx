import React, { useEffect } from 'react';
import { WorkspaceProvider, useWorkspace } from '../../context/WorkspaceContext';
import FullscreenContainer from './FullscreenContainer';
import ObjectNavigator from './ObjectNavigator';
import FloatingToggleButton from './FloatingToggleButton';

const WorkspaceLayoutContent = ({ children, objects }) => {
  const { setObjects, isFullscreen, isNavigatorOpen } = useWorkspace();

  useEffect(() => {
    if (objects) {
      setObjects(objects);
    }
  }, [objects, setObjects]);

  return (
    <div className="w-full h-full min-h-[70vh] relative p-1 sm:p-4">
      <FullscreenContainer>
        <ObjectNavigator />
        
        {/* Main Content Area */}
        <div 
          className={`flex-1 overflow-y-auto custom-scrollbar h-full bg-transparent relative z-10 transition-all duration-300 ${
            isFullscreen && isNavigatorOpen ? 'md:ml-72' : 'ml-0'
          }`}
        >
          <div className="h-full">
            {children}
          </div>
        </div>
      </FullscreenContainer>
    </div>
  );
};

export const WorkspaceLayout = ({ children, objects }) => {
  return (
    <WorkspaceProvider>
      <WorkspaceLayoutContent objects={objects}>
        {children}
      </WorkspaceLayoutContent>
    </WorkspaceProvider>
  );
};

export default WorkspaceLayout;
