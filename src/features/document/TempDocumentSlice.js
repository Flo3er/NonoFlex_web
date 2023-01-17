import { createSlice } from "@reduxjs/toolkit"

const initialState = {
    itemList: [],
    selectedItem: {},
    // selectedItemRecordList: [],
    metaData: {
        count: 0,
        lastpage: false,
        page: 0,
        totalCount: 0,
        totalPages: 0, 
    },
}

export const tempDocumentSlice = createSlice({
    name: "tempDocument",
    initialState,
    reducers: {
        updateTempDocumentList: (state, action) => {
            console.log(action.payload)
            if (action.payload.meta.page === 1) {
                return {
                    itemList: action.payload.documentList,
                    metaData: action.payload.meta,
                    selectedItem: state.selectedItem,
                    // selectedItemRecordList: state.selectedItemRecordList
                };
            } else {
                return {
                    itemList: state.itemList.concat(action.payload.documentList),
                    metaData: action.payload.meta,
                    selectedItem: state.selectedItem,
                    // selectedItemRecordList: state.selectedItemRecordList
                }
            }
        },
        selectedTempDocument: (state, action) => {
            state.selectedItem = action.payload
        },
        clearSelectedTempDocument: (state, action) => {
            return {
                metaData: state.metaData,
                itemList: state.itemList,
                selectedItem: {},
                selectedItemRecordList: []
            }
        },
        // updateProductRecordList: (state, action) => {
        //     return {
        //         metaData: state.metaData,
        //         itemList: state.itemList,
        //         selectedItem: state.selectedItem,
        //         selectedItemRecordList: action.payload
        //     }
        // }
    }
});

export const {updateTempDocumentList, selectedTempDocument, clearSelectedTempDocument} = tempDocumentSlice.actions;

export default tempDocumentSlice.reducer;