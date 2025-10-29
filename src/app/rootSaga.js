import { all, fork } from "redux-saga/effects";
import authSaga from "../features/auth/authSaga";
/* import { watchComments } from '../features/comments/commentsSaga' */

export default function* rootSaga() {
    yield all([fork(authSaga) /* , fork(watchComments) */]);
    console.log("Root saga running");
}

