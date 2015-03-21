// GameStore.
// Deals with scorekeeping, move validations, timing, etc.
var EventEmitter    = require('events').EventEmitter;
var AppDispatcher   = require('../core/AppDispatcher'); 
var AppConstants    = require('../constants/AppConstants'); 
var LetterGenerator = require('../utils/LetterGenerator'); 
    

var _score  = 0;
var _moves  = 0;
var _time   = 0;

var _board  = [];
var _active = []; // Holds currently-activated cells
var _currentWord = "";

function resetBoard(col, row) {
  var column, letters, letter;

  _.times(col, function(column_index) {
    column = [];
    letters = LetterGenerator.generate(row)
    letters.forEach(function(l) {
      column.push({
        letter: l,
        active: false
      });
    });

    _board.push(column);
    
  })
}

function isConnectedToWord(clickedTile) {
  // Ok, the idea here is first we need to check if two given tiles are touching or not.
  // THen we need to iterate through all active tiles, and see 
}

function clickTile(column, row) {
  var clickedTile = _board[column][row];

  if ( clickedTile.active ) {
    // Deactivate this letter
    _board[column][row] = {
      letter: clickedTile.letter,
      active: false
    };

    _active--;
    _currentWord = _currentWord.substr(0, _currentWord.length-1);
  } else {
    _board[column][row] = {
      letter: clickedTile.letter,
      active: true
    };
    
    _active++;
    _currentWord += _board[column][row].letter;

    // Figure out if we need to de-activate any other cells (if we've clicked a new area)
    if ( _active > 1 ) {


    }

  }

  console.log(_currentWord);
}

var GameStore = _.extend({}, EventEmitter.prototype, {
  // Getters
  getScore: function() { return _score; },
  getMoves: function() { return _moves; },
  getTime:  function() { return _time;  },
  getBoard: function() { return _board; },

  isActiveTile: function(column, row) {
    return _board[column][row] ? _board[column][row].active : false;
  },

  // Default store methods
  emitChange: function() { this.emit('change'); },
  addChangeListener: function(callback) { this.on('change', callback); },
  removeChangeListener: function(callback) { this.removeListener('change', callback); }

});

AppDispatcher.register(function(action) {
  switch (action.type) {
    case AppConstants.INITIALIZE:
      resetBoard(action.col, action.row);
      GameStore.emitChange();
      break;

    case AppConstants.CLICK_LETTER:
      clickTile(action.column, action.row);
      GameStore.emitChange();
      break;

  }

});


module.exports = GameStore;
