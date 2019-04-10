class Cell {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.isMine = false;
    this.isRevealed = false;
    this.isFlagged = false;
    this.isEmpty = false;
    this.neighbor = 0;
  }
}

module.exports = Cell;
