import {
  createStore,
  applyMiddleware,
  compose,
  combineReducers,
} from 'redux';
import createSagaMiddleware from 'redux-saga';
import { persistStore, persistReducer } from 'redux-persist';
import createExpirationTransform from 'redux-persist-transform-expire';
import storage from 'redux-persist/lib/storage';

import reducer from './rootReducer';
import rootSaga from './rootSaga';
import { NftMarketState } from '../types';

export const expireTransform = createExpirationTransform({
  expireKey: 'persistExpiresAt', // default
  defaultState: {}, // default
});

const mePersistConfig = {
  key: 'me',
  storage,
};

const nftMarketConfig = {
  key: 'nftMarket',
  storage,
  whitelist: ['refreshToken', 'accessToken', 'isAuth', 'signedMsg'] as Array<keyof NftMarketState>,
};

const reducers = {
  ...reducer,
  me: persistReducer(mePersistConfig, reducer.me),
  nftMarket: persistReducer(nftMarketConfig, reducer.nftMarket),
};

const sagaMiddleware = createSagaMiddleware();

export default (initialState: { [key: string]: never } = {}) => {
  const composeEnhancers =
    // any for window devtools extensions
    /* eslint-disable  @typescript-eslint/no-explicit-any */
    (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ ||
    // eslint-disable-next-line no-underscore-dangle
    (window as any).__REDUX_DEVTOOLS_EXTENSION__ ||
    compose;

  const store = createStore(
    combineReducers(reducers),
    initialState,
    composeEnhancers(
      applyMiddleware(
        sagaMiddleware,
      ),
    ),
  );

  sagaMiddleware.run(rootSaga);
  const persistor = persistStore(store);

  return { store, persistor };
};
