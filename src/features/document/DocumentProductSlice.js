import { createSlice } from "@reduxjs/toolkit"

const initialState = {
    selectedItem: {},
    documentProductItem: {},
    selectedTempItem: {},
    documentProductTempItem: {}
}

export const documentProductSlice = createSlice({
    name: "documentProduct",
    initialState,
    reducers: {
        selectDocumentProduct: (state, action) => {
            console.log(action.payload);
            state.selectedItem = action.payload
        },
        updateDocumentProduct: (state, action) => {
            console.log(action.payload);
            state.documentProductItem = action.payload;
        },
        selectTempDocumentProduct: (state, action) => {
            console.log(action.payload);
            state.selectedTempItem = action.payload;
        },
        updateTempDocumentProduct: (state, action) => {
            console.log(action.payload);
            state.documentProductTempItem = action.payload;
        },
        clearDocumentProduct: (state, action) => {
            return {
                selectedItem: {},
                documentProductItem: {},
                selectedTempItem: {},
                documentProductTempItem: {},
            }
        }
    }
});

export const { selectDocumentProduct, updateDocumentProduct, selectTempDocumentProduct, updateTempDocumentProduct, clearDocumentProduct } = documentProductSlice.actions;

export default documentProductSlice.reducer;