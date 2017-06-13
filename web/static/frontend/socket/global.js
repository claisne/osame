
import { Socket } from 'phoenix';

import * as ChatActions from '../actions/chat';
import * as GamesActions from '../actions/games';

const socketUrl = '/global_socket';

class GlobalSocket {
  constructor(store) {
    this.store = store;

    this.socket = new Socket(socketUrl, { params: {} });
    this.socket.connect();

    this.initChatChannel(this.store.dispatch);
    this.initGamesChannel(this.store.dispatch);

    this.listener = this.listener.bind(this);
  }

  initChatChannel(dispatch) {
    this.chatChannel = this.socket.channel('global_chat', {});
    this.chatChannel.join();

    this.chatChannel.on('messages', (data) => {
      dispatch(ChatActions.setGlobalMessages(data.messages));
    });

    this.chatChannel.on('messages:new', (data) => {
      dispatch(ChatActions.receiveGlobalMessage(data.message));
    });

    this.chatChannel.on('users_count', (data) => {
      dispatch(ChatActions.receiveUsersCount(data.users_count));
    });
  }

  initGamesChannel(dispatch) {
    this.gamesLobbyChannel = this.socket.channel('global_games:lobby', {});
    this.gamesLobbyChannel.join();

    this.gamesLobbyChannel.on('games', (data) => {
      dispatch(GamesActions.setGames(data.games));
    });

    this.gamesLobbyChannel.on('games:new', (data) => {
      dispatch(GamesActions.newGame(data.game));
    });

    this.gamesLobbyChannel.on('games:update', (data) => {
      dispatch(GamesActions.updateGame(data.game));
    });
  }

  listener() {
    // const { _action } = this.store.getState();
  }
}

export default GlobalSocket;
