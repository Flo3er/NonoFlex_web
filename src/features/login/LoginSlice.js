import { createSlice, current } from '@reduxjs/toolkit';

const initialState = {
    loginUser: {
        userId: '',
        password: '',
        accessToken: '',
        refreshToken: '',
    },
    changePasswordModalFlag: false
}

export const loginSlice = createSlice({
    name: 'login',
    initialState,
    reducers: {
        login: (state, action) => {
            state.loginUser = action.payload;
            console.log(state.loginUser);
        },
        changePassword: (state, action) => {
            return {
                loginUser: state.loginUser,
                changePasswordModalFlag: action.payload
            }
        }
    }
})

export const { login, changePassword } = loginSlice.actions;

export default loginSlice.reducer;