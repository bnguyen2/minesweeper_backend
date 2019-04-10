const Board = require('../models/Board');

const gameStorage = {};

module.exports = {
  getGame(req, res, next) {
    res.status(200).json(gameStorage);
  },

  createGame(req, res, next) {
    const { rows, cols, mines } = req.body;

    const GameBoard = new Board(rows, cols, mines);

    GameBoard.initBoard();

    gameStorage.data = GameBoard;

    res.status(200).json(GameBoard.playerView);
    next();
  },

  reveal(req, res, next) {
    const { x, y } = req.body;

    const GameBoard = gameStorage.data;

    if (GameBoard.board[x][y].isRevealed === true) {
      return res.json('Already Revealed, try different coordinate');
    }

    if (GameBoard.board[x][y].isMine === true) {
      GameBoard.revealAll();

      return res.json({ status: 'BOOM! YOU LOSE!', board: GameBoard.board });
    }

    let updatedBoard = GameBoard.board;
    let updatedPlayerView = GameBoard.playerView;

    updatedBoard[x][y].isRevealed = true;
    updatedBoard[x][y].isFlagged = false;

    if (!updatedBoard[x][y].isEmpty) {
      updatedBoard = GameBoard.floodFill(updatedBoard, x, y);
    }

    if (GameBoard.getWinner(updatedBoard).length === GameBoard.mines) {
      GameBoard.revealAll();
      return res.json('You win!');
    }

    updatedPlayerView[x][y] = updatedBoard[x][y];

    GameBoard.board = updatedBoard;
    GameBoard.playerView = updatedPlayerView;

    res.status(200).json(GameBoard.playerView);
    next();
  }
};
