// src/store/types/authTypes.ts
export interface AuthState {
    isLoggedIn: boolean;
    user: unknown | null;
    loading: boolean;
    error: string | null;
  }