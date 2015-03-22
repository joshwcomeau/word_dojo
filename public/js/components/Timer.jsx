var React       = require('react/addons');
var ClassNames  = require('classnames');
var GameActions = require('../actions/GameActions');
var GameStore   = require('../stores/GameStore');

function getState() {
  return {
    timeRemaining: 60,
    gameStarted: false
  };
}


module.exports = React.createClass({
  getInitialState: function() {
    return {
      timeRemaining: 60,
      gameStarted: false
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
  },

  startTimer: function() {
    var updatedTimeRemaining;
    var startTime = new Date().getTime();
    var _this = this;

    window.setInterval(function() {
      updatedTimeRemaining = (5 - ((new Date().getTime() - startTime) / 1000)).toFixed(2);

      if ( updatedTimeRemaining <= 0 ) {
        // GameActions.TimesUp()
        _this.setState({timeRemaining: 0});
        window.clearInterval();
      } else {
        _this.setState({timeRemaining: updatedTimeRemaining});
      }
    }, 100)
  }, 

  render: function() {
    return (
      <div className="timer">        
        {this.state.timeRemaining}

      </div>
    )
  }
});