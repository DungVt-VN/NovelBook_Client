// src/store/reducers/rootReducer.ts
import { combineReducers } from '@reduxjs/toolkit';
import authReducer from './authReducer';
import userReducer from './userReducer';

const rootReducer = combineReducers({
  auth: authReducer,
  user: userReducer,
});

export type RootState = ReturnType<typeof rootReducer>;
export default rootReducer;