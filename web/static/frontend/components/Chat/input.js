
import React from 'react';
import CSSModules from 'react-css-modules';
import styles from './input-styles.css';

class Input extends React.Component {
  constructor(props) {
    super(props);

    this.handleInputMessageChange = this.handleInputMessageChange.bind(this);
    this.handleInputMessageKeyPress = this.handleInputMessageKeyPress.bind(this);

    this.state = {
      message: '',
    };
  }

  handleInputMessageChange(evt) {
    this.setState({ message: evt.target.value });
  }

  handleInputMessageKeyPress(evt) {
    if (evt.key === 'Enter') {
      this.props.onSubmit(this.state.message);
      this.setState({ message: '' });
    }
  }

  render() {
    return (
      <section styleName="content">
        <input
          type="text"
          value={this.state.message}
          onChange={this.handleInputMessageChange}
          onKeyPress={this.handleInputMessageKeyPress}
          styleName="input"
          placeholder="Type your message..."
        />
      </section>
    );
  }
}

Input.propTypes = {
  onSubmit: React.PropTypes.func.isRequired,
};

export default CSSModules(Input, styles);

