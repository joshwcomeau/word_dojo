var React       = require('react');
var TileColumn  = require('./TileColumn.jsx');
var GameActions = require('../actions/GameActions');
var GameStore   = require('../stores/GameStore');

function getState() {
  return {
    board: GameStore.getBoard(),
    word:  GameStore.getWord(),
  };
}

var _colCount = 11,
    _rowCount = 7;

module.exports = React.createClass({

  getInitialState: function() {
    return getState();
  },
  componentWillMount: function() {
    GameActions.initialize(_colCount, _rowCount);
  },

  componentDidMount: function() {
    GameStore.addChangeListener(this._onChange);
  },
  componentWillUnmount: function() {
    GameStore.removeChangeListener(this._onChange);
  },
  _onChange: function() {
    this.setState(getState());
  },  



  render: function() {
    var tileColumnNodes = _.times(_colCount, function(index) {
      return (<TileColumn key={index} column={index} size={_rowCount} tiles={this.state.board[index]} />);
    }, this);

    return (
      <div className="gameboard-wrapper">
        <div className="gameboard">
          { tileColumnNodes }
        </div>
      </div>
        
    );
  }
});