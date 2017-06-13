
import React from 'react';
import CSSModules from 'react-css-modules';
import styles from './styles.css';

const Header = () =>
  <section styleName="header">
    <div styleName="global-header">
      <i className="ion-ios-world-outline" />
      Global Chat
    </div>
    <div styleName="country-header">
      <img alt="France" src="/images/flags/France.png" />
      Chat
    </div>
  </section>;

export default CSSModules(Header, styles);

