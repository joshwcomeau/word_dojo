var React       = require('react');
var GameActions = require('../actions/GameActions');
var GameStore   = require('../stores/GameStore');
var classNames  = require('classNames');


module.exports  = React.createClass({

  getInitialState: function() {
    return {
      justDeactivated: false,
      justAccepted:    false
    }
  },
  componentWillReceiveProps: function(nextProps) {
    // console.log("next:", nextProps.tile.active);
    // console.log("current:", this.props.tile.active)
    // If we're de-activating this tile
    if ( this.props.tile.active === true && nextProps.tile.active === false ) {
      if ( nextProps.tile.letter === this.props.tile.letter ) {
        // The letter was just deactivated, by a wrong word submission or a click on
        // non-neighboring tiles.
        this.setState({
          justDeactivated: true
        });
      } else {
        // The word was accepted, and now we have new tiles in their place.
        this.setState({
          justAccepted: true
        })
      }
      
    } else {
      this.setState({
        justDeactivated: false,
        justAccepted:    false
      }); 
    }
  },

  clickLetter: function(e) {
    // Send the event along to our store.
    GameActions.clickLetter(this.props.column, this.props.row);
  },

  render: function() {
    var tileClasses = classNames('tile', {
      "active":   this.props.tile.active,
      "deactive": this.state.justDeactivated,
      "accepted": this.state.justAccepted
    });

    return (
      <div className={tileClasses} onClick={this.clickLetter} key={this.props.tile.letter}>
        {this.props.tile.letter}
      </div>
    );
  }
});