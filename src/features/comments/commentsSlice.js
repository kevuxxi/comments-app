import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    comments: [],
    loading: false,
    error: null
}

const commentsSlice = createSlice({
    name: 'comments',
    initialState,
    reducers: {

        fetchCommentsRequest: (state) => {
            state.loading = true
            state.error = null
        },
        fetchCommentsSuccess: (state, action) => {
            state.comments = action.payload
            state.loading = false
            state.error = null
        },
        fetchCommentsFailure: (state, action) => {
            state.loading = false
            state.error = action.payload
        },
        createCommentRequest: (state, action) => {
            state.loading = true
            state.error = null
        },
        createCommentSuccess: (state, action) => {
            const comment = action.payload || {}
            state.loading = false
            state.error = null
            state.comments = [...state.comments, comment ?? null]
        },
        createCommentFailure: (state, action) => {
            state.loading = false
            state.error = action.payload
        },
        likeCommentRequest: (state) => {
            state.loading = true
            state.error = null
        },
        likeCommentSuccess: (state, action) => {
            const updated = action.payload;
            state.loading = false;
            state.error = null;
            state.comments = state.comments.map((c) =>
                c._id === updated._id ? updated : c
            );
        },
        likeCommentFailure: (state, action) => {
            state.loading = false
            state.error = action.payload
        },
    }
})

export const { likeCommentFailure, likeCommentSuccess, likeCommentRequest, createCommentFailure, createCommentRequest, createCommentSuccess, fetchCommentsFailure, fetchCommentsSuccess, fetchCommentsRequest } = commentsSlice.actions

export default commentsSlice.reducer