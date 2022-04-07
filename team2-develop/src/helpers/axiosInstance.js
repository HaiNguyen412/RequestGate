import axios from "axios";
import queryString from "query-string";
import { API_BASE_URL } from "./configEnv";
const axiosInstance = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH,OPTIONS",
  },
  paramsSerializer: (params) => queryString.stringify(params),
});
axiosInstance.interceptors.request.use(async (config) => {
  if (localStorage.userInfo) {
    const userStorage = JSON.parse(localStorage.getItem("userInfo"));
    config.headers.Authorization = `Bearer ${userStorage.token}`;
  }
  return config;
});
axiosInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    throw error;
  }
);
export default axiosInstance;
