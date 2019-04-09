import { applyMiddleware, combineReducers, createStore } from 'redux';

import thunk from 'redux-thunk';
import { persistReducer, persistStore } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import { composeWithDevTools } from 'redux-devtools-extension';
import { createLogger } from 'redux-logger';

import { city, cities } from "./reducers";

var middleware = [thunk];

if (__DEV__) {
    const logger = createLogger();
    const devMiddleware = [logger];

    middleware.push(...devMiddleware);
}

const rootReducer = combineReducers({
    cities,
    city,
});

const rootPersistConfig = {
    key: 'root',
    storage,
    blacklist: 'city'
};

const store = createStore(
    persistReducer(rootPersistConfig, rootReducer),
    composeWithDevTools(applyMiddleware(...middleware)),
);

const persistor = persistStore(store);

export { store, persistor };
