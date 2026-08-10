/**
 * Configuration utility for dynamically determining environment settings.
 */

export const getApiBaseUrl = () => {
  if (typeof window !== 'undefined') {
    const hostname = window.location.hostname;
    if (hostname !== 'localhost' && hostname !== '127.0.0.1') {
      return 'https://student-xoqx.onrender.com';
    }
  }

  const envUrl = import.meta.env.VITE_API_URL;
  if (envUrl && !envUrl.includes('localhost') && !envUrl.includes('backend-seven-blush')) {
    return envUrl;
  }

  return 'https://student-xoqx.onrender.com';
};
