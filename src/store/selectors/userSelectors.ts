// src/store/selectors/userSelectors.ts
import { RootState } from '../reducers/rootReducer';

export const selectUserDetails = (state: RootState) => state.user.userDetails;
export const selectUserLoading = (state: RootState) => state.user.loading;
export const selectUserError = (state: RootState) => state.user.error;