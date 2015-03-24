var React       = require('react/addons');
var ClassNames  = require('classnames');
var Timer       = require('./Timer.jsx');
var Score       = require('./Score.jsx');
var GameActions = require('../actions/GameActions');
var GameStore   = require('../stores/GameStore');

function getState() {
  return {
    words: GameStore.getWords()
  };
}


module.exports = React.createClass({
  getInitialState: function() {
    return getState();
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
    console.log(this.state.words);
    var wordNodes = _.map(this.state.words, function(word) {
      return (<li className="word">{word.word} <span className="word-score">{word.score}</span></li>);
    }, this);

    return (
      <div className="sidebar">        
        <Timer />
        <Score />

        <ul className="completed-words">
          {wordNodes}
        </ul>
      </div>
    );
  }
});