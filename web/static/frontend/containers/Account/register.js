
import React from 'react';
import CSSModules from 'react-css-modules';
import styles from './login-register-styles.css';

class Register extends React.Component {
  constructor(props) {
    super(props);

    this.handleChangeForm = this.handleChangeForm.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleBlur = this.handleBlur.bind(this);

    this.state = {
      name: props.name || '',
      email: props.email || '',
      password: props.password || '',
      passwordRepeat: props.password || '',
      countryId: props.countryId,
      error: {},
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

    const nameRegex = /^[a-zA-Z0-9_]*$/;
    const emailRegex = /^[^@]+@([^@\.]+\.)+[^@\.]+$/;

    if (!this.state.name.match(nameRegex)) {
      this.setState({
        error: {
          attr: 'name',
          description: 'The username can only contains numbers, letters and underscores',
        },
      });

      return;
    }

    if (this.state.name.length < 3 || this.state.name.length > 20) {
      this.setState({
        error: {
          attr: 'name',
          description: 'Your username must be at least 3 characters, and smaller than 20',
        },
      });

      return;
    }

    if (!this.state.email.match(emailRegex)) {
      this.setState({
        error: {
          attr: 'email',
          description: 'Your email address is not correct',
        },
      });

      return;
    }

    if (this.state.email.length > 100) {
      this.setState({
        error: {
          attr: 'name',
          description: 'Your email must smaller than 50 characters',
        },
      });

      return;
    }

    if (this.state.password.length < 3 || this.state.name.length > 50) {
      this.setState({
        error: {
          attr: 'password',
          description: 'Your password must be at least 3 characters, and smaller than 50',
        },
      });

      return;
    }

    if (this.state.passwordRepeat !== this.state.password) {
      this.setState({
        error: {
          attr: 'password',
          description: 'Your passwords mismatch',
        },
      });

      return;
    }

    this.props.onSubmit({
      name: this.state.name,
      email: this.state.email,
      password: this.state.password,
    });
  }

  handleBlur() {
    this.setState({ error: {} });
  }

  render() {
    const { countries, onCountrySelectedClick } = this.props;

    let errorDescription;
    if (this.state.error.attr != null) {
      errorDescription = <p styleName="error-text">{this.state.error.description}</p>;
    }

    let nameStyleName = 'text-input';
    if (this.state.error.attr === 'name') {
      nameStyleName = 'text-input-error';
    }

    let emailStyleName = 'text-input';
    if (this.state.error.attr === 'email') {
      emailStyleName = 'text-input-error';
    }

    let passwordStyleName = 'text-input';
    if (this.state.error.attr === 'password') {
      passwordStyleName = 'text-input-error';
    }

    let countryImg;
    if (this.state.countryId != null) {
      const country = countries[this.state.countryId];

      countryImg = (
        <div
          styleName="register-country"
          onClick={onCountrySelectedClick}
        >
          <img alt={country.name} src={country.imageUrl} />
        </div>
      );
    }

    let submitInputValue = 'Choose your country';
    if (this.state.countryId != null) {
      submitInputValue = 'Register';
    }

    return (
      <div styleName="register">
        <h2>Create a new account</h2>
        <form
          styleName="form"
          onSubmit={this.handleSubmit}
          onBlur={this.handleBlur}
        >
          <input
            type="text"
            value={this.state.name}
            onChange={this.handleChangeForm('name')}
            styleName={nameStyleName}
            placeholder="Username"
          />
          <input
            type="text"
            value={this.state.email}
            onChange={this.handleChangeForm('email')}
            styleName={emailStyleName}
            placeholder="Email"
          />
          <input
            type="password"
            value={this.state.password}
            onChange={this.handleChangeForm('password')}
            styleName={passwordStyleName}
            placeholder="Password"
          />
          <input
            type="password"
            value={this.state.passwordRepeat}
            onChange={this.handleChangeForm('passwordRepeat')}
            styleName={passwordStyleName}
            placeholder="Password confirmation"
          />
          {countryImg}
          {errorDescription}
          <input
            type="submit"
            styleName="submit-input"
            value={submitInputValue}
          />
        </form>
      </div>
    );
  }
}

Register.propTypes = {
  name: React.PropTypes.string,
  email: React.PropTypes.string,
  password: React.PropTypes.string,
  passwordRepeat: React.PropTypes.string,
  countryId: React.PropTypes.number,

  countries: React.PropTypes.object,

  onSubmit: React.PropTypes.func.isRequired,
  onCountrySelectedClick: React.PropTypes.func.isRequired,
};

export default CSSModules(Register, styles);

