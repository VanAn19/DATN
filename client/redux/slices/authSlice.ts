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
        DELETE_VALUE_USER: (state) => {
            state.token = null;
            state.user = null;
            state.isAuthenticated = false;
        },
    },
});

export const { CHANGE_VALUE_USER, CHANGE_STATUS_AUTH, DELETE_VALUE_USER } = authSlice.actions;
export default authSlice.reducer;