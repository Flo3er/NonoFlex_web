import { createSlice } from "@reduxjs/toolkit"

const initialState = {
    recentItem: {},
    selectedItem: {},
    metaData: {
        count: 0,
        lastpage: false,
        page: 0,
        totalCount: 0,
        totalPages: 0,
    },
    itemList: []
}

export const noticeSlice = createSlice({
    name: "notice",
    initialState,
    reducers: {
        recentNotice: (state, action) => {
            return {
                metaData: state.metaData,
                recentItem: action.payload,
                itemList: state.itemList,
                selectedItem: state.selectedItem
            }
        },
        selectNotice: (state, action) => {
            state.selectedItem = state.itemList.find(
                item => item.noticeId === action.payload
            );
            if(state.selectedItem === undefined) {
                state.selectedItem = action.payload
            }
        },
        updateNotice: (state, action) => {
            if (action.payload.meta.page === 1) {
                return {
                    metaData: action.payload.meta,
                    recentItem: state.recentItem,
                    itemList: action.payload.noticeList,
                    selectedItem: state.selectedItem,
                }
            } else {
                return {
                    metaData: action.payload.meta,
                    recentItem: state.recentItem,
                    itemList: state.itemList.concat(action.payload.noticeList),
                    selectedItem: state.selectedItem,
                }
            }
        },
        updateNoticeItem: (state, action) => {
            return {
                metaData: state.metaData,
                recentItem: state.recentItem,
                itemList: state.itemList.map(row =>
                    row.id === action.payload.id ? { ...action.payload } : row
                ),
                selectedItem: action.payload,
            }
        },
        clearNoticeItem: (state, action) => {
            return {
                metaData: state.metaData,
                recentItem: state.recentItem,
                itemList: state.itemList,
                selectedItem: {},
            }
        }
    }
});

export const { recentNotice, selectNotice, updateNotice, updateNoticeItem, clearNoticeItem } = noticeSlice.actions;

export default noticeSlice.reducer;