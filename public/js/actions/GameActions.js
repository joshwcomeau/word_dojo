var AppDispatcher = require('../core/AppDispatcher');
var AppConstants  = require('../constants/AppConstants');

module.exports = {
  clickLetter: function(letter) {    
    AppDispatcher.dispatch({
      type:   AppConstants.CLICK_LETTER,
      letter: letter
    });
  }
};