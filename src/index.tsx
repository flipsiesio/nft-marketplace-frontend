/* eslint-disable no-console */
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { ConnectedRouter } from 'connected-react-router';
import configureStore from 'store/configureStore';
import history from 'utils/history';
import App from 'containers/App';
import 'i18n';
import * as serviceWorker from './serviceWorker';
import './index.scss';

const config = configureStore();
const { store, persistor } = config;
const root = document.getElementById('root');

console.log('POKER', process.env.REACT_APP_CONTRACT_POKER_ADDRESS);
console.log('POOL_CONTROLLER', process.env.REACT_APP_CONTRACT_CONTROLLER_ADDRESS);

ReactDOM.render(
  <Provider store={store}>
    <ConnectedRouter history={history}>
      <PersistGate loading={null} persistor={persistor}>
        <App />
      </PersistGate>
    </ConnectedRouter>
  </Provider>,
  root,
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
