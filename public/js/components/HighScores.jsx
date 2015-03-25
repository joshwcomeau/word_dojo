var React       = require('react');
var ClassNames  = require('classnames');
var GameActions = require('../actions/GameActions');
var GameStore   = require('../stores/GameStore');

function getState() {
  return {
    scores: [],
    name:   GameStore.getPlayerName()
  };
}

function formatScores(scores) {

}


var interval;

module.exports = React.createClass({

  mixins: [ReactFireMixin],

  getInitialState: function() {
    return getState();
  },

  componentWillMount: function() {
    this.firebaseRef = new Firebase("https://word-dojo.firebaseio.com/scores/");
    this.bindAsArray(this.firebaseRef, "scores");
  },

  componentDidMount: function() {
    // Flash the underscore, to emulate an old terminal window.
    var showingUnderscore = true;
    interval = window.setInterval(function() {
      if ( document.getElementById("name-input") ) {
        document.getElementById("name-input").placeholder = showingUnderscore ? "Enter Name_" : "Enter Name";
        showingUnderscore = !showingUnderscore;
      }
    }, 500); 
  },

  componentWillUnmount: function() {
    window.clearTimeout(interval);
  },

  submitScore: function() {
    var playerName = this.refs.playername.getDOMNode().value,
        uniqueId    = Date.now(),
        newScoreObj = {};

    // Right now, this only updates the _playerName variable in GameStore.
    GameActions.submitHighScore(playerName);

    this.firebaseRef.push({
      name:  playerName,
      score: GameStore.getScore()
    });

    $(".new-score").hide();
  },
  buildScoresArray: function() {
    var currentScore  = GameStore.getScore(); 

    // Sort it from lowest to highest
    var scoreArray = this.state.scores.slice(0).sort(function(a, b) { 
      return a.score >= b.score ? 1 : -1
    });

    if ( scoreArray.length && currentScore > scoreArray[0].score ) {
      // Find the index of the first score greater than the user's.
      var newScoreIndex = _.findIndex(scoreArray, function(scoreItem) {
        return scoreItem.score > currentScore;
      })

      // Shove it in the score array, with a special type so the iterator
      // knows it's not a regular score item.
      scoreArray.splice(newScoreIndex, 0, {
        type: 'current_user_score',
        name: '',
        score: currentScore
      });
    } 

    return scoreArray.reverse();
  },

  render: function() {
    // We need to iterate through our scores and, if our score is higher than one of them, 
    // 'insert' the custom user score holder. Bit messy, but it'll work for a first-pass.
    var scoreArray      = this.buildScoresArray();

    var highScoreNodes  = scoreArray.map(function(scoreItem, index) {
      if ( scoreItem.type === 'current_user_score' ) {
        return (
          <div className="high-score-row new-score" key={index}>
            <span className="rank">{index+1}</span>
            <span className="name"><input type="text" className="name-input" id="name-input" ref="playername" defaultValue={this.state.name} /></span>
            <span className="score">{scoreItem.score}</span>
            <button className="submit-score" onClick={this.submitScore}>Submit</button>
          </div>
        );
      } else {
        return (
          <div className="high-score-row" key={index}>
            <span className="rank">{index+1}</span>
            <span className="name">{scoreItem.name}</span>
            <span className="score">{scoreItem.score}</span>
          </div>
        );  
      }
      
    }.bind(this));

    return (
      <div className="high-scores-wrapper">
        <div className="high-scores-container">
          <h2>Game Over</h2>
          <div className="high-scores-table">
            {highScoreNodes}
          </div>
        </div>
      </div>
        
    );
  }
});