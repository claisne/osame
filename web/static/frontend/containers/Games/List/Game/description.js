
import React from 'react';
import CSSModules from 'react-css-modules';
import styles from './description-styles.css';
import pure from 'recompose/pure';

const Description = (props) =>
  <section styleName="description">
    <div styleName="header">
      <div styleName="header-country">
        <img alt="Country color" src="/images/chesspieces/wK.png" />
        <img
          alt={props.whiteCountry.name}
          src={props.whiteCountry.imageUrl}
        />
      </div>
      VS
      <div styleName="header-country">
        <img
          alt={props.blackCountry.name}
          src={props.blackCountry.imageUrl}
        />
        <img alt="Country color" src="/images/chesspieces/bK.png" />
      </div>
    </div>

    <div styleName="stats">
      <div styleName="stats-item">
        {props.whiteCountry.winsCount}
        <i className="ion-trophy" styleName="color-red" />
        {props.blackCountry.lossesCount}
      </div>
      <div styleName="stats-item">
        1st
        <i className="ion-podium" styleName="color-blue" />
        2nd
      </div>
      <div styleName="stats-item">
        {props.whiteCountry.usersCount}
        <i className="ion-person-stalker" styleName="color-green" />
        {props.blackCountry.usersCount}
      </div>
      <div styleName="stats-item">
        {props.whiteCountry.elo}
        <i
          className="ion-arrow-graph-up-right"
          styleName="color-yellow"
        />
        {props.blackCountry.elo}
      </div>
    </div>
  </section>;

Description.propTypes = {
  whiteCountry: React.PropTypes.object.isRequired,
  blackCountry: React.PropTypes.object.isRequired,
};

export default pure(CSSModules(Description, styles));

