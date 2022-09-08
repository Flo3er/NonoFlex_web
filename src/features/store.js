import { configureStore } from "@reduxjs/toolkit";
import boardSlice from "./BoardSlice";
import companySlice from "./CompanySlice";

// configureStore를 통해 store생성
export const store = configureStore({
  // reducer 정의
  reducer: {
    board: boardSlice,
    company: companySlice
  }
});
