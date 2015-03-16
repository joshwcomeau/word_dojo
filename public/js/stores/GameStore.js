// GameStore.
// Deals with scorekeeping, move validations, timing, etc.
var EventEmitter  = require('../libs/emitter/EventEmitter'),
    AppDispatcher = require('../core/AppDispatcher'); 
    

var _score = 0;
var _moves = 0;
var _time  = 0;

var GameStore = _.extend({}, EventEmitter.prototype, {
  // Getters
  getScore: function() { return _score; },
  getMoves: function() { return _moves; },
  getTime:  function() { return _time;  },

  // Default store methods
  emitChange: function() { this.emit('change'); },
  addChangeListener: function(callback) { this.on('change', callback); },
  removeChangeListener: function(callback) { this.removeListener('change', callback); }

});

AppDispatcher.register(function(payload) {
  var action = payload.action;

  switch (action.actionType) {
    case AppConstants.SELECT_LETTER:

  }

});


module.exports = GameStore;
