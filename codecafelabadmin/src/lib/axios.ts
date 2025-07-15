import axios from "axios";

const apiClient = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BACKEND_URL || 'http://localhost:5000/api',
  headers: { "Content-Type": "application/json" },
});

// Add a request interceptor
apiClient.interceptors.request.use(
  (config) => {
    // Get token from localStorage or context
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

export default apiClient; 