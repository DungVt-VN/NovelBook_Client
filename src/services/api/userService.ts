// src/services/api/userService.ts
import apiClient from './apiClient';
import User from '../models/User';

export const getAllUsers = async (token: string): Promise<User[]> => {
  try {
    const response = await apiClient.get(`admin/users1`, {
      headers: {
        Authorization: `Bearer ${token}`, // Assuming token is a JWT token
      },
    });
    console.log("safasf");
    return response.data as User[]; // Cast response data to User[]
  } catch (error) {
    console.error('Error fetching users:', error);
    throw error; // Rethrow the error for handling in the calling code
  }
};

export const createUser = async (userData: unknown) => {
  try {
    const response = await apiClient.post('/users', userData);
    return response.data;
  } catch (error) {
    console.error('Error creating user:', error);
    throw error;
  }
};

// Add more functions as needed
