import { createStore, applyMiddleware } from 'redux';
import { persistReducer, persistStore } from 'redux-persist';
import logger from 'redux-logger';
import AsyncStorage from '@react-native-community/async-storage';
import thunk from 'redux-thunk';

import Reducer from './reducer';

const config = {
  key: 'Teravin Movie',
  storage: AsyncStorage,
}

const persistedReducer = persistReducer(config, Reducer);

export const store = createStore(
  persistedReducer,
  applyMiddleware(logger, thunk),
);

export const persistor = persistStore(store);
