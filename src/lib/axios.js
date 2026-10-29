import axios from "axios";

export const axiosInstance = axios.create({
  // baseURL: import.meta.env.VITE_API_URL || "http://localhost:4000/api/v1",
  baseURL: "https://skay-api-rz2x.onrender.com/api/v1",
  // baseURL: "http://localhost:4000/api/v1",
  withCredentials: true,
});


export async function getBaseUrl() {
  const hostname = window.location.hostname;
  const isDev = hostname === "localhost" || hostname.startsWith("192.168.") || hostname.startsWith("10.") || hostname.startsWith("172");

  if (isDev) {
    return "http://localhost:4000";
  }

  // deployed server
  const match = hostname.match(/^(\w+)(-\d+)?\.onrender\.com$/);
  const baseUrl = match
    ? `https://${match[0]}/api/v1`
    : "https://skay-api-rz2x.onrender.com/api/v1"; // fallback

  return baseUrl;
}

export const axiosInstance = axios.create({
  baseURL: await getBaseUrl(),
  withCredentials: true,
});
