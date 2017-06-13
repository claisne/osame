
import React from 'react';
import CSSModules from 'react-css-modules';
import styles from './styles.css';

const UsersOnline = (props) =>
  <section styleName="item">
    <i className="ion-person-stalker" styleName="icon-green" />
    {' '}
    {props.usersCount} online
  </section>;

UsersOnline.propTypes = {
  usersCount: React.PropTypes.number.isRequired,
};

export default CSSModules(UsersOnline, styles);

