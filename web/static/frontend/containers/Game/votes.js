
import React from 'react';
import CSSModules from 'react-css-modules';
import styles from './votes-styles.css';

let Vote = (props) => {
  let pieceImage;
  if (props.color === 'white') {
    pieceImage = (
      <img
        alt="Vote Piece"
        src="/images/chesspieces/wP.png"
      />
    );
  } else {
    pieceImage = (
      <img
        alt="Vote Piece"
        src="/images/chesspieces/bP.png"
      />
    );
  }

  return (
    <div styleName="vote">
      <div styleName="vote-infos">
        {pieceImage}
        <div styleName="vote-position">
          <span>F2</span>
          <span>F4</span>
        </div>
      </div>
      <div styleName="vote-percentage">
        25%
      </div>
    </div>
  );
};

Vote.propTypes = {
  color: React.PropTypes.string.isRequired,
};

Vote = CSSModules(Vote, styles);

const Votes = (props) => {
  let styleName;
  if (props.color === 'white') {
    styleName = 'content-white';
  } else {
    styleName = 'content-black';
  }

  return (
    <section styleName={styleName}>
      <section styleName="header">Votes</section>
      <Vote color={props.color} />
    </section>
  );
};

Votes.propTypes = {
  color: React.PropTypes.string.isRequired,
};

export default CSSModules(Votes, styles);

