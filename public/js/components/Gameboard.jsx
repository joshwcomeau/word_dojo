var React       = require('react');
var ClassNames  = require('classnames');
var TileColumn  = require('./TileColumn.jsx');
var GameActions = require('../actions/GameActions');
var GameStore   = require('../stores/GameStore');

function getState() {
  return {
    board: GameStore.getBoard(),
    word:  GameStore.getWord(),
    submitEnabled: GameStore.getWord().length >= 3
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

  submit: function() {
    GameActions.evaluateWord();
  },

  render: function() {
    console.log(GameStore.getWord().length > 3);

    var tileColumnNodes = _.times(_colCount, function(index) {
      return (<TileColumn key={index} column={index} size={_rowCount} tiles={this.state.board[index]} />);
    }, this);

    var buttonClasses = ClassNames("submit-button", {
      'enabled': this.state.submitEnabled
    });

    return (
      <div className="gameboard">
        { tileColumnNodes }
        <div className="current-word">
          {this.state.word}
        </div>
        <button className={buttonClasses} disabled={!this.state.submitEnabled} onClick={this.submit}>Submit</button>
      </div>
        
    );
  }
});