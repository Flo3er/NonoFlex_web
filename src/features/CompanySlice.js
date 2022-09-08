import { createSlice, current } from "@reduxjs/toolkit";

// 초기 상태를 정의하는 것
const initialState = {
  lastId: 0,
  companyData: [
    {
      id: "",
      name: "",
      type: "",
      category: ""
    },
  ],
  selectRowData: {},
};

// Slice 생성
export const companySlice = createSlice({
  name: "company",
  initialState,
  reducers: {
    save: (state, action) => {
      console.log(action);
      console.log(current(state));
      return {
        // 초기값에 생성한 lastId값에 +1
        lastId: state.lastId + 1,
        // inputData에 concat을 활용해 기존에 있는값과 id가 합쳐짐.
        // concat = 배열을 합치는 함수
        companyData: state.companyData.concat({
          ...action.payload,
          id: state.lastId + 1,
          // 이 안에 내용을 state.inputData에 합치는 것
        }),
      };
    },
    select: (state, action) => {
      console.log(action);
      // state에 있는 selectRowData는 id값을 받아오는 action.payload와
      // id가 값으면 inputData의 첫번째 값을 반환해 저장함.
      state.selectRowData = state.inputData.find(
        row => row.id === action.payload
      );
      console.log(current(state.selectRowData));
    },
    edit: (state, action) => {
      return {
        state,
        inputData: state.inputData.map(row =>
          row.id === action.payload.id ? { ...action.payload } : row
        ),
        selectRowData: {},
      };
    },
    remove: (state, action) => {
      return {
        lastId:
          state.lastId === action.inputData.id
            ? state.lastId - 1
            : state.lastId,
        nputData: state.inputData.filter(row => row.id !== action.payload.id),
        selectRowData: {},
      };
    },
  },
  extraReducers: {},
});

export const { save, select, edit, remove } = companySlice.actions;

export default companySlice.reducer;
