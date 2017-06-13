
import React from 'react';
import CSSModules from 'react-css-modules';
import styles from './styles.css';
import pure from 'recompose/pure';

import { rankToIndex, fileToIndex } from '../../utils/chess';

const Square = (props) => {
  const { size, file, rank } = props;

  const rankIndex = rankToIndex(rank);
  const fileIndex = fileToIndex(file);

  let squareStyleName;
  const onEven = rankIndex % 2 === 0 && fileIndex % 2 === 0;
  const onOdd = rankIndex % 2 === 1 && fileIndex % 2 === 1;
  if (onEven === true || onOdd === true) {
    squareStyleName = 'square-black';
  } else {
    squareStyleName = 'square-white';
  }

  const style = {
    width: `${size}px`,
    height: `${size}px`,
    position: 'absolute',
    bottom: `${rankIndex * size}px`,
    left: `${fileIndex * size}px`,
  };

  return (
    <div
      style={style}
      styleName={squareStyleName}
    />
  );
};

Square.propTypes = {
  size: React.PropTypes.number,
  rank: React.PropTypes.number.isRequired,
  file: React.PropTypes.string.isRequired,
  children: React.PropTypes.node,
};

export default pure(CSSModules(Square, styles));

