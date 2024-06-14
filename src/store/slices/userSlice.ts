// src/store/slices/userSlice.ts
import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit';
import apiClient from '../../services/api/apiClient';

interface UserState {
  userDetails: unknown | null;
  loading: boolean;
  error: string | null;
}

const initialState: UserState = {
  userDetails: null,
  loading: false,
  error: null,
};

export const fetchUser = createAsyncThunk(
  'user/fetchUser',
  async (userId: string, { rejectWithValue }) => {
    try {
      const response = await apiClient.get(`/users/${userId}`);
      return response.data;
    } catch (error) {
      return rejectWithValue('Failed to fetch user data');
    }
  }
);

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchUser.fulfilled, (state, action: PayloadAction<unknown>) => {
        state.userDetails = action.payload;
        state.loading = false;
      })
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      .addCase(fetchUser.rejected, (state, action: PayloadAction<any>) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default userSlice.reducer;