import { all, call, fork, put, takeLatest } from "redux-saga/effects";
import {
    loginFailure,
    loginRequest,
    loginSuccess,
    registerFailure,
    registerRequest,
    registerSuccess,
} from "./authSlice";
import { loginUser, registerUser } from "../../services/authService";
import { setGlobalLoading } from "../app/appSlice";

function* handleLogin(action) {
    try {
        const response = yield call(loginUser, action.payload);
        const { token, user } = response.data || {};

        yield put(loginSuccess({ token, user }));

        if (token) {
            localStorage.setItem("token", token);
        }
        if (user) {
            localStorage.setItem("user", JSON.stringify(user));
        }
    } catch (error) {
        yield put(loginFailure(error.message || "Error al intentar iniciar sesión"));
    } finally {
        yield put(setGlobalLoading(false)); // 🧹 desactivar spinner
    }
}

function* handleRegister(action) {
    try {
        const response = yield call(registerUser, action.payload);
        const { token, user } = response.data || {};

        yield put(registerSuccess({ token, user }));
    } catch (error) {
        yield put(registerFailure(error.message || "Respuesta inválida del servidor"));
    } finally {
        yield put(setGlobalLoading(false)); // 🧹 desactivar spinner
    }
}

export function* watchLogin() {
    yield takeLatest(loginRequest.type, handleLogin);
}

export function* watchRegister() {
    yield takeLatest(registerRequest.type, handleRegister);
}

export default function* authSaga() {
    yield all([fork(watchLogin), fork(watchRegister)]);
}
