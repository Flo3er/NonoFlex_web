import { createSlice } from "@reduxjs/toolkit"

const initialState = {
    itemList: [],
    selectedItem: {},
    selectedItemRecordList: [],
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
                    selectedItem: state.selectedItem,
                    selectedItemRecordList: state.selectedItemRecordList
                };
            } else {
                return {
                    itemList: state.itemList.concat(action.payload.productList),
                    metaData: action.payload.meta,
                    selectedItem: state.selectedItem,
                    selectedItemRecordList: state.selectedItemRecordList
                }
            }
        },
        selectedProduct: (state, action) => {
            state.selectedItem = action.payload
        },
        updateProductItem: (state, action) => {
            const newProductList = state.itemList.map((item, index) => {
                if (item.productId == action.payload.productId) {
                    return action.payload
                } else {
                    return item;
                }
            });

            return {
                itemList: newProductList,
                metaData: state.metaData,
                selectedItem: state.selectedItem,
                selectedItemRecordList: state.selectedItemRecordList
            };

        },
        clearSelectedProduct: (state, action) => {
            return {
                metaData: state.metaData,
                itemList: state.itemList,
                selectedItem: {},
                selectedItemRecordList: []
            }
        },
        updateProductRecordList: (state, action) => {
            return {
                metaData: state.metaData,
                itemList: state.itemList,
                selectedItem: state.selectedItem,
                selectedItemRecordList: action.payload
            }
        }
    }
});

export const { updateProductList, selectedProduct, clearSelectedProduct, updateProductRecordList, updateProductItem } = productSlice.actions;

export default productSlice.reducer;