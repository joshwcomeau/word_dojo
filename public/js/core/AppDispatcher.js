var flux = require('../libs/flux/dist/Flux');

var AppDispatcher = new flux.Dispatcher();

AppDispatcher.handleAction = function(action) {
  this.dispatch({
    source: 'VIEW_ACTION',
    action: action
  });
};

module.exports = AppDispatcher;

