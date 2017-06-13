
import _ from 'lodash';
import createReducer from '../utils/createReducer';

import * as ChatConstants from '../constants/chat';

const initialState = {
  global: {
    messages: [],
  },
  country: {
    messages: [],
  },
  usersCount: 0,
};

const sortMessages = (messages) => _.orderBy(messages, ['timestamp'], ['asc']);

export default createReducer(initialState, {
  [ChatConstants.SET_GLOBAL_MESSAGES](state, action) {
    const messages = sortMessages([...state.global.messages, ...action.messages]);

    return _.merge({}, state, {
      global: { messages },
    });
  },

  [ChatConstants.RECEIVE_GLOBAL_MESSAGE](state, action) {
    const messages = sortMessages([...state.global.messages, action.message]);

    return _.merge({}, state, {
      global: { messages },
    });
  },

  [ChatConstants.RECEIVE_USERS_COUNT](state, action) {
    return _.merge({}, state, {
      usersCount: action.usersCount,
    });
  },
});

