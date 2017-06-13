
import React from 'react';
import CSSModules from 'react-css-modules';
import styles from './styles.css';

import { Link } from 'react-router';

import TopColors from './top-colors';

const Navbar = (props) => {
  let rightContent = [];

  if (props.auth.authenticated === true) {
    const userCountry = props.countries[props.auth.user.countryId];
    const userClassName = props.styles['link-user'];

    rightContent = (
      <div className={userClassName}>
        {props.auth.user.name}
        <img alt={userCountry.name} src={userCountry.imageUrl} />
      </div>
    );
  } else {
    const loginClassName = props.styles['link-login'];
    const registerClassName = props.styles['link-register'];

    rightContent = [
      <div key="login" className={loginClassName}>
        <i className="ion-log-in" styleName="color-red" />
        {' '}
        Login
      </div>,
      <div key="register" className={registerClassName}>
        <i className="ion-ios-list-outline" styleName="color-blue" />
        {' '}
        Register
      </div>,
    ];
  }

  return (
    <nav styleName="navbar">
      <TopColors />
      <div styleName="content">
        <div styleName="content-left">
          <Link to="/" styleName="brand">Osame</Link>
          <Link to="/games" styleName="link-red">
            <i className="ion-trophy" styleName="color-red" />
            {' '}
            Games
          </Link>
          <Link to="/rankings" styleName="link-blue">
            <i className="ion-podium" styleName="color-blue" />
            {' '}
            Rankings
          </Link>
          <Link to="/account" styleName="link-green">
            <i className="ion-person" styleName="color-green" />
            {' '}
            Account
          </Link>
          <div styleName="link-yellow">
            <i className="ion-information-circled" styleName="color-yellow" />
            {' '}
            About
          </div>
        </div>
        <div styleName="content-right">
          {rightContent}
        </div>
      </div>
    </nav>
  );
};

Navbar.propTypes = {
  auth: React.PropTypes.object.isRequired,
  countries: React.PropTypes.object.isRequired,
  styles: React.PropTypes.object,
};

export default CSSModules(Navbar, styles);

