// src/store/types/userTypes.ts
export interface UserState {
    userDetails: unknown | null;
    loading: boolean;
    error: string | null;
  }