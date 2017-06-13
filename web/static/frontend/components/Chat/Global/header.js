
import React from 'react';
import CSSModules from 'react-css-modules';
import styles from '../styles.css';

const Header = (props) => {
  if (props.country != null) {
    let globalStyleName = 'global-header';
    if (props.showGlobal !== true) {
      globalStyleName = 'global-header-fade';
    }

    let countryStyleName = 'country-header';
    if (props.showGlobal === true) {
      countryStyleName = 'country-header-fade';
    }

    return (
      <section styleName="header">
        <div styleName={globalStyleName}>
          <i className="ion-ios-world-outline" />
          Global Chat
        </div>
        <div styleName={countryStyleName}>
          <img alt={props.country.name} src={props.country.imageUrl} />
          Chat
        </div>
      </section>
    );
  }

  return (
    <section styleName="header">
      <div styleName="global-header">
        <i className="ion-ios-world-outline" />
        Global Chat
      </div>
    </section>
  );
};

Header.propTypes = {
  showGlobal: React.PropTypes.bool.isRequired,
  country: React.PropTypes.object,
};

export default CSSModules(Header, styles);

