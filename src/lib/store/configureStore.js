import { applyMiddleware, combineReducers, createStore } from 'redux';

import thunk from 'redux-thunk';
import { persistReducer, persistStore } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import { composeWithDevTools } from 'redux-devtools-extension';
import { createLogger } from 'redux-logger';
import cities from "./reducers/cities";



var middleware = [thunk];

if (__DEV__) {
    const logger = createLogger();
    const devMiddleware = [logger];

    middleware.push(...devMiddleware);
}

const rootReducer = combineReducers({
    cities,
});

const rootPersistConfig = {
    key: 'root',
    storage,
};

const store = createStore(
    persistReducer(rootPersistConfig, rootReducer),
    composeWithDevTools(applyMiddleware(...middleware)),
);

const persistor = persistStore(store);

export { store, persistor };
