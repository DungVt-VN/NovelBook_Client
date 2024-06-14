// src/store/actions/authActions.ts
import { AppDispatch } from '../store';
import apiClient from '../../services/api/apiClient';
import { loginStart, loginSuccess, loginFailure, logout } from '../reducers/authReducer';

export const login = (email: string, password: string) => async (dispatch: AppDispatch) => {
  dispatch(loginStart());
  try {
    const response = await apiClient.post('/login', { email, password });
    dispatch(loginSuccess(response.data));
  } catch (error) {
    dispatch(loginFailure('Failed to login'));
  }
};

export const logoutUser = () => (dispatch: AppDispatch) => {
  logout();
  dispatch(logout());
};