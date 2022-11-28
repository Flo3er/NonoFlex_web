import { createSlice } from "@reduxjs/toolkit"

const initialState = {
    value: ""
}

export const searchSlice = createSlice({
    name: "search",
    initialState,
    reducers: {
        remove: (state, action) => {
            return {
                value: ""
            };
        },
        search: (state, action) => {
            return {
                value: action.payload
            };
        }
    }
});

export const {remove, search} = searchSlice.actions;

export default searchSlice.reducer;