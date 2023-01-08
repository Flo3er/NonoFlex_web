import { createSlice } from "@reduxjs/toolkit"

const initialState= {
    selectedItem: {},
    partnerList: []
}

export const documentPartnerSlice = createSlice({
    name: "documentPartner",
    initialState,
    reducers: {
        selectedPartner: (state, action) => {
            console.log(action.payload);
            return {
                selectedItem: action.payload,
                partnerList: state.partnerList,
            }
        },
        updatePartnerList: (state, action) => {
            console.log(action.payload);
            return {
                selectedItem: state.selectedItem,
                partnerList:  state.partnerList.concat(action.payload),
            }
           
        },
        clearPartnerList: (state) => {
            return {
                selectedItem: state.selectedItem,
                partnerList: []
            };
        }, 
        clearSelectedPartner: (state) => {
            return {
                selectedItem: {},
                partnerList: state.partnerList,
            }
        }
    }
})

export const { selectedPartner, updatePartnerList, clearPartnerList, clearSelectedPartner } = documentPartnerSlice.actions;
export default documentPartnerSlice.reducer;