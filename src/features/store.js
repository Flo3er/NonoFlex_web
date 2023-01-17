import { combineReducers, configureStore } from '@reduxjs/toolkit';
import documentPartnerSlice from './document/DocumentPartnerSlice.js';
import documentProductSlice from './document/DocumentProductSlice.js';
import documentSlice from './document/DocumentSlice.js';
import tempDocumentSlice from './document/TempDocumentSlice.js';
import loginSlice from './login/LoginSlice.js';
import noticeSlice from './main/NoticeSlice.js';
import searchSlice from './main/SearchSlice.js';
import productSlice from './product/productSlice.js';
import companySlice from './settings/companySlice.js';
import userSlice from './settings/userSlice.js';


const rootReducer = combineReducers({
  login: loginSlice,
  notice: noticeSlice,
  search: searchSlice,
  product: productSlice,
  document: documentSlice,
  tempDocument: tempDocumentSlice,
  documentProduct: documentProductSlice,
  documentPartner: documentPartnerSlice,
  company: companySlice,
  user: userSlice
});

export const store = configureStore({
  reducer: rootReducer,
});
