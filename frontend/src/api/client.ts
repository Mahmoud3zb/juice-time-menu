import axios from "axios";

export const API_BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:3000";

export const apiClient = axios.create({
  baseURL: API_BASE_URL,
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});

// Request Interceptor: Attach JWT Token if available in localStorage
apiClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("juice_time_token");
    if (token && config.headers) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Response Interceptor: Global handler for unauthorized responses
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // If unauthorized on admin routes, clear token
      if (window.location.pathname.startsWith("/admin") && !window.location.pathname.includes("/login")) {
        localStorage.removeItem("juice_time_token");
        localStorage.removeItem("juice_time_user");
        window.location.href = "/admin/login";
      }
    }
    return Promise.reject(error);
  }
);

export default apiClient;
