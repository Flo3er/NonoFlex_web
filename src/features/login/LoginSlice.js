import { createSlice, current } from '@reduxjs/toolkit';
import AuthenticationAPI from '../../apis/login/Authentication';

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
            console.log(action.payload);
            return action.payload;
        }
    }
})

export const { login } = loginSlice.actions;

export default loginSlice.reducer;