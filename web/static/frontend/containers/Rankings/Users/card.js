
import React from 'react';
import CSSModules from 'react-css-modules';
import styles from './styles.css';

const Card = () =>
  <section styleName="card">
    <div styleName="card-header">
      1ST
      <i className="ion-person-stalker" />
      Username
    </div>

    <div styleName="card-body">
      <div styleName="card-info">
        <i className="ion-trophy" styleName="color-red" />
				{' '}
        25
      </div>
      <div styleName="card-info">
        <img alt="France" src="/images/flags/France.png" />
      </div>
      <div styleName="card-info">
        <i className="ion-arrow-graph-up-right" styleName="color-yellow" />
				{' '}
        1450
      </div>
    </div>
  </section>;

export default CSSModules(Card, styles);

