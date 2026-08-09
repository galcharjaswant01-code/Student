/**
 * Configuration utility for dynamically determining environment settings.
 */

export const getApiBaseUrl = () => {
  if (import.meta.env.VITE_API_URL) {
    return import.meta.env.VITE_API_URL;
  }

  if (typeof window !== 'undefined') {
    const hostname = window.location.hostname;
    if (hostname !== 'localhost' && hostname !== '127.0.0.1') {
      return 'https://student-xoqx.onrender.com';
    }
  }

  return 'https://student-xoqx.onrender.com';
};
