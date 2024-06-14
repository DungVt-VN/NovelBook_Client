// src/store/selectors/authSelectors.ts
import { RootState } from '../reducers/rootReducer';

export const selectIsLoggedIn = (state: RootState) => state.auth.isLoggedIn;
export const selectCurrentUser = (state: RootState) => state.auth.user;
export const selectAuthLoading = (state: RootState) => state.auth.loading;
export const selectAuthError = (state: RootState) => state.auth.error;