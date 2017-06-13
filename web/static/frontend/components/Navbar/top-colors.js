
import React from 'react';
import CSSModules from 'react-css-modules';
import styles from './styles.css';

const TopColors = () =>
  <div styleName="top-colors">
    <div styleName="top-color-red"></div>
    <div styleName="top-color-blue"></div>
    <div styleName="top-color-green"></div>
    <div styleName="top-color-yellow"></div>
  </div>;

export default CSSModules(TopColors, styles);

