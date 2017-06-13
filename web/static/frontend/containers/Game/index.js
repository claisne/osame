
import React from 'react';
import CSSModules from 'react-css-modules';
import styles from './styles.css';

import { connect } from 'react-redux';

import Chat from '../../components/Chat/Global';

import Header from './header';
import Footer from './footer';
import Votes from './votes';
import Board from '../../components/Board';

const Game = (props) => {
  const game = props.games[props.params.gameId];

  return (
    <section styleName="content">
      <Chat />
      <div styleName="game">
        <Header
          timeLeft={60}
        />
        <div styleName="center">
          <Votes color="white" />
          <div styleName="board-container">
            <Board
              size={450}
              fen={game.state.fen}
              lastMove={game.state.lastMove}
            />
          </div>
          <Votes color="black" />
        </div>
        <Footer />
      </div>
      <Chat />
    </section>
  );
};

Game.propTypes = {
  params: React.PropTypes.object.isRequired,
  games: React.PropTypes.object.isRequired,
  countries: React.PropTypes.object.isRequired,
};

function mapStateToProps(state) {
  return {
    games: state.games,
    countries: state.countries,
  };
}

function mapDispatchToProps() {
  return {
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(CSSModules(Game, styles));
