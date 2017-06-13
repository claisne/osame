
import React from 'react';
import CSSModules from 'react-css-modules';
import styles from './styles.css';

import { connect } from 'react-redux';

import GlobalChat from '../../components/Chat/Global';
import SubNavbar from '../../components/SubNavbar';

import Users from './Users';
import Countries from './Countries';

const Rankings = (props) =>
  <section styleName="content">
    <div styleName="left-content">
      <SubNavbar />
      <div styleName="rankings">
        <Countries countries={props.countries} />
      </div>
    </div>
    <GlobalChat />
  </section>;

Rankings.propTypes = {
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

export default connect(mapStateToProps, mapDispatchToProps)(CSSModules(Rankings, styles));

