
import React from 'react';
import CSSModules from 'react-css-modules';
import styles from './styles.css';

import { connect } from 'react-redux';

import WorldMap from './world-map';
import GlobalChat from '../../components/Chat/Global';

const Home = () =>
  <section styleName="content">
    <div styleName="left-content">
      <WorldMap />
    </div>
    <GlobalChat />
  </section>;

Home.propTypes = {
  countries: React.PropTypes.object.isRequired,
};

function mapStateToProps(state) {
  return {
    countries: state.countries,
  };
}

function mapDispatchToProps() {
  return {};
}

export default connect(mapStateToProps, mapDispatchToProps)(CSSModules(Home, styles));

