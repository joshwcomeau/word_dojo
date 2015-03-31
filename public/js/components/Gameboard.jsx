var React               = require('react/addons');
var ClassNames          = require('classnames');
var TileColumn          = require('./TileColumn.jsx');
var HighScores          = require('./HighScores.jsx');
var FlashMessage        = require('./FlashMessage.jsx');
var GameActions         = require('../actions/GameActions');
var GameStore           = require('../stores/GameStore');
var FlashMessageActions = require('../actions/FlashMessageActions');


function getState() {
  return {
    board: GameStore.getBoard(),
    word:  GameStore.getActives(),
    over:  GameStore.getGameOver()
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
    window.addEventListener("keypress", this.handleKeypress);
  },
  componentWillUnmount: function() {
    GameStore.removeChangeListener(this._onChange);
    window.removeEventListener("keypress", this.handleKeypress);

  },
  _onChange: function() {
    this.setState(getState());
  },  

  handleKeypress: function(e) {
    if (!(e.which === 32 || e.which === 13)) return false;

    if ( !this.state.over && this.state.word.length ) {
      if ( this.state.word.length >= 3 ) {
        GameActions.evaluateWord();
      } else {
        GameActions.resetWord();
        FlashMessageActions.setFlashMessage("Too Short", "Minimum 3 characters.", "alert");
      }
    }
  },


  render: function() {
    var tileColumnNodes = _.times(_colCount, function(index) {
      return (<TileColumn key={index} column={index} size={_rowCount} tiles={this.state.board[index]} />);
    }, this);

    return (
      <div className="gameboard-wrapper">
        { this.state.over ? (<HighScores cols={_colCount} rows={_rowCount} />) : null }
        <div className="gameboard">
          { tileColumnNodes }
          <FlashMessage />
        </div>
      </div>
        
    );
  }
});