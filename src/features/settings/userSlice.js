import { createSlice } from "@reduxjs/toolkit"

const initialState = {
    metaData: {},
    itemList: [],
    selectedItem: {}
}

export const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        updateUserList: (state, action) => {
            if(action.payload.meta.page == 1) {
                return {
                    metaData: action.payload.meta,
                    itemList: action.payload.userList,
                    selectedItem: state.selectedItem
                }
            } else {
                return {
                    metaData: action.payload.meta,
                    itemList: state.itemList.concat(action.payload.userList),
                    selectedItem: state.selectedItem
                }
            }
        },

        clearUserList: (state) => {
            return {
                metaData: {},
                itemList: [],
                selectedItem: state.selectedItem
            }
        },
        selectedUser: (state, action) => {
            return {
                metaData: state.metaData,
                itemList: state.itemList,
                selectedItem: action.payload
            }
        },
        clearSelectedUser: (state) => {
            return {
                metaData: state.metaData,
                itemList: state.itemList,
                selectedItem: {}
            }
        }
    }
});

export const { updateUserList, clearUserList, selectedUser, clearSelectedUser} = userSlice.actions;
export default userSlice.reducer;