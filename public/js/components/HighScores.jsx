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
    // this.firebaseRef.on("child_added", function(dataSnapshot) {
    //   this.items.push(dataSnapshot.val());
    //   this.setState({
    //     items: this.items
    //   });
    // }.bind(this));
  },

  componentDidMount: function() {
  },

  submitScore: function() {

  },
  render: function() {
    // We need to iterate through our scores and, if our score is higher than one of them, 
    // 'insert' the custom user score holder. Bit messy, but it'll work for a first-pass.

    var currentScore    = GameStore.getScore(); 
    var scoreArray      = this.state.scores.slice(0).sort(function(a, b) { 
      return a.score >= b.score ? 1 : -1
    });

    if ( scoreArray.length && currentScore > scoreArray[0].score ) {
      var newScoreIndex;

      scoreArray.forEach(function(scoreItem, index) {
        if ( scoreItem.score > currentScore && !newScoreIndex) {
          newScoreIndex = index;
        }
      });

      scoreArray.splice(newScoreIndex, 0, {
        type: 'current_user_score',
        name: '',
        score: currentScore
      });

    }

    var showingUnderscore = true;
    console.log("mounted", document.getElementById("name-input"));

    
    interval = window.setInterval(function() {
      if ( document.getElementById("name-input") ) {
        console.log(showingUnderscore);
        document.getElementById("name-input").placeholder = showingUnderscore ? "Enter Name_" : "Enter Name";
        showingUnderscore = !showingUnderscore;
      }
    }, 500); 

    var highScoreNodes  = scoreArray.map(function(scoreItem, index) {
      if ( scoreItem.type === 'current_user_score' ) {
        return (
          <div className="high-score-row new-score" key={index}>
            <span className="rank">{index+1}</span>
            <span className="name"><input type="text" className="name-input" id="name-input" defaultValue={this.state.name} /></span>
            <span className="score">{scoreItem.score}</span>
            <button className="submit-score">Submit</button>
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