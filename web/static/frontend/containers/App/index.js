
import React from 'react';
import CSSModules from 'react-css-modules';
import styles from './styles.css';

import { connect } from 'react-redux';

import Navbar from '../../components/Navbar';

const App = (props) =>
  <main styleName="app">
    <Navbar auth={props.auth} countries={props.countries} />
    <section styleName="page">
      {props.children}
    </section>
  </main>;

App.propTypes = {
  auth: React.PropTypes.object.isRequired,
  countries: React.PropTypes.object.isRequired,
  children: React.PropTypes.node,
};

function mapStateToProps(state) {
  return {
    auth: state.auth,
    countries: state.countries,
  };
}

function mapDispatchToProps() {
  return {};
}

export default connect(mapStateToProps, mapDispatchToProps)(CSSModules(App, styles));

