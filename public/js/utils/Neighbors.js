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
    // If it's odd

    return col & 1 ? 
    [         // Odd column neighbors
      board[col+1][row+1],
      board[col+1][row],
      board[col][row-1],
      board[col-1][row],
      board[col-1][row+1],
      board[col][row+1]
    ] : [     // Even column neighbors
      board[col+1][row],
      board[col+1][row-1],
      board[col][row-1],
      board[col-1][row-1],
      board[col-1][row],
      board[col][row+1]
    ];
  }
};

module.exports = Neighbors;
