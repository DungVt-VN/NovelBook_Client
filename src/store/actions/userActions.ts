// src/store/actions/userActions.ts
import { AppDispatch } from '../store';
import apiClient from '../../services/api/apiClient';
import { fetchUserStart, fetchUserSuccess, fetchUserFailure } from '../reducers/userReducer';

export const fetchUser = (userId: string) => async (dispatch: AppDispatch) => {
  dispatch(fetchUserStart());
  try {
    const response = await apiClient.get(`/users/${userId}`);
    dispatch(fetchUserSuccess(response.data));
  } catch (error) {
    dispatch(fetchUserFailure('Failed to fetch user data'));
  }
};