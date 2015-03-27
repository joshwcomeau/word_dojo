var AppDispatcher = require('../core/AppDispatcher');
var AppConstants  = require('../constants/AppConstants');

module.exports = {
  initialize: function(col, row) {    
    AppDispatcher.dispatch({
      type: AppConstants.INITIALIZE,
      col: col,
      row: row
    });
  },
  clickLetter: function(column, row) {    
    AppDispatcher.dispatch({
      type:   AppConstants.CLICK_LETTER,
      column: column,
      row:    row
    });
  },
  evaluateWord: function() {
    AppDispatcher.dispatch({
      type: AppConstants.EVALUATE_WORD
    });
  },
  resetWord: function() {
    AppDispatcher.dispatch({
      type: AppConstants.RESET_WORD
    })
  },
  timesUp: function() {
    AppDispatcher.dispatch({
      type: AppConstants.TIME_UP
    });
  },
  submitHighScore: function(name) {
    AppDispatcher.dispatch({
      type: AppConstants.SUBMIT_HIGH_SCORE,
      name: name
    });
  }
};