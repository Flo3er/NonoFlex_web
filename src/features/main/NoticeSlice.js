import { createSlice } from "@reduxjs/toolkit"

const initialState = {
    recentItem: {},
    selectedData: {},
    itemList: [
        {
            noticeId: "",
            title: "",
            content: "",
            createdAt: "",
            updatedAt: "",
            focus: false,
            writer: "",
        }
    ]
}

export const noticeSlice = createSlice({
    name: "notice",
    initialState,
    reducers: {
        recentNotice: (state, action) => {
            return {
                recentItem: action.payload,
                itemList: state.itemList,
                selectedData: state.selectedData
            }
        },
        selectNotice: (state, action) => {
            state.selectedData = state.inputData.find(
                item => item.id === action.payload
            );
        },
    }
});

export const {recentNotice, selectNotice} = noticeSlice.actions;

export default noticeSlice.reducer;