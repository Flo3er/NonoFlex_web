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

export const documentSlice = createSlice({
    name: "document",
    initialState,
    reducers: {
        updateDocumentList: (state, action) => {
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
        selectedDocument: (state, action) => {
            state.selectedItem = action.payload
        },
        clearSelectedDocument: (state, action) => {
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

export const {updateDocumentList, selectedDocument, clearSelectedDocument} = documentSlice.actions;

export default documentSlice.reducer;