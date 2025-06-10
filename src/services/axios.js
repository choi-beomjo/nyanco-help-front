
// src/services/axios.js
import axios from "axios";

// API 기본 URL 설정
const API_URL = "https://nyanco-1086978196312.asia-northeast3.run.app"; 

const api = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// 요청 인터셉터 설정 (토큰 자동 포함)
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
}, (error) => {
  return Promise.reject(error);
});

export default api;
