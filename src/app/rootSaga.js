import { all, fork } from "redux-saga/effects";
import authSaga from "../features/auth/authSaga";
import commentSaga from "../features/comments/commentsSaga";

export default function* rootSaga() {
    yield all([fork(authSaga), fork(commentSaga)]);
    console.log("Root saga running");
}

