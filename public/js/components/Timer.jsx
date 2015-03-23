var React       = require('react/addons');
var ClassNames  = require('classnames');
var GameActions = require('../actions/GameActions');
var GameStore   = require('../stores/GameStore');

var interval;

module.exports = React.createClass({
  getInitialState: function() {
    return {
      timeRemaining: GameStore.getLength(),
      gameStarted: false,
      gameLength: GameStore.getLength()
    };
  },
  componentDidMount: function() {
    GameStore.addChangeListener(this._onChange);
  },
  componentWillUnmount: function() {
    GameStore.removeChangeListener(this._onChange);
  },
  _onChange: function() {
    // Start the timer
    if ( !this.state.gameStarted ) {
      this.setState({gameStarted: true});
      this.startTimer();  
    }

    // Cancel the interval if the game is over
    if ( GameStore.getGameOver() ) {
      window.clearInterval(interval);
    }
  },

  startTimer: function() {
    var updatedTimeRemaining;
    var startTime = new Date().getTime();
    var _this = this;

    interval = window.setInterval(function() {
      updatedTimeRemaining = (_this.state.gameLength - ((new Date().getTime() - startTime) / 1000)).toFixed(2);

      if ( updatedTimeRemaining <= 0 ) {
        GameActions.timesUp();
        _this.setState({timeRemaining: 0});        
      } else {
        _this.setState({timeRemaining: updatedTimeRemaining});
      }
    }, 75);
  }, 

  render: function() {
    return (
      <div className="timer">        
        {this.state.timeRemaining}

      </div>
    )
  }
});