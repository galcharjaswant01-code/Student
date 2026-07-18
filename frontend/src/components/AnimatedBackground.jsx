import React from 'react';


const AnimatedBackground = () => {
  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none z-[-1]">
      <div
        className="absolute top-[-10%] left-[-10%] w-[50vw] h-[50vw] rounded-full bg-primary/20 blur-[100px]"
      />
      
      <div
        className="absolute bottom-[-10%] right-[-10%] w-[60vw] h-[60vw] rounded-full bg-secondary/20 blur-[120px]"
      />
      
      <div
        className="absolute top-[30%] left-[40%] w-[40vw] h-[40vw] rounded-full bg-accent/20 blur-[90px]"
      />
    </div>
  );
};

export default AnimatedBackground;
