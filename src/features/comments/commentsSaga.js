import { all, call, fork, put, takeLatest } from "redux-saga/effects";
import { createCommentFailure, createCommentSuccess, createCommentRequest, likeCommentFailure, likeCommentSuccess, likeCommentRequest, fetchCommentsFailure, fetchCommentsSuccess, fetchCommentsRequest } from "./commentsSlice";
import { getComments, createComment, likeComment } from '../../services/commentService'


function* handleFetchComments(action) {
    try {
        const response = yield call(getComments, action.payload);
        yield put(fetchCommentsSuccess(response.data));
    } catch (error) {
        yield put(fetchCommentsFailure(error.message || 'No se pudieron obtener los comentarios'))
    }
}

function* handleCreateComment(action) {
    try {
        const response = yield call(createComment, action.payload);
        yield put(createCommentSuccess(response.data))
    } catch (error) {
        yield put(createCommentFailure(error.message || 'No se pudo crear el comentario'))
    }
}

function* handleLikeComment(action) {
    try {
        const response = yield call(likeComment, action.payload);
        yield put(likeCommentSuccess(response.data))
    } catch (error) {
        yield put(likeCommentFailure(error.message || 'No se pudo procesar la solicitud'))
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
    yield all([fork(watchComments), fork(watchCreateComments), fork(wactchLikeComments)]);
}