import axios from "axios";

const apiClient = axios.create({
  baseURL: "http://localhost:5000/api",
});

// Add a request interceptor to attach the token
apiClient.interceptors.request.use(
  (config) => {
    if (typeof window !== "undefined") {
      const token = localStorage.getItem("token");
      if (token) {
        config.headers = config.headers || {};
        config.headers["Authorization"] = `Bearer ${token}`;
      }
    }
    return config;
  },
  (error) => Promise.reject(error)
);

export default apiClient; 