var React       = require('react/addons');
var ClassNames  = require('classnames');
var Timer       = require('./Timer.jsx');
var GameActions = require('../actions/GameActions');
var GameStore   = require('../stores/GameStore');

function getState() {
  return {
    submitEnabled: GameStore.getWord().length >= 3
  };
}


module.exports = React.createClass({
  submit: function() {
    GameActions.evaluateWord();
  },

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
    var buttonClasses = ClassNames("submit-button", {
      'enabled': this.state.submitEnabled
    });

    return (
      <div className="sidebar">        
        <Timer />
        <button className={buttonClasses} disabled={!this.state.submitEnabled} onClick={this.submit}>Submit</button>

      </div>
    );
  }
});