import axios from "axios";

export const axiosInstance = axios.create({
  // baseURL: import.meta.env.VITE_API_URL || "http://localhost:4000/api/v1",
  baseURL: "https://skay-api-rz2x.onrender.com/api/v1",
  // baseURL: "http://localhost:4000/api/v1",
  withCredentials: true,
});
