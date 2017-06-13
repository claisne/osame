
import * as fetchUtils from '../utils/fetch';
import * as types from '../constants/account';

/*
 * USER
 */

export function setUser(user) {
  return { type: types.SET_USER, user };
}

export function unauthorized() {
  return { type: types.UNAUTHORIZED };
}

/*
 * LOGIN
 */

export function loginRequest() {
  return { type: types.LOGIN_REQUEST };
}

export function loginSuccess(data) {
  return { type: types.LOGIN_SUCCESS, data };
}

export function loginFailure() {
  return { type: types.LOGIN_FAILURE };
}

export function login(credentials) {
  return (dispatch) => {
    dispatch(loginRequest());

    fetchUtils
      .postJson('/api/auth/login', credentials)
      .then(data => dispatch(loginSuccess(data)))
      .catch(() => dispatch(loginFailure()));
  };
}

/*
 * LOGOUT
 */

export function logout() {
  return { type: types.LOGOUT };
}

/*
 * REGISTER
 */

export function registerRequest() {
  return { type: types.REGISTER_REQUEST };
}

export function registerSuccess(data) {
  return { type: types.REGISTER_SUCCESS, data };
}

export function registerFailure() {
  return { type: types.REGISTER_FAILURE };
}

export function register() {
  return (dispatch, getState) => {
    const { name, email, password, countryId } = getState().account.register;

    dispatch(registerRequest());

    fetchUtils
      .postJson('/api/auth/register', {
        name, email,
        password,
        country_id: countryId,
      })
      .then(data => dispatch(registerSuccess(data)))
      .catch(() => dispatch(registerFailure()));
  };
}

export function setRegisterBasics(basics) {
  return (dispatch, getState) => {
    const { account } = getState();

    dispatch({ type: types.SET_REGISTER_BASICS, basics });

    if (account.register != null && account.register.countryId != null) {
      dispatch(register());
    }
  };
}

export function setRegisterCountry(countryId) {
  return { type: types.SET_REGISTER_COUNTRY, countryId };
}

export function showCountries() {
  return { type: types.SHOW_COUNTRIES };
}

