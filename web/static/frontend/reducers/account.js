
import _ from 'lodash';
import createReducer from '../utils/createReducer';

import * as RequestConstants from '../constants/request';
import * as AccountConstants from '../constants/account';

const initialState = {
  loginRequest: null,
  registerRequest: null,
};

export default createReducer(initialState, {
  [AccountConstants.SET_USER](state, action) {
    return _.merge({}, state, {
      user: action.user,
    });
  },

  [AccountConstants.LOGIN_REQUEST](state) {
    return _.merge({}, state, {
      loginRequest: RequestConstants.REQUESTING,
    });
  },

  [AccountConstants.LOGIN_SUCCESS](state) {
    return _.merge({}, state, {
      loginRequest: RequestConstants.SUCCESS,
    });
  },

  [AccountConstants.LOGIN_FAILURE](state) {
    return _.merge({}, state, {
      loginRequest: RequestConstants.FAILURE,
    });
  },

  [AccountConstants.SET_REGISTER_BASICS](state, action) {
    let showCountries = true;
    if (state.register != null && state.register.countryId != null) {
      showCountries = false;
    }

    return _.merge({}, state, {
      register: action.basics,
      showCountries,
    });
  },

  [AccountConstants.SET_REGISTER_COUNTRY](state, action) {
    return _.merge({}, state, {
      register: {
        countryId: action.countryId,
      },
      showCountries: false,
    });
  },

  [AccountConstants.REGISTER_REQUEST](state) {
    return _.merge({}, state, {
      registerRequest: RequestConstants.REQUESTING,
    });
  },

  [AccountConstants.REGISTER_SUCCESS](state) {
    return _.merge({}, state, {
      registerRequest: RequestConstants.SUCCESS,
    });
  },

  [AccountConstants.REGISTER_FAILURE](state) {
    return _.merge({}, state, {
      registerRequest: RequestConstants.FAILURE,
    });
  },

  [AccountConstants.SHOW_COUNTRIES](state) {
    return _.merge({}, state, {
      showCountries: true,
    });
  },
});

