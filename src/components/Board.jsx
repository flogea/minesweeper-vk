import React, { Component } from 'react';
import Row from './Row';

class Board extends Component {
  constructor(props) {
    super(props);

    this.state = {
      rows: this.createBoard(props),
    };
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.openCells > nextProps.openCells || this.props.columns !== nextProps.columns) {
      this.setState({
        rows: this.createBoard(nextProps),
      });
    }
  }

  createBoard = (props) => {
    let board = [];

    for (let i = 0; i < props.rows; i++) {
      board.push([]);
      for (let j = 0; j < props.columns; j++) {
        board[i].push({
          x: j,
          y: i,
          count: 0,
          isOpen: false,
          hasMine: false,
          hasFlag: false,
          hasQuestion: false,
          isRed: false,
        });
      }
    }

    for (let i = 0; i < props.mines; i++) {
      let randomRow = Math.floor(Math.random() * props.rows);
      let randomCol = Math.floor(Math.random() * props.columns);

      let cell = board[randomRow][randomCol];

      if (cell.hasMine) {
        i--;
      } else {
        cell.hasMine = true;
      }
    }
    return board;
  };

  flagAndQuestion = (cell) => {
    if (this.props.status === 'ended') {
      return;
    }
    let rows = this.state.rows;

    if (cell.hasFlag) {
      cell.hasFlag = false;
      cell.hasQuestion = true;
      this.props.changeFlagAmount(cell.hasFlag ? -1 : 1);
    } else if (cell.hasQuestion) {
      cell.hasFlag = false;
      cell.hasQuestion = false;
      this.props.changeFlagAmount(0);
    } else {
      cell.hasFlag = true;
      cell.hasQuestion = false;
      this.props.changeFlagAmount(cell.hasFlag ? -1 : 1);
    }

    this.setState({ rows });
  };

  open = (cell) => {
    if (this.props.status === 'ended') {
      return;
    }

    let asyncCountMines = new Promise((resolve) => {
      let mines = this.findMines(cell);
      resolve(mines);
    });

    asyncCountMines.then((numberOfMines) => {
      let rows = this.state.rows;

      if (cell.hasMine && this.props.openCells === 0) {
        console.log('mine was on first click');
        let newRows = this.createBoard(this.props);
        this.setState({ rows: newRows }, () => {
          this.open(cell);
        });
      } else {
        if (!cell.hasFlag && !cell.isOpen) {
          this.props.onCellClick();

          cell.isOpen = true;
          cell.count = numberOfMines;

          this.setState({ rows });

          if (!cell.hasMine && numberOfMines === 0) {
            this.openAroundCell(cell);
          }

          if (cell.hasMine && this.props.openCells !== 0) {
            this.openAllMines();
            cell.isRed = true;
            this.props.endGame();
          }
        }
      }
    });
  };

  findMines = (cell) => {
    let minesInProximity = 0;

    for (let row = -1; row <= 1; row++) {
      for (let col = -1; col <= 1; col++) {
        if (cell.y + row >= 0 && cell.x + col >= 0) {
          if (cell.y + row < this.state.rows.length && cell.x + col < this.state.rows[0].length) {
            if (this.state.rows[cell.y + row][cell.x + col].hasMine && !(row === 0 && col === 0)) {
              minesInProximity++;
            }
          }
        }
      }
    }
    return minesInProximity;
  };

  openAroundCell = (cell) => {
    let rows = this.state.rows;

    for (let row = -1; row <= 1; row++) {
      for (let col = -1; col <= 1; col++) {
        if (cell.y + row >= 0 && cell.x + col >= 0) {
          if (cell.y + row < this.state.rows.length && cell.x + col < this.state.rows[0].length) {
            if (
              !this.state.rows[cell.y + row][cell.x + col].hasMine &&
              !rows[cell.y + row][cell.x + col].isOpen
            ) {
              this.open(rows[cell.y + row][cell.x + col]);
            }
          }
        }
      }
    }
  };

  openAllMines = () => {
    let rows = this.state.rows;

    for (let row = 0; row < rows.length; row++) {
      for (let col = 0; col < rows[row].length; col++) {
        if (rows[row][col].hasMine) {
          rows[row][col].isOpen = true;
          this.setState({ rows });
        }
      }
    }
  };

  render() {
    let rows = this.state.rows.map((cells, index) => (
      <Row
        cells={cells}
        open={this.open}
        flag={this.flagAndQuestion}
        question={this.props.question}
        key={index}
      />
    ));
    return <div className="board">{rows}</div>;
  }
}

export default Board;
