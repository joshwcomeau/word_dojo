var React       = require('react/addons');
var ClassNames  = require('classnames');
var Timer       = require('./Timer.jsx');
var GameActions = require('../actions/GameActions');
var GameStore   = require('../stores/GameStore');

function getState() {
  return {
    
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
    return (
      <div className="sidebar">        
        <Timer />

      </div>
    );
  }
});