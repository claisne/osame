
import React from 'react';
import CSSModules from 'react-css-modules';
import styles from './header-styles.css';

const Header = (props) =>
  <section styleName="header">
    <div styleName="">
    </div>
    <div styleName="">
      {props.timeLeft}
    </div>
  </section>;

Header.propTypes = {
  timeLeft: React.PropTypes.number,
};

export default CSSModules(Header, styles);

