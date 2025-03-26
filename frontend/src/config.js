// Configuration for different environments
const config = {
  // API URL based on environment - for single deployment, we use relative URLs in production
  API_URL: import.meta.env.VITE_API_URL || (
    import.meta.env.PROD 
      ? '/api' // In production, API is on same origin with /api prefix
      : 'http://localhost:5000/api' // In development, use separate backend URL
  ),
  // Add headers configuration
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json'
  }
};

export default config;
