
import { Socket } from 'phoenix';

import * as ChatConstants from '../constants/chat';
import * as AccountConstants from '../constants/account';

const socketUrl = '/user_socket';

class UserSocket {
  constructor(store) {
    this.store = store;

    this.connect = this.connect.bind(this);
    this.listener = this.listener.bind(this);
  }

  connect() {
    const { auth } = this.store.getState();

    this.socket = new Socket(socketUrl, { params: { token: auth.jwt } });
    this.socket.connect();

    this.userGlobalChat = this.socket.channel('user_chat:global');
    this.userGlobalChat.join();

    window.socket = this.socket;
    window.userGlobalChat = this.userGlobalChat;
  }

  disconnect() {
    this.userGlobalChat.leave();
    this.socket.disconnect();
  }

  listener() {
    const { _action } = this.store.getState();

    if (_action.type === AccountConstants.LOGIN_SUCCESS) {
      this.connect();
    }

    if (_action.type === AccountConstants.LOGOUT) {
      this.disconnect();
    }

    if (_action.type === AccountConstants.SET_USER) {
      const { auth } = this.store.getState();
      this.userCountryChat = this.socket.channel(`user_chat:country:${auth.user.countryId}`);
      this.userCountryChat.join();
    }

    if (_action.type === ChatConstants.SEND_GLOBAL_MESSAGE) {
      this.userGlobalChat.push('message:new', {
        message: _action.message,
      });
    }
  }
}

export default UserSocket;

