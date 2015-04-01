// Neighbors
// A utility for determining whether two tiles are neighbors, generating
// an array of all the tile's neighbors, seeing if the given cell is neighbors
// with any of our current word tiles, etc.
//
// See: http://www.redblobgames.com/grids/hexagons/

var Neighbors = {
  areNeighbors: function(t1, t2) {

  },

  getNeighbors: function(col, row, board) {
    var neighbors = [];

    if ( col & 1 ) {
      if ( board[col+1] ) {
        neighbors.push(board[col+1][row+1]);
        neighbors.push(board[col+1][row]);
      }
      if ( board[col-1] ) {
        neighbors.push(board[col-1][row+1]);
        neighbors.push(board[col-1][row]);
      }
    } else {
      if ( board[col+1] ) {
        neighbors.push(board[col+1][row-1]);
        neighbors.push(board[col+1][row]);
      }
      if ( board[col-1] ) {
        neighbors.push(board[col-1][row-1]);
        neighbors.push(board[col-1][row]);
      }
    }

    neighbors.push(board[col][row+1]);
    neighbors.push(board[col][row-1]);

    // remove undefined values
    return _.filter(neighbors, function(n) { return n });
  }
};

module.exports = Neighbors;
