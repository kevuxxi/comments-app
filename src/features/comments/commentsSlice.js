import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    comments: [],
    loading: false,
    creating: false,
    liking: false,
    error: null,
};

const commentsSlice = createSlice({
    name: "comments",
    initialState,
    reducers: {
        fetchCommentsRequest: (state) => {
            state.loading = true;
            state.error = null;
        },
        fetchCommentsSuccess: (state, action) => {
            state.comments = action.payload;
            state.loading = false;
            state.error = null;
        },
        fetchCommentsFailure: (state, action) => {
            state.loading = false;
            state.error = action.payload;
        },
        createCommentRequest: (state) => {
            state.creating = true;
            state.error = null;
        },
        createCommentSuccess: (state, action) => {
            const comment = action.payload || {};
            state.creating = false;
            state.error = null;
            if (comment) {
                state.comments = [...state.comments, comment];
            }
        },
        createCommentFailure: (state, action) => {
            state.creating = false;
            state.error = action.payload;
        },
        likeCommentRequest: (state) => {
            state.liking = true;
            state.error = null;
        },
        likeCommentSuccess: (state, action) => {
            const updated = action.payload;
            const updatedId = updated?._id ?? updated?.id;
            state.liking = false;
            state.error = null;
            if (!updatedId) {
                return;
            }
            state.comments = state.comments.map((comment) => {
                const currentId = comment?._id ?? comment?.id;
                return currentId === updatedId ? updated : comment;
            });
        },
        likeCommentFailure: (state, action) => {
            state.liking = false;
            state.error = action.payload;
        },
    },
});

export const {
    likeCommentFailure,
    likeCommentRequest,
    likeCommentSuccess,
    createCommentFailure,
    createCommentRequest,
    createCommentSuccess,
    fetchCommentsFailure,
    fetchCommentsRequest,
    fetchCommentsSuccess,
} = commentsSlice.actions;

export default commentsSlice.reducer;
