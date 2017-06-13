
import React from 'react';
import CSSModules from 'react-css-modules';
import styles from './login-register-styles.css';

class Login extends React.Component {
  constructor(props) {
    super(props);

    this.handleChangeForm = this.handleChangeForm.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);

    this.state = {
      identifier: '',
      password: '',
    };
  }

  handleChangeForm(attr) {
    const ctx = this;
    return function handleChange(evt) {
      ctx.setState({ [attr]: evt.target.value });
    };
  }

  handleSubmit(evt) {
    evt.preventDefault();

    this.props.onSubmit({
      identifier: this.state.identifier,
      password: this.state.password,
    });
  }

  render() {
    return (
      <div styleName="login">
        <h2>Sign in</h2>
        <form
          styleName="form"
          onSubmit={this.handleSubmit}
        >
          <input
            type="text"
            value={this.state.identifier}
            onChange={this.handleChangeForm('identifier')}
            styleName="text-input"
            placeholder="Username or email"
          />
          <input
            type="password"
            value={this.state.password}
            onChange={this.handleChangeForm('password')}
            styleName="text-input"
            placeholder="Password"
          />
          <input
            type="submit"
            styleName="submit-input"
            value="Login"
          />
        </form>
      </div>
    );
  }
}

Login.propTypes = {
  onSubmit: React.PropTypes.func.isRequired,
};

export default CSSModules(Login, styles);

