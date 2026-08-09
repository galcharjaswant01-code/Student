import React, { useEffect } from 'react';
import { WorkspaceProvider, useWorkspace } from '../../context/WorkspaceContext';
import FullscreenContainer from './FullscreenContainer';

const WorkspaceLayoutContent = ({ children, objects }) => {
  const { setObjects } = useWorkspace();

  useEffect(() => {
    if (objects) {
      setObjects(objects);
    }
  }, [objects, setObjects]);

  return (
    <div className="w-full h-full min-h-[80vh] relative p-0">
      <FullscreenContainer>
        <div className="flex-1 w-full h-full bg-transparent">
          {children}
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
