import { combineReducers, configureStore } from '@reduxjs/toolkit';
import loginSlice from './login/LoginSlice.js';
import noticeSlice from './main/NoticeSlice.js';
import searchSlice from './main/SearchSlice.js';
import productSlice from './product/productSlice.js';

const rootReducer = combineReducers({
  login: loginSlice,
  notice: noticeSlice,
  search: searchSlice,
  product: productSlice
});

export const store = configureStore({
  reducer: rootReducer,
});
