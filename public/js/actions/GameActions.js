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
  }
};