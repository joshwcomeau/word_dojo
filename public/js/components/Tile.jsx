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

    // If we're de-activating this tile
    if ( this.props.tile.active === true && nextProps.tile.active === false ) {
      switch (GameStore.getRecentMove()) {
        case MoveConstants.WORD_REJECTED:
          this.setState({ justDeactivated:  true });
          break;

        case MoveConstants.WORD_ACCEPTED:
          this.setState({ justAccepted:     true });
          break;
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