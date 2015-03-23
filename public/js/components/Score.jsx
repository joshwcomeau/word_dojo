var React       = require('react/addons');
var ClassNames  = require('classnames');
var GameActions = require('../actions/GameActions');
var GameStore   = require('../stores/GameStore');



module.exports = React.createClass({
  getInitialState: function() {
    return {
      score: GameStore.getScore()
    };
  },
  componentDidMount: function() {
    GameStore.addChangeListener(this._onChange);
  },
  componentWillUnmount: function() {
    GameStore.removeChangeListener(this._onChange);
  },
  _onChange: function() {
    this.setState({ score: GameStore.getScore() });
  },

  render: function() {
    return (
      <div className="score">        
        {this.state.score}

      </div>
    )
  }
});