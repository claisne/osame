
import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';

import auth from './auth';
import account from './account';
import countries from './countries';
import games from './games';
import chat from './chat';

function _action(state = null, action) {
  return action;
}

export default combineReducers({
  auth,
  account,
  countries,
  games,
  chat,

  _action,
  routing: routerReducer,
});
