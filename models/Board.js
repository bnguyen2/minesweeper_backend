const Cell = require('./Cell');
const getAdjacentCells = require('./helper/helperFunc');

class Board {
  constructor(rows, cols, mines) {
    this.rows = rows;
    this.cols = cols;
    this.mines = mines;
    this.board;
    this.playerView;
  }

  initBoard() {
    let board = [];
    let playerView = [];

    for (let i = 0; i < this.rows; i++) {
      board[i] = [];
      playerView[i] = [];

      for (let j = 0; j < this.cols; j++) {
        board[i][j] = new Cell(i, j);
        playerView[i][j] = '*';
      }
    }

    board = this.plantMines(board);
    board = this.getNeighbor(board);

    this.board = board;
    this.playerView = playerView;
  }

  plantMines(board) {
    let mines = this.mines;

    while (mines > 0) {
      const randomRow = Math.floor(Math.random() * this.rows);
      const randomCol = Math.floor(Math.random() * this.cols);

      const randomPoint = board[randomRow][randomCol];

      if (!randomPoint.isMine) {
        randomPoint.isMine = true;
        mines--;
      }
    }

    return board;
  }

  getNeighbor(board) {
    for (let i = 0; i < this.rows; i++) {
      for (let j = 0; j < this.cols; j++) {
        if (!board[i][j].isMine) {
          let mines = 0;
          const area = getAdjacentCells(board, i, j);

          area.forEach(cell => {
            if (cell.isMine) {
              mines++;
            }
          });

          if (mines === 0) {
            board[i][j].isEmpty = true;
          }

          board[i][j].neighbor = mines;
        }
      }
    }

    return board;
  }

  floodFill(board, x, y) {
    const area = getAdjacentCells(board);

    area.forEach(cell => {
      if (!cell.isRevealed && (cell.isEmpty || !cell.isMine)) {
        board[cell.x][cell.y].isRevealed = true;
        if (cell.isEmpty) {
          this.floodFill(board, cell.x, cell.y);
        }
      }
    });

    return board;
  }

  revealAll() {
    const board = this.board;

    for (let i = 0; i < this.rows; i++) {
      for (let j = 0; j < this.cols; j++) {
        board[i][j].isRevealed = true;
      }
    }

    this.board = board;
  }

  getWinner(board) {
    const mines = [];

    board.map(rows => {
      rows.map(cell => {
        if (!cell.isRevealed) {
          mines.push(cell);
        }
      });
    });
    return mines;
  }
}

module.exports = Board;
