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

var ReactCSSTransitionGroup = React.addons.CSSTransitionGroup;

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
    
    var wordNodes = _.map(this.state.words, function(word, index) {
      return (<li className="word" key={index}>{word.word} <span className="word-score">{word.score}</span></li>);
    }, this).slice(-8).reverse();

    return (
      <div className="sidebar">        
        <Timer />
        <Score />

        <ul className="completed-words">
          <ReactCSSTransitionGroup transitionName="side-words">
            {wordNodes}
          </ReactCSSTransitionGroup>
        </ul>
      </div>
    );
  }
});