import { configureStore } from '@reduxjs/toolkit';
import loginSlice from './login/LoginSlice';

export const store = configureStore({
  reducer: {
    login: loginSlice
  },
});
