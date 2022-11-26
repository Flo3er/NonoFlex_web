import { combineReducers, configureStore } from '@reduxjs/toolkit';
import loginSlice from './login/LoginSlice.js';
import noticeSlice from './main/NoticeSlice.js';

const rootReducer = combineReducers({
  login: loginSlice,
  notice: noticeSlice
});

export const store = configureStore({
  reducer: rootReducer,
});
