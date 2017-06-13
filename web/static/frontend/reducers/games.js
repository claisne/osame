
import _ from 'lodash';
import createReducer from '../utils/createReducer';

import * as GamesConstants from '../constants/games';

const initialState = {};

export default createReducer(initialState, {
  [GamesConstants.SET](state, action) {
    return _.keyBy(action.games, 'id');
  },

  [GamesConstants.NEW](state, action) {
    return _.assign({}, state, {
      [action.game.id]: action.game,
    });
  },

  [GamesConstants.UPDATE](state, action) {
    return _.assign({}, state, {
      [action.game.id]: action.game,
    });
  },
});
