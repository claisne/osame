
import React from 'react';
import CSSModules from 'react-css-modules';
import styles from './styles.css';

import { connect } from 'react-redux';

import GlobalChat from '../../components/Chat/Global';
import SubNavbar from '../../components/SubNavbar';
import CountryPicker from './country-picker';

import LoginRegister from './login-register';

import * as AccountActions from '../../actions/account';

const Account = (props) => {
  let content;
  if (props.auth.authenticated === false) {
    if (props.account.showCountries === true) {
      content = (
        <CountryPicker
          countries={props.countries}
          onSubmit={props.handleCountrySubmit}
        />
      );
    } else {
      content = (
        <LoginRegister
          account={props.account}
          countries={props.countries}
          onLoginSubmit={props.handleLoginSubmit}
          onRegisterSubmit={props.handleRegisterSubmit}
          onRegisterCountrySelectedClick={props.handleRegisterCountrySelectedClick}
        />
      );
    }
  }

  return (
    <section styleName="content">
      <div styleName="left-content">
        <SubNavbar />
        {content}
      </div>
      <GlobalChat />
    </section>
  );
};

Account.propTypes = {
  auth: React.PropTypes.object.isRequired,
  account: React.PropTypes.object.isRequired,
  countries: React.PropTypes.object.isRequired,

  handleLoginSubmit: React.PropTypes.func.isRequired,
  handleRegisterSubmit: React.PropTypes.func.isRequired,
  handleCountrySubmit: React.PropTypes.func.isRequired,
  handleRegisterCountrySelectedClick: React.PropTypes.func.isRequired,
};

function mapStateToProps(state) {
  return {
    auth: state.auth,
    account: state.account,
    countries: state.countries,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    handleLoginSubmit:
      (credentials) => dispatch(AccountActions.login(credentials)),
    handleRegisterSubmit:
      (user) => dispatch(AccountActions.setRegisterBasics(user)),
    handleRegisterCountrySelectedClick:
      () => dispatch(AccountActions.showCountries()),
    handleCountrySubmit:
      (countryId) => dispatch(AccountActions.setRegisterCountry(countryId)),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(CSSModules(Account, styles));

