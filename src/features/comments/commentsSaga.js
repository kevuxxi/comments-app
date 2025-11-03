import { all, call, fork, put, takeLatest } from "redux-saga/effects";
import { createCommentFailure, createCommentSuccess, createCommentRequest, likeCommentFailure, likeCommentSuccess, likeCommentRequest, fetchCommentsFailure, fetchCommentsSuccess, fetchCommentsRequest } from "./commentsSlice";
import { getComments, likeComment, createComment } from "../../services/commentService";
import { setGlobalLoading } from "../app/appSlice";

function* handleFetchComments(action) {
    try {
        const comments = yield call(getComments, action.payload);
        yield put(fetchCommentsSuccess(comments));
    } catch (error) {
        yield put(fetchCommentsFailure(error.message || 'No se pudieron obtener los comentarios'))
    } finally {
        yield put(setGlobalLoading(false)); // 🧹 desactivar spinner
    }

}

function* handleCreateComment(action) {
    try {
        const response = yield call(createComment, action.payload);
        yield put(createCommentSuccess(response))
    } catch (error) {
        yield put(createCommentFailure(error.message || 'No se pudo crear el comentario'))
    } finally {
        yield put(setGlobalLoading(false)); // 🧹 desactivar spinner
    }
}

function* handleLikeComment(action) {
    try {
        const updatedComment = yield call(likeComment, action.payload);
        yield put(likeCommentSuccess(updatedComment))
    } catch (error) {
        yield put(likeCommentFailure(error.message || 'No se pudo procesar la solicitud'))
    } finally {
        yield put(setGlobalLoading(false)); // 🧹 desactivar spinner
    }
}

export function* watchComments() {
    yield takeLatest(fetchCommentsRequest.type, handleFetchComments)
}
export function* watchCreateComments() {
    yield takeLatest(createCommentRequest.type, handleCreateComment)
}
export function* watchLikeComments() {
    yield takeLatest(likeCommentRequest.type, handleLikeComment)
}

export default function* commentSaga() {
    yield all([fork(watchComments), fork(watchCreateComments), fork(watchLikeComments)]);
}