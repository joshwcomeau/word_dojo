var React         = require('react/addons');
var ClassNames    = require('classnames');
var GameActions   = require('../actions/GameActions');
var GameStore     = require('../stores/GameStore');

var FIREBASE_URL  = "https://word-dojo.firebaseio.com/scores/";


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
var NUM_OF_HIGH_SCORES = 8;

module.exports = React.createClass({

  mixins: [ReactFireMixin],

  getInitialState: function() {
    return getState();
  },

  componentWillMount: function() {
    this.firebaseRef = new Firebase(FIREBASE_URL);
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

    window.addEventListener("keypress", this.handleKeypress);

  },

  componentWillUnmount: function() {
    window.clearTimeout(interval);
    window.removeEventListener("keypress", this.handleKeypress);

  },

  clearPlaceholder: function() {
    window.clearTimeout(interval);
    document.getElementById("name-input").placeholder = "";

    // Also, show the submit button.
    document.getElementById("submit-score").className += " shown";
  },

  handleKeypress: function(e) {
    if ( e.which === 13 ) {
      this.submitScore();
    }
  },

  submitScore: function() {
    var playerNode  = this.refs.playername.getDOMNode(),
        playerName  = playerNode.value,
        playerRow   = playerNode.parentNode.parentNode,
        uniqueId    = Date.now(),
        newScoreObj = {};

    // Ensure they've provided a name
    if ( playerName == "" ) {
      playerRow.className += " error";
      
    } else {
      // Right now, this only updates the _playerName variable in GameStore.
      GameActions.submitHighScore(playerName);

      this.firebaseRef.push({
        name:  playerName,
        score: GameStore.getScore()
      });

      this.setState({
        scoreSubmitted: true
      });
    }
  },

  buildNewScoreObject: function(currentScore) {
    return {
      type: 'current_user_score',
      name: '',
      score: currentScore
    };
  },

  getSortedHighScores: function() {
    return this.state.scores.sort(function(a, b) { 
      return a.score < b.score ? 1 : -1;
    }).slice(0, NUM_OF_HIGH_SCORES);
  },

  buildScoresArray: function() {
    var currentScore, scoreArray, newScoreIndex, newScore, lowestScore;
    
    currentScore  = GameStore.getScore(); 
    scoreArray    = this.getSortedHighScores();
    newScore      = this.buildNewScoreObject(currentScore);
    lowestScore   = scoreArray.length === 0 ? null : _.last(scoreArray).score;

    // If we've already submitted a score (this is a re-render), or we haven't solved any words (no '0' high scores)
    if (this.state.scoreSubmitted || currentScore === 0) {
      // do nothing
    }

    // This is the first-ever high score! We can just shove our new score into the empty array and call it a day.
    else if ( scoreArray.length === 0 ) {
      scoreArray.push(newScore);
    }

    //This is the rare edge case when there are less than 10 scores on the board, and we're lower than all of them.
    else if ( scoreArray.length < NUM_OF_HIGH_SCORES && currentScore <= lowestScore ) {
      scoreArray.push(newScore);
    }

    // If there are empty spaces on the high score board, OR if our score is highest than the lowest score,
    // we need to add our newScore object somewhere in the array.
    else if ( currentScore > lowestScore ) {
      
      // Find the index of the first score less than the user's
      newScoreIndex = _.findIndex(scoreArray, function(scoreItem) {
        return scoreItem.score < currentScore;
      });

      // Our new score is somewhere in-between or on top of the other scores. Add it in the appropriate place.
      scoreArray.splice(newScoreIndex, 0, newScore);
      
      // Remove the lowest score if we're over capacity: we've bumped it from the equation
      if ( scoreArray.length > NUM_OF_HIGH_SCORES ) { 
        scoreArray.splice(-1, 1);
      }
    }

    return scoreArray;
  },

  handleRestart: function() {
    GameActions.initialize(this.props.cols, this.props.rows);
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
            <span className="name"><input type="text" className="name-input" id="name-input" ref="playername" defaultValue={this.state.name} onClick={this.clearPlaceholder} /></span>
            <span className="score">{scoreItem.score}</span>
            <button className="submit-score" id="submit-score" onClick={this.submitScore}><i className="fa fa-check"></i></button>
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

    var loadingNode = (
      <div className="high-scores-loading">
        <i className="fa fa-spin fa-cog cog1"></i>
        <i className="fa fa-spin fa-cog cog2"></i>
        <i className="fa fa-spin fa-cog cog3"></i>
      </div>
    );

    return (
      <div className="high-scores-wrapper">
        <div className="high-scores-container">
          <h2>Game Over</h2>
          <div className="high-scores-table">
            { this.state.scores.length ? highScoreNodes : loadingNode }
          </div>
          <button className="restart-button" onClick={this.handleRestart}>Restart Game</button>
        </div>
      </div>
        
    );
  }
});