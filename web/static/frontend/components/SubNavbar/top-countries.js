
import React from 'react';
import CSSModules from 'react-css-modules';
import styles from './styles.css';

import * as CountriesUtils from '../../utils/countries';

const TopCountries = (props) => {
  const topCountries = CountriesUtils.sort(props.countries, 3);

  const firstCountry = topCountries[0];
  const secondCountry = topCountries[1];
  const thirdCountry = topCountries[2];

  const first = (
    <div styleName="top-country">
      1st
      <img
        alt={firstCountry.name}
        src={firstCountry.imageUrl}
      />
    </div>
  );

  const second = (
    <div styleName="top-country">
      2nd
      <img
        alt={secondCountry.name}
        src={secondCountry.imageUrl}
      />
    </div>
  );

  const third = (
    <div styleName="top-country">
      3rd
      <img
        alt={thirdCountry.name}
        src={thirdCountry.imageUrl}
      />
    </div>
  );

  return (
    <section styleName="item">
      {first}
      {second}
      {third}
    </section>
  );
};

TopCountries.propTypes = {
  countries: React.PropTypes.object.isRequired,
};

export default CSSModules(TopCountries, styles);

