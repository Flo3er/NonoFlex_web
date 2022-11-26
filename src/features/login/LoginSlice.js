import { createSlice, current } from '@reduxjs/toolkit';

const initialState = {
    loginUser: {
        userId: '',
        password: '',
        accessToken: '',
        refreshToken: '',
    }
}

export const loginSlice = createSlice({
    name: 'login',
    initialState,
    reducers: {
        login: (state, action) => {
            state.loginUser = action.payload;
            console.log(state.loginUser);
        }
    }
})

export const { login } = loginSlice.actions;

export default loginSlice.reducer;