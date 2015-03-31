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
var ScoreCalculator     = require('../utils/ScoreCalculator');
    

var _score            = 0;
var _moves            = 0;
var _time             = 0;
var _board            = [];
var _active           = []; 
var _currentWord      = "";
var _completedWords   = [];
var _recentMoveState  = null;
var _playerName       = null;

var _gameActive       = false;
var _gameOver         = false;

var GAME_LENGTH = 120;

function resetBoard(col, row) {
  var column, letters, letter;

  if ( _gameOver ) {
    _score            = 0;
    _moves            = 0;
    _time             = 0;
    _board            = [];
    _active           = []; 
    _currentWord      = "";
    _completedWords   = [];
    _recentMoveState  = null;
    _gameOver         = false;
  }
  
  _.times(col, function(column_index) {
    column = [];
    letters = LetterGenerator.generate(row)
    letters.forEach(function(l) {
      column.push(l);
    });

    _board.push(column);
    
  });
}

function setAllToInactive() {
  _active = [];
  _currentWord = "";

  _board.forEach(function(column, columnIndex) {
    column.forEach(function(tile, rowIndex) {
      
      // Replace me with Object.create
      _board[columnIndex][rowIndex] = Object.create(tile);
      _board[columnIndex][rowIndex].active =  false;
      // {
      //   letter:   tile.letter,
      //   special:  tile.special,
      //   active:   false
      // };
    });
  });
}

function startGame() {
  _gameActive = true;
  _gameOver   = false;
}

function submitHighScore(name) {
  _playerName = name;
}

function clickTile(column, row) {
  var newTile;
  var clickedTile = _board[column][row];
  var neighbors   = Neighbors.getNeighbors(column, row, _board);

  if ( !_gameActive ) {
    startGame();
  }

  if ( clickedTile.active ) {

    // If we're in the process of building a word, we're only allowed to deactivate
    // the last letter. If we click on any other active tile, we reset the board.
    if ( clickedTile !== _active[_active.length-1] ) {
      _recentMoveState = MoveConstants.WORD_DEACTIVATED;
      setAllToInactive();
    } else {
      _recentMoveState = MoveConstants.TILE_DEACTIVATED;

      newTile = Object.create(clickedTile);
      newTile.active = false;

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

    newTile = Object.create(clickedTile)
    newTile.active = true;

    _board[column][row] = newTile;
    
    _active.push(newTile);
    _currentWord += _board[column][row].letter;

  }
}

function resetWord() {
  _recentMoveState = MoveConstants.WORD_REJECTED;
  setAllToInactive();
}

function evaluateWord() {
  // Start by finding the optimal word, if wildcards are involved. 
  var validWord = WordChecker.validateWord(_active, _currentWord);

  console.log(validWord);

  if ( validWord ) {
    var newLetter, wordScore;

    _currentWord = validWord;

    // Add it to score
    wordScore = ScoreCalculator.calculate(_currentWord);
    _score += wordScore;
    _completedWords.push({
      word:  _currentWord,
      score: wordScore
    });

    // Remove all active letters from _board, replace them with new letters
    _board.forEach(function(column) {
      column.forEach(function(tile) {
        if ( tile.active ) {
          newLetter = LetterGenerator.generate(1)[0];
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

function endGame() {
  setAllToInactive();
  _gameOver = true;

  // Push this score to Firebase


}

var GameStore = _.extend({}, EventEmitter.prototype, {
  // Getters
  getScore:       function() { return _score;           },
  getMoves:       function() { return _moves;           },
  getTime:        function() { return _time;            },
  getBoard:       function() { return _board;           },
  getWord:        function() { return _currentWord;     },
  getWords:       function() { return _completedWords;  },
  getActives:     function() { return _active;          },
  getLength:      function() { return GAME_LENGTH;      },
  getRecentMove:  function() { return _recentMoveState; },
  getGameOver:    function() { return _gameOver;        },
  getGameActive:  function() { return _gameActive;      },
  getPlayerName:  function() { return _playerName;      },

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

    case AppConstants.RESET_WORD:
      resetWord();
      GameStore.emitChange();
      break;

    case AppConstants.SUBMIT_HIGH_SCORE:
      submitHighScore(action.name);
      GameStore.emitChange();
      break;      

    case AppConstants.TIME_UP:
      endGame();
      GameStore.emitChange();
      break;


  }

});


module.exports = GameStore;
