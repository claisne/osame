
import _ from 'lodash';
import React from 'react';
import CSSModules from 'react-css-modules';
import styles from './styles.css';

import { connect } from 'react-redux';

import UsersOnline from './users-online';
import GamesPlayed from './games-played';
import TopCountries from './top-countries';

import * as AccountActions from '../../actions/account';

let Logout = (props) =>
  <div styleName="item-right">
    <button
      styleName="logout-btn"
      onClick={props.onLogoutClick}
    >
      Logout
    </button>
  </div>;

Logout.propTypes = {
  onLogoutClick: React.PropTypes.func.isRequired,
};

Logout = CSSModules(Logout, styles);

const SubNavbar = (props) => {
  let logout;
  if (props.auth.authenticated) {
    logout = <Logout onLogoutClick={props.handleLogoutClick} />;
  }

  return (
    <nav styleName="subnavbar">
      <div styleName="left">
        <UsersOnline usersCount={props.usersCount} />
        <GamesPlayed gamesCount={props.gamesCount} />
        <TopCountries countries={props.countries} />
      </div>
      <div styleName="right">
        {logout}
      </div>
    </nav>
  );
};

SubNavbar.propTypes = {
  auth: React.PropTypes.object.isRequired,
  usersCount: React.PropTypes.number.isRequired,
  gamesCount: React.PropTypes.number.isRequired,
  countries: React.PropTypes.object.isRequired,

  handleLogoutClick: React.PropTypes.func.isRequired,
};

function mapStateToProps(state) {
  return {
    auth: state.auth,
    usersCount: state.chat.usersCount,
    gamesCount: _.keys(state.games).length,
    countries: state.countries,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    handleLogoutClick: () => dispatch(AccountActions.logout()),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(CSSModules(SubNavbar, styles));

