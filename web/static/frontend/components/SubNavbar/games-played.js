
import React from 'react';
import CSSModules from 'react-css-modules';
import styles from './styles.css';

const GamesPlayed = (props) =>
  <section styleName="item">
    <i className="ion-trophy" styleName="icon-red" />
    {' '}
    {props.gamesCount} games
  </section>;

GamesPlayed.propTypes = {
  gamesCount: React.PropTypes.number.isRequired,
};

export default CSSModules(GamesPlayed, styles);

