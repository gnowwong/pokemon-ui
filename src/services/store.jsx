
import { createStore, applyMiddleware } from 'redux';
import { persistStore, persistReducer } from 'redux-persist';
import rootReducer from './reducers/root-reducer';
import storage from 'redux-persist/lib/storage';
import rootSaga from './sagas';
import createSagaMiddleware from "@redux-saga/core";

const persistConfig = {
    key: 'root',
    storage: storage,
    // whitelist: ['favourite'] // only favourite will be persisted
}

const persistedReducer = persistReducer(persistConfig, rootReducer);
const sagaMiddleware = createSagaMiddleware();

export const store = createStore(persistedReducer, applyMiddleware(sagaMiddleware));
export const persistor = persistStore(store);
sagaMiddleware.run(rootSaga);