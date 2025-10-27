import { put, call, takeLatest, retry, delay } from "redux-saga/effects";
import { registerFailure, registerRequest, registerSuccess, logout, loginFailure, loginRequest, loginSuccess } from './authSlice'


function* handleLoginRequest(action) {
    try {
        yield delay(500)
        const maxRetries = 3
        const retryDelay = 1000

        const response = yield retry(maxRetries, retryDelay, authApi.loginRequest, action.payload)
        if (response?.data?.success) {
            yield put(loginSuccess())
        } else {
            yield put(loginFailure('Respuesta inválida del servidor'))
        }
    } catch (error) {
        yield put(loginFailure(error.message || 'Error al intentar inicir sesion'))
    }
}


function* handleRegisterRequest(action) {
    try {
        yield delay(500)

        const response = yield call(authApi.registerRequest, action.payload);
        if (response?.data?.success) {
            yield put(registerSuccess())
        } else {
            yield put(registerFailure('Respuesta invalida del servidor'))
        }
    } catch (error) {
        yield put(registerFailure(error.message || 'Respuesta invalida del servidor'))
    }
}





export function* watchLogin() {
    yield takeLatest(loginRequest.type, handleLoginRequest)
}

export function* watchRegister() {
    yield takeLatest(registerRequest.type, handleRegisterRequest)
}