var React       = require('react');
var ClassNames  = require('classnames');
var GameActions = require('../actions/GameActions');
var GameStore   = require('../stores/GameStore');

function getState() {
  return {
    scores: []
  };
}

module.exports = React.createClass({

  mixins: [ReactFireMixin],

  getInitialState: function() {
    return getState();
  },

  componentWillMount: function() {
    this.firebaseRef = new Firebase("https://word-dojo.firebaseio.com/scores/");
    this.bindAsArray(this.firebaseRef, "scores");
    // this.firebaseRef.on("child_added", function(dataSnapshot) {
    //   this.items.push(dataSnapshot.val());
    //   this.setState({
    //     items: this.items
    //   });
    // }.bind(this));
  },

  render: function() {
    console.log("HighScore rendered")
    console.log(this.state);
    var highScoreNodes = this.state.scores.map(function(score) {
      return (
        <div className="high-score-row">
          <span className="name">{score.name}</span>
          <span className="score">{score.score}</span>
        </div>
      );
    });

    return (
      <div className="high-scores-wrapper">
        <div className="high-scores-container">
          <h2>Game Over</h2>
          {highScoreNodes}
        </div>
      </div>
        
    );
  }
});