import { all, fork } from "redux-saga/effects";
import { watchAuth } from '../features/auth/authSaga'
import { watchComments } from '../features/comments/commentsSaga'


export default function* () {
    yield all([fork(watchAuth), fork(watchComments)])
    console.log("Root saga running")
}

