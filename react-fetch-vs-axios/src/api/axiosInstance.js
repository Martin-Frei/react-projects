import axios from 'axios';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || 'https://jsonplaceholder.typicode.com',
  timeout: Number(import.meta.env.VITE_API_TIMEOUT) || 5000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request Interceptor — e.g. attach auth tokens
api.interceptors.request.use(
  (config) => {
    // const token = localStorage.getItem('token');
    // if (token) config.headers.Authorization = `Bearer ${token}`;
    return config;
  },
  (error) => Promise.reject(error)
);

// Response Interceptor — e.g. handle 401 redirects
api.interceptors.response.use(
  (response) => response,
  (error) => {
    // if (error.response?.status === 401) { redirect to login }
    return Promise.reject(error);
  }
);

export default api;