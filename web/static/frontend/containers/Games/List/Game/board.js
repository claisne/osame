
import React from 'react';
import CSSModules from 'react-css-modules';
import styles from './styles.css';

class Board extends React.Component {
  componentDidMount() {
    this.chessboardElmt = this.refs.chessboard;
    this.board = window.ChessBoard(this.chessboardElmt, {
      position: this.props.board,
      pieceTheme: '/images/chesspieces/{piece}.png',
    });
  }

  shouldComponentUpdate(nextProps) {
    this.board.position(nextProps.board, true);
    return false;
  }

  componentWillUnmount() {
    this.chessboardElmt.innerHTML = '';
  }

  render() {
    return (
      <section styleName="board">
        <div ref="chessboard" styleName="chessboardjs"></div>
      </section>
    );
  }
}

Board.propTypes = {
  board: React.PropTypes.object.isRequired,
};

export default CSSModules(Board, styles);

