var React       = require('../../libs/react/react-with-addons');
var TileColumn  = require('./TileColumn.jsx');
var GameActions = require('../actions/GameActions');
var GameStore   = require('../stores/GameStore');

function getState() {
  return {
    board: GameStore.getBoard()
  };
}

module.exports = React.createClass({

  getInitialState: function() {
    return getState();
  },
  componentWillMount: function() {
    GameActions.initialize(10);
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
    console.log("Render board")
    var tileColumnNodes = _.times(10, function(index) {
      return (<TileColumn key={index} column={index} tiles={this.state.board[index]} />);
    }, this);

    return (
      <div className="gameboard">
          { tileColumnNodes }
      </div>
    );
  }
});