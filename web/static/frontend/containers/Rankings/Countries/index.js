
import React from 'react';
import CSSModules from 'react-css-modules';
import styles from './styles.css';

import * as CountriesUtils from '../../../utils/countries';

import Card from './card';

const Countries = (props) => {
  const cards = CountriesUtils.sort(props.countries)
    .map((country, index) =>
      <Card
        key={country.id}
        rank={index + 1}
        country={country}
      />
    );

  return (
    <section styleName="content">
      {cards}
    </section>
  );
};

Countries.propTypes = {
  countries: React.PropTypes.object.isRequired,
};

export default CSSModules(Countries, styles);

