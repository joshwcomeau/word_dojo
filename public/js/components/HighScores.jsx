var React       = require('react');
var ClassNames  = require('classnames');
var GameActions = require('../actions/GameActions');
var GameStore   = require('../stores/GameStore');

function getState() {
  return {
    highScores: GameStore.getHighScores()
  };
}

module.exports = React.createClass({

  getInitialState: function() {
    return getState();
  },

  _onChange: function() {
    this.setState(getState());
  },  

  render: function() {
    // var tileColumnNodes = _.times(_colCount, function(index) {
    //   return (<TileColumn key={index} column={index} size={_rowCount} tiles={this.state.board[index]} />);
    // }, this);

    return (
      <div className="high-scores-wrapper">
        <div className="high-scores-container">
          <h2>Game Over</h2>
        </div>
      </div>
        
    );
  }
});