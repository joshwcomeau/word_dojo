var React       = require('../../libs/react/react-with-addons');
var TileColumn  = require('./TileColumn.jsx');
var GameActions = require('../actions/GameActions');
var GameStore   = require('../stores/GameStore');

function getState() {
  return {
    board: GameStore.getBoard()
  };
}

var _gridSize = 10;

module.exports = React.createClass({

  getInitialState: function() {
    return getState();
  },
  componentWillMount: function() {
    GameActions.initialize(_gridSize);
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
    var tileColumnNodes = _.times(_gridSize, function(index) {
      return (<TileColumn key={index} column={index} size={_gridSize} tiles={this.state.board[index]} />);
    }, this);

    return (
      <div className="gameboard">
          { tileColumnNodes }
      </div>
    );
  }
});