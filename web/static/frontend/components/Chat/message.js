
import React from 'react';
import CSSModules from 'react-css-modules';
import styles from './message-styles.css';

const Message = (props) => {
  const country = props.countries[props.user.countryId];

  const date = new Date(props.timestamp);
  const dateString = `${date.getHours()}:${date.getMinutes()}`;

  return (
    <section
      styleName="message"
    >
      <img
        styleName="flag"
        alt={country.name}
        src={country.imageUrl}
      />
      <span styleName="username">{props.user.name}</span>
      <span styleName="date">({dateString})</span>
      <span styleName="separator">:</span>
      <span>{props.content}</span>
    </section>
  );
};

Message.propTypes = {
  countries: React.PropTypes.object.isRequired,

  user: React.PropTypes.object.isRequired,
  timestamp: React.PropTypes.number.isRequired,
  content: React.PropTypes.string.isRequired,
};

export default CSSModules(Message, styles);

