import axios from "axios";

// Dynamic API base URL that works for both development and production
const apiBaseUrl = process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:5000";

const apiClient = axios.create({
  baseURL: apiBaseUrl,
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});

// Removed token interceptor - APIs now work without authentication tokens

export default apiClient;
