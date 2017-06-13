
import React from 'react';
import CSSModules from 'react-css-modules';
import styles from '../styles.css';

import { connect } from 'react-redux';

import Header from './header';
import Messages from '../messages';
import Input from '../input';

import * as ChatActions from '../../../actions/chat';

const Global = (props) => {
  const {
    auth,
    countries,
    chat,

    handleMessageSubmit,
  } = props;

  let country;
  if (auth.authenticated === true) {
    country = countries[auth.user.countryId];
  }

  return (
    <section styleName="content">
      <Header showGlobal country={country} />
      <Messages
        countries={countries}
        messages={chat.global.messages}
      />
      <Input onSubmit={handleMessageSubmit} />
    </section>
  );
};

Global.propTypes = {
  auth: React.PropTypes.object.isRequired,
  chat: React.PropTypes.object.isRequired,
  countries: React.PropTypes.object.isRequired,

  handleMessageSubmit: React.PropTypes.func.isRequired,
};

function mapStateToProps(state) {
  return {
    auth: state.auth,
    countries: state.countries,
    chat: state.chat,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    handleMessageSubmit: (message) => dispatch(ChatActions.sendGlobalMessage(message)),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(CSSModules(Global, styles));

