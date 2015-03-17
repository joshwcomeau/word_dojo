// GameStore.
// Deals with scorekeeping, move validations, timing, etc.
var EventEmitter    = require('events').EventEmitter;
var AppDispatcher   = require('../core/AppDispatcher'); 
var AppConstants    = require('../constants/AppConstants'); 
var LetterGenerator = require('../utils/LetterGenerator'); 
    

var _score = 0;
var _moves = 0;
var _time  = 0;

var _board = [];

function resetBoard(size) {
  var column, letter;

  _.times(size, function(column_index) {
    _board.push( LetterGenerator.generate(size) );
  })
}

var GameStore = _.extend({}, EventEmitter.prototype, {
  // Getters
  getScore: function() { return _score; },
  getMoves: function() { return _moves; },
  getTime:  function() { return _time;  },
  getBoard: function() { return _board; },

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
      GameStore.emitChange();
      break;

  }

});


module.exports = GameStore;
