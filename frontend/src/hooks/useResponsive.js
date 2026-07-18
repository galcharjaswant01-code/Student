import { useState, useEffect } from 'react';

const breakpoints = {
  mobile: 768,   // md
  tablet: 1024,  // lg
  desktop: 1280, // xl
};

const useResponsive = () => {
  const [windowWidth, setWindowWidth] = useState(
    typeof window !== 'undefined' ? window.innerWidth : 1024
  );

  useEffect(() => {
    if (typeof window === 'undefined') return;

    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener('resize', handleResize);
    
    // Initial call
    handleResize();

    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return {
    isMobile: windowWidth < breakpoints.mobile,
    isTablet: windowWidth >= breakpoints.mobile && windowWidth < breakpoints.tablet,
    isDesktop: windowWidth >= breakpoints.tablet,
    isLargeDesktop: windowWidth >= breakpoints.desktop,
    windowWidth,
  };
};

export default useResponsive;
