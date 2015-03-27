// FlashMessageStore.
// Holds alerts and notices.
var EventEmitter        = require('events').EventEmitter;
var AppDispatcher       = require('../core/AppDispatcher'); 
var AppConstants        = require('../constants/AppConstants'); 
var MoveConstants       = require('../constants/MoveConstants'); 
    

var _message        = null,
    _display_time   = null,
    MESSAGE_LENGTH  = 1000 ;

function setFlashMessage(head, info, msgType) {
  _message = {
    head: head,
    info: info,
    msgType: msgType
  };

  window.clearTimeout(_display_time);

  _display_time = window.setTimeout(function() {
    clearFlashMessage();
  }, MESSAGE_LENGTH);
}

function clearFlashMessage() {
  _message = null;
  FlashMessageStore.emitChange();
}

var FlashMessageStore = _.extend({}, EventEmitter.prototype, {
  // Getters
  getFlashMessage: function() { return _message; },

  // Default store methods
  emitChange: function() { this.emit('change'); },
  addChangeListener: function(callback) { this.on('change', callback); },
  removeChangeListener: function(callback) { this.removeListener('change', callback); }

});

AppDispatcher.register(function(action) {
  switch (action.type) {
    case AppConstants.SET_FLASH_MESSAGE:
      setFlashMessage(action.head, action.info, action.msgType);
      FlashMessageStore.emitChange();
      break;

    case AppConstants.CLEAR_FLASH_MESSAGE:
      clearFlashMessage();
      // Change is emitted in clearFlashMessage().
      break;
  }

});


module.exports = FlashMessageStore;
