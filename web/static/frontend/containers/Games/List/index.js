
import _ from 'lodash';
import React from 'react';
import CSSModules from 'react-css-modules';
import styles from './styles.css';

import Game from './Game';

const List = (props) => {
  const games = _.map(props.games, game => {
    const whiteCountry = props.countries[game.firstCountry];
    const blackCountry = props.countries[game.secondCountry];

    return (
      <Game
        key={game.id}
        gameId={game.id}
        gameState={game.state}
        whiteCountry={whiteCountry}
        blackCountry={blackCountry}
      />
    );
  });

  return (
    <section styleName="content">
      {games}
    </section>
  );
};

List.propTypes = {
  games: React.PropTypes.object.isRequired,
  countries: React.PropTypes.object.isRequired,
};

export default CSSModules(List, styles);

