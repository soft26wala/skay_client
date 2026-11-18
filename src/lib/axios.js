import axios from "axios";

export const axiosInstance = axios.create({
  // baseURL: import.meta.env.VITE_API_URL || "http://localhost:4000/api/v1",
  baseURL: "https://skay-api-rz2x.onrender.com/api/v1",
  // baseURL: "http://localhost:4000/api/v1",
  withCredentials: true,
});

// Interceptor to always attach JWT Bearer token from localStorage
// Fixes Safari / Apple ITP / Canada / cross-origin third-party cookie restrictions
axiosInstance.interceptors.request.use(
  (config) => {
    try {
      const token =
        localStorage.getItem("client_token") ||
        localStorage.getItem("token");
      if (token) {
        config.headers = config.headers || {};
        config.headers.Authorization = `Bearer ${token}`;
      }
    } catch (e) {
      console.warn("Could not read client_token from localStorage", e);
    }
    return config;
  },
  (error) => Promise.reject(error)
);
