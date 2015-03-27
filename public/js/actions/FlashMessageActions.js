var AppDispatcher = require('../core/AppDispatcher');
var AppConstants  = require('../constants/AppConstants');

module.exports = {
  setFlashMessage: function(head, info, msgType) {    
    AppDispatcher.dispatch({
      type:     AppConstants.SET_FLASH_MESSAGE,
      head:     head,
      info:     info,
      msgType:  msgType
    });
  },
  clearFlashMessage: function() {    
    AppDispatcher.dispatch({
      type:   AppConstants.CLEAR_FLASH_MESSAGE
    });
  }
};