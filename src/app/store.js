import { combineReducers, configureStore } from "@reduxjs/toolkit";
import createSagaMiddleware from 'redux-saga'
import authReducer from '../features/auth/authSlice'
/* import commentsReducer from '../features/comments/commentsSlice' */
import rootSaga from './rootSaga'

const sagaMiddleware = createSagaMiddleware();

const rootReducer = combineReducers({
    auth: authReducer,
    /*  comments: commentsReducer */
})

export const store = configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({ serializableCheck: false }).concat(sagaMiddleware),
})
sagaMiddleware.run(rootSaga)