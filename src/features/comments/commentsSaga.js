import { all, call, fork, put, takeLatest } from "redux-saga/effects";
import {
    createCommentFailure,
    createCommentRequest,
    createCommentSuccess,
    fetchCommentsFailure,
    fetchCommentsRequest,
    fetchCommentsSuccess,
    likeCommentFailure,
    likeCommentRequest,
    likeCommentSuccess,
} from "./commentsSlice";
import { createComment, getComments, likeComment } from "../../services/commentService";
import { setGlobalLoading } from "../app/appSlice";

function* handleFetchComments() {
    try {
        yield put(setGlobalLoading(true));
        const comments = yield call(getComments);
        yield put(fetchCommentsSuccess(comments));
    } catch (error) {
        yield put(fetchCommentsFailure(error.message || "No se pudieron obtener los comentarios"));
    } finally {
        yield put(setGlobalLoading(false));
    }
}

function* handleCreateComment(action) {
    try {
        yield put(setGlobalLoading(true));
        const newComment = yield call(createComment, action.payload);
        yield put(createCommentSuccess(newComment));
    } catch (error) {
        yield put(createCommentFailure(error.message || "No se pudo crear el comentario"));
    } finally {
        yield put(setGlobalLoading(false));
    }
}

function* handleLikeComment(action) {
    try {
        yield put(setGlobalLoading(true));
        const updatedComment = yield call(likeComment, action.payload);
        yield put(likeCommentSuccess(updatedComment));
    } catch (error) {
        yield put(likeCommentFailure(error.message || "No se pudo procesar la solicitud"));
    } finally {
        yield put(setGlobalLoading(false));
    }
}

export function* watchComments() {
    yield takeLatest(fetchCommentsRequest.type, handleFetchComments);
}

export function* watchCreateComments() {
    yield takeLatest(createCommentRequest.type, handleCreateComment);
}

export function* watchLikeComments() {
    yield takeLatest(likeCommentRequest.type, handleLikeComment);
}

export default function* commentSaga() {
    yield all([fork(watchComments), fork(watchCreateComments), fork(watchLikeComments)]);
}
