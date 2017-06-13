
import prefixer from '../utils/prefixer';

const prefix = prefixer('ACCOUNT');

export const SET_USER = prefix('SET_USER');
export const UNAUTHORIZED = prefix('UNAUTHORIZED');

export const LOGIN_REQUEST = prefix('LOGIN_REQUEST');
export const LOGIN_SUCCESS = prefix('LOGIN_SUCCESS');
export const LOGIN_FAILURE = prefix('LOGIN_FAILURE');

export const SET_REGISTER_BASICS = prefix('SET_REGISTER_BASICS');
export const SET_REGISTER_COUNTRY = prefix('SET_REGISTER_COUNTRY');
export const SHOW_COUNTRIES = prefix('SHOW_COUNTRIES');

export const REGISTER_REQUEST = prefix('REGISTER_REQUEST');
export const REGISTER_SUCCESS = prefix('REGISTER_SUCCESS');
export const REGISTER_FAILURE = prefix('REGISTER_FAILURE');

export const LOGOUT = prefix('LOGOUT');

