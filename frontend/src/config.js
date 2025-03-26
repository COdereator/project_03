// Configuration for different environments
const config = {
  // API URL based on environment
  API_URL: import.meta.env.VITE_API_URL || (
    import.meta.env.PROD 
      ? window.location.origin + '/api' // Use relative path in production to avoid CORS issues
      : 'http://localhost:5000/api'
  ),
  // Add headers configuration
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json'
  }
};

export default config;
