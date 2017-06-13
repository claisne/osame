
import * as types from '../constants/chat';

export function sendGlobalMessage(message) {
  return (dispatch, getState) => {
    const { auth } = getState();

    if (auth.authenticated === true) {
      dispatch({ type: types.SEND_GLOBAL_MESSAGE, message });
    }

    // TODO handle not auth
  };
}

export function setGlobalMessages(messages) {
  return { type: types.SET_GLOBAL_MESSAGES, messages };
}

export function receiveGlobalMessage(message) {
  return { type: types.RECEIVE_GLOBAL_MESSAGE, message };
}

export function receiveUsersCount(usersCount) {
  return { type: types.RECEIVE_USERS_COUNT, usersCount };
}

