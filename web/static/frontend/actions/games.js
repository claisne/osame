
import * as types from '../constants/games';

export function setGames(games) {
  return { type: types.SET, games };
}

export function newGame(game) {
  return { type: types.NEW, game };
}

export function updateGame(game) {
  return { type: types.UPDATE, game };
}
