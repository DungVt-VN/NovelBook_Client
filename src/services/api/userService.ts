// src/services/api/userService.ts
import apiClient from './apiClient';

export const getUser = async (userId: string) => {
  const response = await apiClient.get(`/users/${userId}`);
  return response.data;
};

export const createUser = async (userData: unknown) => {
  const response = await apiClient.post('/users', userData);
  return response.data;
};

// Thêm các hàm khác nếu cần