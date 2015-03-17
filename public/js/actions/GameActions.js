var AppDispatcher = require('../core/AppDispatcher');
var AppConstants  = require('../constants/AppConstants');

module.exports = {
  initialize: function(size) {    
    AppDispatcher.dispatch({
      type: AppConstants.INITIALIZE,
      size: size
    });
  },
  clickLetter: function(letter) {    
    AppDispatcher.dispatch({
      type:   AppConstants.CLICK_LETTER,
      letter: letter
    });
  }
};