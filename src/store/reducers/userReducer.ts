// src/store/reducers/userReducer.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { UserState } from '../types/userTypes';

const initialState: UserState = {
  userDetails: null,
  loading: false,
  error: null,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    fetchUserStart(state) {
      state.loading = true;
      state.error = null;
    },
    fetchUserSuccess(state, action: PayloadAction<unknown>) {
      state.userDetails = action.payload;
      state.loading = false;
    },
    fetchUserFailure(state, action: PayloadAction<string>) {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export const { fetchUserStart, fetchUserSuccess, fetchUserFailure } = userSlice.actions;
export default userSlice.reducer;