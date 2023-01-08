import { createSlice } from "@reduxjs/toolkit"

const initialState = {
    metaData: {},
    itemList: [],
    selectedItem: {}
}

export const companySlice = createSlice({
    name: "company",
    initialState,
    reducers: {
        updateCompanyList: (state, action) => {
            if (action.payload.meta.page == 1) {
                return {
                    itemList: action.payload.companyList,
                    metaData: action.payload.meta,
                    selectedItem: state.selectedItem
                }
            } else {
                return {
                    itemList: state.itemList.concat(action.payload.companyList),
                    metaData: action.payload.meta,
                    selectedItem: state.selectedItem
                }
            }
        },

        clearCompanyList: (state) => {
            return {
                itemList: [],
                metaData: {},
                selectedItem: state.selectedItem
            }
        },
        selectedCompany: (state, action) => {
            return {
                itemList: state.itemList,
                metaData: state.metaData,
                selectedItem: action.payload
            }
        },
        clearSelectedCompany: (state, action) => {
            return {
                itemList: state.itemList,
                metaData: state.metaData,
                selectedItem: {}
            }
        },
        updateCompanyItem: (state, action) => {
            const newCompanyList = state.itemList.map((item, index) => {
                if(item.companyId == action.payload.companyId) {
                    return action.payload
                } else {
                    return item
                }
            });

            return {
                itemList: newCompanyList,
                metaData: state.metaData,
                selectedItem: state.selectedItem,
            }
        }
    }
});

export const { updateCompanyList,
     clearCompanyList,
      selectedCompany,
       clearSelectedCompany,
        updateCompanyItem} = companySlice.actions;
export default companySlice.reducer;