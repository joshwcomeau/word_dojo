var React       = require('react');
var GameActions = require('../actions/GameActions');
var GameStore   = require('../stores/GameStore');
var classNames  = require('classNames');

function getState(col, row) {
  return {
    active: GameStore.isActiveTile(col, row)
  }
}


module.exports  = React.createClass({

  
  getInitialState: function() {
    return getState(this.props.column, this.props.row);
  },

  clickLetter: function(e) {
    // Send the event along to our store.
    GameActions.clickLetter(this.props.column, this.props.row);
  },

  render: function() {
    var tileClasses = classNames('tile', {
      "active": this.props.tile.active
    });

    return (
      <div className={tileClasses} onClick={this.clickLetter}>
        {this.props.tile.letter}
      </div>
    );
  }
});