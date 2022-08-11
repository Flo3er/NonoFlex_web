import { configureStore } from "@reduxjs/toolkit";
import boardSlice from "./BoardSlice";

// import { persistReducer } from "redux-persist";
// import { combineReducers } from "redux";
// import storage from "redux-persist/lib/storage";

// const persistConfig = {
//   key: "root",
//   storage,
//   // persist 제외하고 싶은 부분
//   blacklist: [],
//   // persist를 적용하고 싶은 부분 따로 설정, 설정없을 시 모든 곳에서 적용됨.
//   whitelist: [],
// };

// configureStore를 통해 store생성
export const store = configureStore({
  // reducer 정의
  reducer: {
    board: boardSlice,
  },
});
