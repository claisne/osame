
import _ from 'lodash';
import React from 'react';
import CSSModules from 'react-css-modules';
import styles from './styles.css';

import Chess from 'chess.js';

import Square from './square.js';
import Piece from './piece.js';

import { ranks, files } from '../../utils/chess';

class Board extends React.Component {
  constructor(props) {
    super(props);

    this.handlePieceAnimationEnd = this.handlePieceAnimationEnd.bind(this);

    this.state = {
      currentFen: this.props.fen,
      currentChess: new Chess(this.props.fen),
    };
  }

  componentWillReceiveProps(nextProps) {
    const chess = new Chess(this.state.currentFen);
    if (nextProps.lastMove != null) {
      const moveToAnimate = chess.move(nextProps.lastMove, { sloppy: true });

      if (moveToAnimate != null) {
        this.setState({
          animating: true,
          moveToAnimate,
        });
      }
    }

    this.setState({
      nextFen: nextProps.fen,
      nextChess: new Chess(nextProps.fen),
    });
  }

  shouldComponentUpdate(nextProps, nextState) {
    if (this.state.currentFen !== nextState.currentFen) {
      return true;
    }

    if (this.state.animating !== nextState.animating) {
      return true;
    }

    return false;
  }

  handlePieceAnimationEnd() {
    this.setState({
      animating: false,
      currentFen: this.state.nextFen,
      currentChess: this.state.nextChess,
    });
  }

  render() {
    const {
      size,
    } = this.props;

    const {
      currentChess,
    } = this.state;

    const style = {
      flex: `0 0 ${size}px`,
      width: `${size}px`,
      height: `${size}px`,
    };

    const chess = currentChess;

    const squareSize = (size - 2) / 8;

    const squares = _.flatMap(ranks, rank =>
      _.map(files, file =>
        <Square
          key={`${rank}${file}`}
          size={squareSize}
          file={file}
          rank={rank}
        />
      )
    );

    const pieces = _.filter(_.flatMap(ranks, rank =>
      _.map(files, file => {
        let piece = chess.get(`${file}${rank}`);
        if (piece != null) {
          let animation;
          if (this.state.animating === true) {
            const fileFrom = this.state.moveToAnimate.from.split('')[0];
            const rankFrom = parseInt(this.state.moveToAnimate.from.split('')[1], 10);

            const fileTo = this.state.moveToAnimate.to.split('')[0];
            const rankTo = parseInt(this.state.moveToAnimate.to.split('')[1], 10);

            if (rankFrom === rank && fileFrom === file) {
              animation = {
                file: fileTo,
                rank: rankTo,
              };
            }
          }

          piece = (
            <Piece
              key={`${file}${rank}`}
              size={squareSize}
              type={piece.type}
              color={piece.color}
              file={file}
              rank={rank}
              animation={animation}
              onAnimationEnd={this.handlePieceAnimationEnd}
            />
          );
        }
        return piece;
      })
    ), p => p != null);


    return (
      <div
        style={style}
        styleName="board"
      >
        {squares}
        {pieces}
      </div>
    );
  }
}

Board.propTypes = {
  size: React.PropTypes.number.isRequired,
  fen: React.PropTypes.string.isRequired,
  lastMove: React.PropTypes.string,
};

export default CSSModules(Board, styles);
