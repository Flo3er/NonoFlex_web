import { combineReducers, configureStore } from '@reduxjs/toolkit';
import documentSlice from './document/DocumentSlice.js';
import loginSlice from './login/LoginSlice.js';
import noticeSlice from './main/NoticeSlice.js';
import searchSlice from './main/SearchSlice.js';
import productSlice from './product/productSlice.js';


const rootReducer = combineReducers({
  login: loginSlice,
  notice: noticeSlice,
  search: searchSlice,
  product: productSlice,
  document: documentSlice
});

export const store = configureStore({
  reducer: rootReducer,
});
