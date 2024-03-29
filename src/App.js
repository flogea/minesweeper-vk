import React, { Component } from 'react';
import BoardHead from './components/BoardHead';
import Board from './components/Board';
import boardImg from './assets/board.png';

class App extends Component {
  constructor() {
    super();

    this.state = {
      gameStatus: 'waiting',
      time: 0,
      flagCount: 40,
      openCells: 0,
      mines: 40,
      rows: 16,
      columns: 16,
    };

    this.baseState = this.state;
  }

  componentDidUpdate(nextProps, nextState) {
    if (this.state.gameStatus === 'running') {
      this.checkForWinner();
    }
  }

  checkForWinner = () => {
    if (this.state.mines + this.state.openCells >= this.state.rows * this.state.columns) {
      this.setState(
        {
          gameStatus: 'winner',
        },
        alert('you won!'),
      );
    }
  };

  componentWillMount() {
    this.intervals = [];
  }

  setInterval = (fn, t) => {
    this.intervals.push(setInterval(fn, t));
  };

  reset = () => {
    this.intervals.map(clearInterval);
    this.setState(Object.assign({}, this.baseState), () => {
      this.intervals = [];
    });
  };

  tick = () => {
    if (this.state.openCells > 0 && this.state.gameStatus === 'running') {
      let time = this.state.time + 1;
      this.setState({ time });
    }
  };

  endGame = () => {
    this.setState({
      gameStatus: 'ended',
    });
  };

  changeFlagAmount = (amount) => {
    this.setState({ flagCount: this.state.flagCount + amount, gameStatus: 'running' });
  };

  handleCellClick = () => {
    if (this.state.openCells === 0 && this.state.gameStatus !== 'running') {
      this.setState(
        {
          gameStatus: 'running',
        },
        this.setInterval(this.tick, 1000),
      );
    } else if (this.state.gameStatus !== 'running') {
      this.setState({ gameStatus: 'running' });
    }
    this.setState((prevState) => {
      return { openCells: prevState.openCells + 1 };
    });
  };

  render() {
    return (
      <div className="minesweeper">
        <h1>Minesweeper for Vk</h1>
        <div className="container">
          <BoardHead
            time={this.state.time}
            flagsUsed={this.state.flagCount}
            reset={this.reset}
            status={this.state.gameStatus}
          />
          <div
            onMouseDown={() => {
              if (this.state.gameStatus !== 'ended') {
                this.setState({
                  gameStatus: 'wow',
                });
              }
            }}>
            <Board
              openCells={this.state.openCells}
              mines={this.state.mines}
              rows={this.state.rows}
              columns={this.state.columns}
              endGame={this.endGame}
              status={this.state.gameStatus}
              onCellClick={this.handleCellClick}
              changeFlagAmount={this.changeFlagAmount}
            />
          </div>
        </div>
      </div>
    );
  }
}

export default App;
