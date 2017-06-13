
import _ from 'lodash';
import React from 'react';
import CSSModules from 'react-css-modules';
import styles from './country-picker-styles.css';

class CountryPicker extends React.Component {
  constructor(props) {
    super(props);

    this.handleCountryClick = this.handleCountryClick.bind(this);

    this.state = {
      countryIdSelected: null,
    };
  }

  handleCountryClick(countryId) {
    this.setState({ countryIdSelected: countryId });
  }

  render() {
    const ctx = this;

    const countries = _.map(this.props.countries, country => {
      let countryStyleName = 'country';
      if (this.state.countryIdSelected != null && this.state.countryIdSelected !== country.id) {
        countryStyleName = 'country-fade';
      }

      return (
        <div
          key={country.id}
          styleName={countryStyleName}
          onClick={function onClick() { ctx.handleCountryClick(country.id); }}
        >
          <img alt={country.name} src={country.imageUrl} />
          {country.name}
        </div>
      );
    });

    let submitInput = (
      <input
        type="submit"
        value="Choose"
        styleName="submit-input-disabled"
      />
    );

    if (this.state.countryIdSelected != null) {
      submitInput = (
        <input
          type="submit"
          value="Choose"
          styleName="submit-input"
          onClick={function onClick() {
            ctx.props.onSubmit(ctx.state.countryIdSelected);
          }}
        />
      );
    }

    return (
      <div styleName="content">
        <div styleName="country-picker">
          <h2 styleName="title">Choose a Country to play for</h2>
          <div styleName="submit-warning">
            WARNING! Once you choose your country you won't be able to change it back
          </div>
          <div
            styleName="countries"
          >
            {countries}
          </div>
          <div styleName="submit-container">
            {submitInput}
          </div>
        </div>
      </div>
    );
  }
}

CountryPicker.propTypes = {
  countries: React.PropTypes.object.isRequired,
  styles: React.PropTypes.object,

  onSubmit: React.PropTypes.func.isRequired,
};

export default CSSModules(CountryPicker, styles);
