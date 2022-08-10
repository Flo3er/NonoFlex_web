import { createSlice, current } from '@reduxjs/toolkit';

// 초기값 생성
const initialState = {
    lastId: 0,
    inputData: [
        {
            id:'',
            title:'',
            content:''
        }
    ],
    selectRowData: {}
}

// Slice 생성
// 현재 save와 select만 작동되는 걸 확인해서 기능은 저 두개만 확인하면 됨.
export const boardSlice = createSlice({
    name: 'board',
    initialState,
    reducers: {
        save: (state, action) => {
            console.log(action)
            console.log(current(state))
            return{
            // 초기값에 생성한 lastId값에 +1을 해줌.
            lastId: state.lastId + 1,
            // 초기값에 생성한 inputData에 concat을 활용해 기존에 있는값과 id가 합쳐짐.
            // concat: 배열 합지는 함수
            inputData: state.inputData.concat({
                ...action.payload,
                id: state.lastId + 1
            })
            }
        },
        // 
        select: (state, action) => {
            console.log(action)
            // state에 있는 selectRowData는 id값을 받아오는 action.payload와 id가 값으면 inputData의 첫번째 값을 반환해 저장함.
            // 즉 BoardList.js에서 selectContent는 id를 파라미터로 받으며 그 값을 select action에 dispatch한다.
            state.selectRowData = state.inputData.find(row => row.id === action.payload)
            console.log(current(state.selectRowData))
        },
        // 여기부터는 작동이 되는지 확인을 안해봄.
        edit: (state, action) => {
            return{
            state,
            inputData: state.inputData.map(row =>
                row.id === action.payload.id ?
                {...action.payload} : row
            ),
            selectRowData: {}
        }},
        remove: (state, action) => {
            return{
            lastId: state.lastId === action.inputData.id ? state.lastId - 1 : state.lastId,
            nputData: state.inputData.filter(row =>
                row.id !== action.payload.id),
            selectRowData: {}
        }}
    },
    extraReducers: {}
})

export const { save, select, edit, remove } = boardSlice.actions;

export default boardSlice.reducer;
