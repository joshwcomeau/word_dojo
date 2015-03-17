var React       = require('../../libs/react/react-with-addons');
var GameActions = require('../actions/GameActions');
var GameStore   = require('../stores/GameStore');

function getState(col, row) {
    console.log('getting state of ', col, row, GameStore.isActiveTile(col, row))
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
    var tileClasses = React.addons.classSet({
      "tile": true,
      "active": this.state.active
    });

    return (
      <div className={tileClasses} onClick={this.clickLetter}>
        {this.props.tile ? this.props.tile.letter : null}
      </div>
    );
  }
});