
import 'babel-polyfill';
import 'whatwg-fetch';

import './styles/global.css';

import React from 'react';
import ReactDOM from 'react-dom';
import { applyMiddleware, createStore } from 'redux';
import thunk from 'redux-thunk';
import createLogger from 'redux-logger';
import { Provider } from 'react-redux';
import { Router, IndexRoute, Route, browserHistory } from 'react-router';
import { routerMiddleware, syncHistoryWithStore } from 'react-router-redux';

import App from './containers/App';
import Home from './containers/Home';
import Games from './containers/Games';
import Game from './containers/Game';
import Rankings from './containers/Rankings';
import Account from './containers/Account';

import * as AccountActions from './actions/account';
import * as DataLoaderActions from './actions/dataLoader';

import GlobalSocket from './socket/global';
import UserSocket from './socket/user';

import * as LocalStorageUtils from './utils/localStorage';

import reducers from './reducers';

import Perf from 'react-addons-perf';
window.Perf = Perf;

const logger = createLogger();

const store = createStore(
  reducers,
  applyMiddleware(thunk, logger, routerMiddleware(browserHistory))
);

const history = syncHistoryWithStore(browserHistory, store);

function renderApp() {
  ReactDOM.render(
    <Provider store={store}>
      <Router history={history}>
        <Route path="/" component={App}>
          <IndexRoute component={Home} />
          <Route path="games" component={Games} />
          <Route path="game/:gameId" component={Game} />
          <Route path="rankings" component={Rankings} />
          <Route path="account" component={Account} />
        </Route>
      </Router>
    </Provider>,
    document.getElementById('app')
  );
}

// Add sockets subscribers
const globalSocket = new GlobalSocket(store);
store.subscribe(globalSocket.listener);

const userSocket = new UserSocket(store);
store.subscribe(userSocket.listener);

const userSavedCredentials = LocalStorageUtils.retrieve('AUTH_USER');
if (userSavedCredentials != null) {
  store.dispatch(AccountActions.loginSuccess(userSavedCredentials));
}

// Launch data loading then render
store.dispatch(DataLoaderActions.load(renderApp));

