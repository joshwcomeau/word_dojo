var React         = require('react');
var GameActions   = require('../actions/GameActions');
var MoveConstants = require('../constants/MoveConstants');
var GameStore     = require('../stores/GameStore');
var classNames    = require('classNames');


module.exports  = React.createClass({

  getInitialState: function() {
    return {
      justDeactivated: false,
      justAccepted:    false
    }
  },
  componentWillReceiveProps: function(nextProps) {
    var moveState = GameStore.getRecentMove();

    // If we're de-activating this tile
    if ( this.props.tile.active === true && nextProps.tile.active === false ) {
      if ( moveState === MoveConstants.WORD_REJECTED ) {
        // We submitted a phony word, and now we want to display red letters
        this.setState({
          justDeactivated: true
        });
      } else if ( moveState === MoveConstants.WORD_ACCEPTED ) {
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