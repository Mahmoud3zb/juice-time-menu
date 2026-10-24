import axios from "axios";

export const API_BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:3000";

export const apiClient = axios.create({
  baseURL: API_BASE_URL,
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});

/**
 * Checks if a JWT token has expired (using payload.exp)
 */
export const isTokenExpired = (token: string | null): boolean => {
  if (!token) return true;
  try {
    const parts = token.split(".");
    if (parts.length !== 3) return false;
    const base64 = parts[1].replace(/-/g, "+").replace(/_/g, "/");
    const jsonPayload = decodeURIComponent(
      atob(base64)
        .split("")
        .map((c) => "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2))
        .join("")
    );
    const payload = JSON.parse(jsonPayload);
    if (!payload.exp) return false;
    // Expired if current time >= exp in seconds (with 10s buffer)
    return Date.now() >= (payload.exp - 10) * 1000;
  } catch {
    return false;
  }
};

/**
 * Smoothly clears authentication and redirects to login with expired notice
 */
export const handleSessionExpired = () => {
  localStorage.removeItem("juice_time_token");
  localStorage.removeItem("juice_time_user");
  if (window.location.pathname.startsWith("/admin") && !window.location.pathname.includes("/login")) {
    window.location.href = "/admin/login?expired=1";
  }
};

/**
 * Helper to identify 401 / session expiration errors
 */
export const isAuthError = (err: unknown): boolean => {
  return (
    axios.isAxiosError(err) &&
    (err.response?.status === 401 || err.code === "ERR_CANCELED")
  );
};

// Request Interceptor: Attach JWT Token if valid, otherwise smoothly expire
apiClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("juice_time_token");
    if (token) {
      if (isTokenExpired(token)) {
        handleSessionExpired();
        return Promise.reject(new axios.Cancel("Session expired"));
      }
      if (config.headers) {
        config.headers.Authorization = `Bearer ${token}`;
      }
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Response Interceptor: Global handler for 401 unauthorized responses
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      handleSessionExpired();
    }
    return Promise.reject(error);
  }
);

export const getErrorMessage = (err: unknown, defaultMessage: string = "حدث خطأ غير متوقع"): string => {
  if (isAuthError(err)) {
    return "";
  }
  if (axios.isAxiosError(err)) {
    const data = err.response?.data;
    if (data?.message) return data.message;
    if (Array.isArray(data?.errors)) {
      const msgs = data.errors.map((e: { message?: string }) => e.message || "").filter(Boolean);
      if (msgs.length > 0) return msgs.join("، ");
    }
  }
  if (err instanceof Error) {
    return err.message;
  }
  return defaultMessage;
};

export default apiClient;
