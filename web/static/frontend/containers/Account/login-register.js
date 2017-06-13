
import React from 'react';
import CSSModules from 'react-css-modules';
import styles from './login-register-styles.css';

import Login from './login';
import Register from './register';

const LoginRegister = (props) =>
  <section styleName="content">
    <div styleName="login-register">
      <div styleName="login-register-forms">
        <Register
          countries={props.countries}
          {...props.account.register}
          onSubmit={props.onRegisterSubmit}
          onCountrySelectedClick={props.onRegisterCountrySelectedClick}
        />
        <Login onSubmit={props.onLoginSubmit} />
      </div>
      <p styleName="information">
        Creating an account will allow you to play for your country!
        We require an e-mail adress to prevent spamming and to allow you to recover your password.
        We will never send you an e-mail unless you request it.
      </p>
    </div>
  </section>;

LoginRegister.propTypes = {
  account: React.PropTypes.object.isRequired,
  countries: React.PropTypes.object.isRequired,

  onLoginSubmit: React.PropTypes.func.isRequired,
  onRegisterSubmit: React.PropTypes.func.isRequired,
  onRegisterCountrySelectedClick: React.PropTypes.func.isRequired,
};

export default CSSModules(LoginRegister, styles);

