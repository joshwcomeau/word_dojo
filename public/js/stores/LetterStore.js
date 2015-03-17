// LetterStore.
// Called by Tile components to generate new letters. Handles proper distribution of appropriate letters,
// 'special' letters, etc.

var EventEmitter  = require('events').EventEmitter;
var AppDispatcher = require('../core/AppDispatcher'); 
var AppConstants  = require('../constants/AppConstants'); 


var _generatedLetters = [];
var _letters          = {
  vowels:     'AEIOUY',                 // Damn straight, Y is a vowel.
  consonants: 'BCDFGHJKLMNPQRSTVWXZ'
};


var generateLetter = function() {
  // For now, let's keep it simple: 50% chance to get a vowel, 50% to get a consonant.
  // Later I will need to figure out a smarter way, so that letters like R show up more
  // than letters like X or Z.
  var newLetter = Math.random() < 0.5 ? _.sample(_letters.vowels) : _.sample(_letters.consonants);

  _generatedLetters.push(newLetter);
  return newLetter;
};

var LetterStore = _.extend({}, EventEmitter.prototype, {
  // Getters
  getNewLetter: function() { return generateLetter(); },

  // Default store methods
  emitChange: function() { this.emit('change'); },
  addChangeListener: function(callback) { this.on('change', callback); },
  removeChangeListener: function(callback) { this.removeListener('change', callback); }

});

AppDispatcher.register(function(action) {
  switch (action.type) {
    case AppConstants.CLICK_LETTER:

  }

});


module.exports = LetterStore;
