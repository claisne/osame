
import _ from 'lodash';
import React from 'react';
import CSSModules from 'react-css-modules';
import styles from './styles.css';

import Message from './message';

const Messages = (props) => {
  const messages = _.map(props.messages, message =>
   <Message
     key={`${message.user.id}:${message.timestamp}`}
     countries={props.countries}
     {...message}
   />
  );

  return (
    <section styleName="messages">
      {messages}
    </section>
  );
};

Messages.propTypes = {
  countries: React.PropTypes.object.isRequired,
  messages: React.PropTypes.array.isRequired,
};

export default CSSModules(Messages, styles);

