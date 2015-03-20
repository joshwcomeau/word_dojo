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
var _active = 0; // Holds the number of active cells
var _currentWord = "";

function resetBoard(size) {
  var column, letters, letter;

  _.times(size, function(column_index) {
    column = [];
    letters = LetterGenerator.generate(size)
    letters.forEach(function(l) {
      column.push({
        letter: l,
        active: false
      });
    });

    _board.push(column);
    
  })
}

function clickTile(column, row) {
  if ( _board[column][row].active ) {
    // Deactivate this letter
    _board[column][row].active = false;
    _active--;
    _currentWord = _currentWord.substr(0, _currentWord.length-1);
  } else {
    _board[column][row].active = true;
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
    console.log("active tile: ", _board[column][row]);
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
      resetBoard(action.size);
      GameStore.emitChange();
      break;

    case AppConstants.CLICK_LETTER:
      clickTile(action.column, action.row);
      GameStore.emitChange();
      break;

  }

});


module.exports = GameStore;
