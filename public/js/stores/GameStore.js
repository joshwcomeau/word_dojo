// GameStore.
// Deals with scorekeeping, move validations, timing, etc.
var EventEmitter        = require('events').EventEmitter;
var AppDispatcher       = require('../core/AppDispatcher'); 
var AppConstants        = require('../constants/AppConstants'); 
var MoveConstants       = require('../constants/MoveConstants'); 
var LetterGenerator     = require('../utils/LetterGenerator'); 
var CoordinateConverter = require('../utils/CoordinateConverter'); 
var Neighbors           = require('../utils/Neighbors'); 
var WordChecker         = require('../utils/WordChecker');
    

var _score  = 0;
var _moves  = 0;
var _time   = 0;

var _board  = [];
var _active = []; // Holds currently-activated cells
var _currentWord = "";

var _recentMoveState = null;

var GAME_LENGTH = 180;

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

function setAllToInactive() {
  _active = [];
  _currentWord = "";

  _board.forEach(function(column, columnIndex) {
    column.forEach(function(tile, rowIndex) {
      
      _board[columnIndex][rowIndex] = {
        letter: tile.letter,
        active: false
      };
    });
  });
}

function clickTile(column, row) {
  var clickedTile = _board[column][row];
  var neighbors   = Neighbors.getNeighbors(column, row, _board);

  if ( clickedTile.active ) {

    // If we're in the process of building a word, we're only allowed to deactivate
    // the last letter. If we click on any other active tile, we reset the board.
    if ( clickedTile !== _active[_active.length-1] ) {
      _recentMoveState = MoveConstants.WORD_DEACTIVATED;
      setAllToInactive();
    } else {
      _recentMoveState = MoveConstants.TILE_DEACTIVATED;

      var newTile = {
        letter: clickedTile.letter,
        active: false
      };

      _board[column][row] = newTile;

      // Remove it from our _active array
      _active.splice(_active.indexOf(clickedTile), 1);

      // Remove the letter from our _currentWord
      _currentWord = _currentWord.substr(0, _currentWord.length-1);
    }


  } else {

    // The tile we just clicked is not active. We need to activate it,
    // but we also need to DEactivate any active tiles that aren't neighboring this one.
    if ( _active.length && _.intersection(neighbors, _active).length === 0 ) {
      _recentMoveState = MoveConstants.NEW_WORD_STARTED;
      setAllToInactive();
    } else {
      _recentMoveState = MoveConstants.TILE_ACTIVATED;
    }

    var newTile = {
      letter: clickedTile.letter,
      active: true
    };

    _board[column][row] = newTile;
    
    _active.push(newTile);
    _currentWord += _board[column][row].letter;

  }
}

function evaluateWord() {
  var validWord = WordChecker.validateWord(_currentWord);

  if ( validWord ) {
    var newLetter;

    // Remove all active letters from _board, replace them with new letters
    _board.forEach(function(column) {
      column.forEach(function(tile) {
        if ( tile.active ) {
          newLetter = {
            letter: LetterGenerator.generate(1)[0],
            active: false
          };
          column.splice(column.indexOf(tile), 1);
          column.unshift(newLetter);
        }
      });
    });

    _recentMoveState = MoveConstants.WORD_ACCEPTED;
  } else {
    _recentMoveState = MoveConstants.WORD_REJECTED;
  }

  // Whether the word was valid or not, we need to deactivate all the letters.
  setAllToInactive();
}

var GameStore = _.extend({}, EventEmitter.prototype, {
  // Getters
  getScore: function() { return _score;       },
  getMoves: function() { return _moves;       },
  getTime:  function() { return _time;        },
  getBoard: function() { return _board;       },
  getWord:  function() { return _currentWord; },

  getRecentMove: function() { return _recentMoveState; },

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
    
    case AppConstants.EVALUATE_WORD:
      evaluateWord();
      GameStore.emitChange();
      break;



  }

});


module.exports = GameStore;
