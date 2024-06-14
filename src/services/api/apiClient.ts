// src/services/api/apiClient.ts
import axios from 'axios';

const apiClient = axios.create({
  baseURL: process.env.REACT_APP_API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

apiClient.interceptors.request.use(config => {
  // Thêm logic để chèn token hoặc xử lý request trước khi gửi đi
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

apiClient.interceptors.response.use(
  response => response,
  error => {
    // Thêm logic xử lý lỗi
    return Promise.reject(error);
  }
);

export default apiClient;