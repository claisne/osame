
import React from 'react';
import CSSModules from 'react-css-modules';
import styles from './styles.css';

import { connect } from 'react-redux';

import GlobalChat from '../../components/Chat/Global';
import SubNavbar from '../../components/SubNavbar';
import List from './List';

const Games = (props) =>
  <section styleName="content">
    <div styleName="left-content">
      <SubNavbar />
      <List
        games={props.games}
        countries={props.countries}
      />
    </div>
    <GlobalChat />
  </section>;

Games.propTypes = {
  countries: React.PropTypes.object.isRequired,
  games: React.PropTypes.object.isRequired,
};

function mapStateToProps(state) {
  return {
    countries: state.countries,
    games: state.games,
  };
}

function mapDispatchToProps() {
  return {};
}

export default connect(mapStateToProps, mapDispatchToProps)(CSSModules(Games, styles));

