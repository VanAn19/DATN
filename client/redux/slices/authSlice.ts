import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    token: null,
    user: null,
    isAuthenticated: false
};

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        CHANGE_VALUE_USER: (state, action) => {
            const { user, tokens } = action.payload.metadata;
            state.token = tokens.accessToken;
            state.user = user;
        },
        CHANGE_STATUS_AUTH: (state, action) => {
            state.isAuthenticated = action.payload;
        },
        LOGOUT: (state) => {
            state.token = null;
            state.user = null;
        },
    },
});

export const { CHANGE_VALUE_USER, CHANGE_STATUS_AUTH, LOGOUT } = authSlice.actions;
export default authSlice.reducer;