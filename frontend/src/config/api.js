// API configuration with fallback to localhost
export const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:8080';
export const WS_BASE_URL = process.env.REACT_APP_WS_URL || 'ws://localhost:8080';

// Helper function to get full API URL
export const getApiUrl = (endpoint) => `${API_BASE_URL}${endpoint}`;

// Helper function to get full WebSocket URL
export const getWsUrl = (endpoint) => `${WS_BASE_URL}${endpoint}`;