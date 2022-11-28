import { combineReducers, configureStore } from '@reduxjs/toolkit';
import loginSlice from './login/LoginSlice.js';
import noticeSlice from './main/NoticeSlice.js';
import searchSlice from './main/SearchSlice.js';

const rootReducer = combineReducers({
  login: loginSlice,
  notice: noticeSlice,
  search: searchSlice
});

export const store = configureStore({
  reducer: rootReducer,
});
