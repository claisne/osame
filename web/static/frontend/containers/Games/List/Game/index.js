
import React from 'react';
import CSSModules from 'react-css-modules';
import styles from './styles.css';
import pure from 'recompose/pure';

import { Link } from 'react-router';

import Board from '../../../../components/Board';
import Description from './description';

const Game = (props) =>
  <Link to={`/game/${props.gameId}`} styleName="game">
    <Board
      size={180}
      fen={props.gameState.fen}
      lastMove={props.gameState.lastMove}
    />
    <Description
      whiteCountry={props.whiteCountry}
      blackCountry={props.blackCountry}
    />
  </Link>;

Game.propTypes = {
  gameId: React.PropTypes.string.isRequired,
  gameState: React.PropTypes.object.isRequired,
  whiteCountry: React.PropTypes.object.isRequired,
  blackCountry: React.PropTypes.object.isRequired,
};

export default pure(CSSModules(Game, styles));

