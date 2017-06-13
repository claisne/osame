
import prefixer from '../utils/prefixer';

const prefix = prefixer('CHAT');

export const SET_GLOBAL_MESSAGES = prefix('SET_GLOBAL_MESSAGES');
export const SEND_GLOBAL_MESSAGE = prefix('SEND_GLOBAL_MESSAGE');

export const RECEIVE_GLOBAL_MESSAGE = prefix('RECEIVE_GLOBAL_MESSAGE');
export const RECEIVE_USERS_COUNT = prefix('RECEIVE_USERS_COUNT');

