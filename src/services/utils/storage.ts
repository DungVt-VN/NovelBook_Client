// src/services/utils/storage.ts
export const saveToStorage = (key: string, value: string) => {
    localStorage.setItem(key, value);
  };
  
  export const getFromStorage = (key: string): string | null => {
    return localStorage.getItem(key);
  };
  
  export const removeFromStorage = (key: string) => {
    localStorage.removeItem(key);
  };