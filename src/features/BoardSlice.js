import { createSlice, current } from "@reduxjs/toolkit";

// 초기 상태를 정의하는 것
const initialState = {
  lastId: 0, //noticeId..
  inputData: [
    {
      id: "",
      title: "",
      content: "",
      createdAt: "",
      updatedAt: "",
      writer: "",
    },
  ],
  selectRowData: {},
};

// Slice 생성
export const boardSlice = createSlice({
  name: "board",
  initialState, //initialState에 dispatch 하는 것 (noticeModal onSave)
  reducers: {
    // save, ~ ~ ~ ~ ~4가지가 actions
    save: (state, action) => {
      console.log(action);
      console.log(current(state));
      return {
        // 초기값에 생성한 lastId값에 +1
        // 값 받고나면 +1 없어도됌
        lastId: state.lastId + 1,
        // inputData에 concat을 활용해 기존에 있는값과 id가 합쳐짐.
        // concat = 배열을 합치는 함수
        inputData: state.inputData.concat({
          ...action.payload,
          id: state.lastId + 1,
          // 이 안에 내용을 stte.inputData에 합치는 것
        }),
      };
    },

    select: (state, action) => {
      console.log(action);
      //state = initialState
      // console.log(action);
      // state에 있는 selectRowData는 id값을 받아오는 action.payload와
      // id가 값으면 inputData의 첫번째 값을 반환해 저장함.
      // state.inputData = 배열
      state.selectRowData = state.inputData.find(
        row => row.id === action.payload
      );
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

export const { save, select, edit, remove } = boardSlice.actions;

export default boardSlice.reducer;
