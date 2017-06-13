
import _ from 'lodash';
import createReducer from '../utils/createReducer';
import * as LocalStorageUtils from '../utils/localStorage';

import * as AccountConstants from '../constants/account';

const initialState = {
  authenticated: false,
};

export default createReducer(initialState, {
  [AccountConstants.SET_USER](state, action) {
    return _.merge({}, state, {
      user: action.user,
    });
  },

  [AccountConstants.UNAUTHORIZED](state) {
    return _.merge({}, state, {
      authenticated: false,
    });
  },

  [AccountConstants.LOGIN_SUCCESS](state, action) {
    const { user, jwt, claims } = action.data;

    LocalStorageUtils.save('AUTH_USER', { jwt, claims });

    return _.merge({}, state, {
      authenticated: true,
      user,
      jwt,
      claims,
    });
  },

  [AccountConstants.LOGOUT](state) {
    LocalStorageUtils.remove('AUTH_USER');

    return _.merge({}, state, {
      authenticated: false,
      user: null,
      jwt: null,
      claims: null,
    });
  },
});

