/**
 * Configuration utility for dynamically determining environment settings.
 */

export const getApiBaseUrl = () => {
  // If we have an explicit env var, use it (works for local dev or if explicitly set in prod build)
  if (import.meta.env.VITE_API_URL && import.meta.env.VITE_API_URL !== 'http://localhost:8000') {
    return import.meta.env.VITE_API_URL;
  }

  // If we are running in the browser and the host is not localhost,
  // we dynamically infer the API url from the current origin to avoid 
  // hardcoded localhost URLs causing issues on production servers.
  if (typeof window !== 'undefined') {
    const hostname = window.location.hostname;
    
    // Check if we're on a real server (not localhost)
    if (hostname !== 'localhost' && hostname !== '127.0.0.1') {
      // In production, the backend is typically on the same origin or a specific subdomain
      // Here we assume it's hosted on the same origin (e.g. served via Nginx/proxy)
      // Modify this if the backend is hosted on a specific subdomain (e.g. api.domain.com)
      return window.location.origin;
    }
  }

  // Fallback to localhost for local development
  return 'http://localhost:8000';
};
