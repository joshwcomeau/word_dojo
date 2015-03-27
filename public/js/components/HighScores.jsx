var React       = require('react');
var ClassNames  = require('classnames');
var GameActions = require('../actions/GameActions');
var GameStore   = require('../stores/GameStore');

function getState() {
  return {
    scores: [],
    scoreSubmitted: false,
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

    this.setState({
      scoreSubmitted: true
    });
  },

  buildNewScoreObject: function(currentScore) {
    return {
      type: 'current_user_score',
      name: '',
      score: currentScore
    };
  },

  buildScoresArray: function() {
    var currentScore, scoreArray, newScoreIndex, newScore, lowestScore;
    var numOfHighScores = 8;
    
    currentScore  = GameStore.getScore(); 

    // Sort it from highest to lowest, keep the first 10
    scoreArray = this.state.scores.sort(function(a, b) { 
      return a.score < b.score ? 1 : -1;
    }).slice(0, numOfHighScores);


    newScore = this.buildNewScoreObject(currentScore);

    // If we've already submitted a score (this is a re-render), or we haven't solved any words (no '0' high scores)
    if (this.state.scoreSubmitted || currentScore === 0) return scoreArray;

    // This is the first-ever high score! We can just shove our new score into the empty array and call it a day.
    if ( scoreArray.length === 0 ) {
      scoreArray.push(newScore);
      return scoreArray;
    }

    lowestScore = _.last(scoreArray).score;

    // If there are empty spaces on the high score board, OR if our score is highest than the lowest score,
    // we need to add our newScore object somewhere in the array.
    if ( currentScore > lowestScore || scoreArray.length < numOfHighScores ) {
      
      // Find the index of the first score less than the user's
      newScoreIndex = _.findIndex(scoreArray, function(scoreItem) {
        return scoreItem.score < currentScore;
      });

      if ( newScoreIndex >= 0 ) {
        // Our new score is somewhere in-between or on top of the other scores. Add it in the appropriate place.
        scoreArray.splice(newScoreIndex, 0, newScore);
        // Remove the lowest score; we've bumped it from the equation
        console.log(scoreArray[scoreArray.length-1])
        scoreArray.splice(-1, 1);
        console.log(scoreArray[scoreArray.length-1])


      } else {
        // This is the rare edge case when there are less than 10 scores on the board, 
        // and we're lower than all of them.
        scoreArray.push(newScore)
      }
    }

    return scoreArray;
  },

  render: function() {
    // We need to iterate through our scores and, if our score is higher than one of them, 
    // 'insert' the custom user score holder. Bit messy, but it'll work for a first-pass.
    var scoreArray      = this.buildScoresArray();
    var highScoreNodes  = scoreArray.map(function(scoreItem, index) {

      if ( scoreItem.type === 'current_user_score' ) {
        return (
          <div className="high-score-row new-score" id="new-score" key={index}>
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