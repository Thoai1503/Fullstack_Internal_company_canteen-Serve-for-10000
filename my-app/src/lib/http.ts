import axios from "axios";
import { API_URL } from "@/helper/api";

const http = axios.create({
  // baseURL: "http://localhost:8000/Thoai-pro-spring",
  //baseURL: "http://103.90.225.130:9000",
  baseURL: API_URL,
  withCredentials: true,
});

http.interceptors.request.use(
  (config) => {
    if (typeof window !== undefined) {
      const token = localStorage.getItem("token");
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
    }
    return config;
  },
  (error) => {
    Promise.reject(error);
  }
);

export default http;
