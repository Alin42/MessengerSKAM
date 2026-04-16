import axios from "axios";
import { API_URL } from "./config";

export const api = axios.create({
  baseURL: API_URL
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem("session_token");

  const isAuthRoute =
    config.url?.includes("/login") ||
    config.url?.includes("/register");

  if (!isAuthRoute && token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});