function getAdjacentCells(board, x, y) {
  let res = [];

  // check top
  if (x > 0) {
    res.push(board[x - 1][y]);
  }

  // check right
  if (y < board[0].length - 1) {
    res.push(board[x][y + 1]);
  }

  // check bottom;
  if (x < board.length - 1) {
    res.push(board[x + 1][y]);
  }

  // check left
  if (y > 0) {
    res.push(board[x][y - 1]);
  }

  // check topLeft
  if (x > 0 && y > 0) {
    res.push(board[x - 1][y - 1]);
  }

  // check topRight
  if (x > 0 && y < board[0].length - 1) {
    res.push(board[x - 1][y + 1]);
  }

  // check bottomRight
  if (x < board.length - 1 && y < board[0].length - 1) {
    res.push(board[x + 1][y + 1]);
  }

  // check bottomLeft
  if (x < board.length - 1 && y > 0) {
    res.push(board[x + 1][y - 1]);
  }

  return res;
}

module.exports = getAdjacentCells;
