import { createSlice } from "@reduxjs/toolkit"

const initialState = {
    itemList: [],
    selectedItem: {},
    metaData: {
        count: 0,
        lastpage: false,
        page: 0,
        totalCount: 0,
        totalPages: 0, 
    },
}

export const productSlice = createSlice({
    name: "product",
    initialState,
    reducers: {
        updateProductList: (state, action) => {
            if (action.payload.meta.page === 1) {
                return {
                    itemList: action.payload.productList,
                    metaData: action.payload.meta,
                    selectedItem: state.selectedItem
                };
            } else {
                return {
                    itemList: state.itemList.concat(action.payload.productList),
                    metaData: action.payload.meta,
                    selectedItem: state.selectedItem
                }
            }
        },
        selectedProduct: (state, action) => {
            state.selectedItem = action.payload
        },
        clearSelectedProduct: (state, action) => {
            return {
                metaData: state.metaData,
                itemList: state.itemList,
                selectedItem: {}
            }
        }
    }
});

export const {updateProductList, selectedProduct, clearSelectedProduct} = productSlice.actions;

export default productSlice.reducer;