jest.dontMock('../GameStore');
jest.dontMock('../../constants/AppConstants');
jest.dontMock('object-assign');
jest.dontMock('lodash');
jest.dontMock('jquery');

var _ = require('lodash');
var $ = require('jquery');

describe('GameStore', function() {
  var AppConstants = require('../../constants/AppConstants');
  var AppDispatcher, GameStore, callback;

  console.log(require('../GameStore'));

  var actionInitialize = {
    type: AppConstants.INITIALIZE,
    col: 11,
    row: 7
  };

  beforeEach(function() {
    AppDispatcher = require('../../dispatcher/AppDispatcher');
    GameStore = require('../GameStore');
    callback = MyDispatcher.register.mock.calls[0][0];
  });

  it('registers a callback with the dispatcher', function() {
    expect(AppDispatcher.register.mocks.calls.length).toBe(1);
  });
});