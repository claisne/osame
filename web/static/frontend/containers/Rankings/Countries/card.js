
import React from 'react';
import CSSModules from 'react-css-modules';
import styles from './styles.css';

import ordinal from '../../../utils/ordinal';

const Card = (props) => {
  let rank;
  if (props.rank === 1) {
    rank = <i className="ion-trophy" styleName="medal-gold" />;
  } else if (props.rank === 2) {
    rank = <i className="ion-trophy" styleName="medal-silver" />;
  } else if (props.rank === 3) {
    rank = <i className="ion-trophy" styleName="medal-bronze" />;
  } else {
    rank = ordinal(props.rank);
  }

  return (
    <section styleName="card">
      <div styleName="card-header">
        {rank}
        <img alt={props.country.name} src={props.country.imageUrl} />
        {props.country.name}
      </div>

      <div styleName="card-body">
        <div styleName="card-info">
          <i className="ion-trophy" styleName="color-red" />
          {' '}
          {props.country.winsCount}
        </div>
        <div styleName="card-info">
          <i className="ion-person-stalker" styleName="color-green" />
          {' '}
          {props.country.usersCount}
        </div>
        <div styleName="card-info">
          <i className="ion-arrow-graph-up-right" styleName="color-yellow" />
          {' '}
          {props.country.elo}
        </div>
      </div>
    </section>
  );
};

Card.propTypes = {
  rank: React.PropTypes.number.isRequired,
  country: React.PropTypes.object.isRequired,
};

export default CSSModules(Card, styles);

