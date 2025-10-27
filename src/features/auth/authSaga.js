import { put, call, takeLatest, retry, delay } from "redux-saga/effects";
import { registerFailure, registerRequest, registerSuccess, logout, loginFailure, loginRequest, loginSuccess } from './authSlice'
import { registerUser, loginUser } from "../../services/authService";

function* handleLoginRequest(action) {
    try {
        yield delay(500)
        const maxRetries = 3
        const retryDelay = 1000

        const response = yield retry(maxRetries, retryDelay, authApi.loginUser, action.payload)
        if (response?.data?.success) {
            yield put(loginSuccess(response.data))
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

        const response = yield call(authApi.registerUser, action.payload);
        if (response?.data?.success) {
            yield put(registerSuccess(response.data))
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