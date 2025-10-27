import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    user: null,
    token: null,
    loading: false,
    error: null
}

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {

        loginRequest: (state, action) => {
            state.loading = true
            state.error = null
            state.token = action.payload
        },
        loginSuccess: (state, action) => {
            state.loading = false
            state.error = null
            state.token = action.payload
            state.user = action.payload
        },

        loginFailure: (state, action) => {
            state.loading = false
            state.error = action.payload
            state.token = null
            state.user = null
        },
        registerRequest: (state, action) => {
            state.loading = true
            state.error = null
            state.token = action.payload
        },
        registerSuccess: (state, action) => {
            state.loading = false
            state.error = null
            state.token = action.payload
            state.user = action.payload
        },

        registerFailure: (state, action) => {
            state.loading = false
            state.error = action.payload
            state.token = null
            state.user = null
        },
        logout: (state) => {
            state.loading = false
            state.error = null
            state.token = null
            state.user = null
        },
    }
})


export const { registerFailure, registerRequest, registerSuccess, logout, loginFailure, loginRequest, loginSuccess } = authSlice.actions

export default authSlice.reducer