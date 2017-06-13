
import _ from 'lodash';
import React from 'react';
import { Motion, spring } from 'react-motion';
import pure from 'recompose/pure';

import { rankToIndex, fileToIndex } from '../../utils/chess';

const Piece = (props) => {
  const {
    size,
    file,
    rank,
    type,
    color,
    animation,

    onAnimationEnd,
  } = props;

  const fileIndex = fileToIndex(file);
  const rankIndex = rankToIndex(rank);

  const typeUpperCased = _.upperCase(type);
  const src = `/images/chesspieces/${color}${typeUpperCased}.png`;

  const springConfig = {
    stiffness: 210,
    damping: 20,
  };

  const style = {
    width: `${size}px`,
    height: `${size}px`,
    position: 'absolute',
    bottom: `${rankIndex * size}px`,
    left: `${fileIndex * size}px`,
  };

  if (animation != null) {
    const animationFileIndex = fileToIndex(animation.file);
    const animationRankIndex = rankToIndex(animation.rank);

    return (
      <Motion
        defaultStyle={{ x: 0, y: 0 }}
        style={{
          x: spring((animationFileIndex - fileIndex) * size, springConfig),
          y: spring((rankIndex - animationRankIndex) * size, springConfig),
        }}
        onRest={onAnimationEnd}
      >
        {({ x, y }) => {
          const animatedStyle = _.merge({}, style, {
            WebkitTransform: `translate3d(${x}px, ${y}px, 0)`,
            transform: `translate3d(${x}px, ${y}px, 0)`,
          });

          return (
            <img
              src={src}
              alt="Chess piece"
              style={animatedStyle}
            />
          );
        }}
      </Motion>
    );
  }

  return <img alt="Chess piece" style={style} src={src} />;
};

Piece.propTypes = {
  size: React.PropTypes.number,
  rank: React.PropTypes.number.isRequired,
  file: React.PropTypes.string.isRequired,
  type: React.PropTypes.string,
  color: React.PropTypes.string,
  animation: React.PropTypes.object,
  onAnimationEnd: React.PropTypes.func,
};

export default pure(Piece);
