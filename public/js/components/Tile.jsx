var React       = require('../../libs/react/react-with-addons');
var GameActions = require('../actions/GameActions');
var GameStore   = require('../stores/GameStore');
var classNames  = require('classNames');

function getState(col, row) {
  console.log("getting state")
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

  shouldComponentUpdate: function() {
    return false;
  },

  render: function() {
    console.log("Rendering tile!")
    var tileClasses = classNames('tile', {
      "active": this.props.tile.get("active")
    });

    return (
      <div className={tileClasses} onClick={this.clickLetter}>
        {this.props.tile.get("letter")}
      </div>
    );
  }
});