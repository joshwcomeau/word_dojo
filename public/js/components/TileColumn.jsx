var React = require('react/addons');
var Tile  = require('./Tile.jsx');


module.exports = React.createClass({
  getInitialState: function() {
    return {
      column: this.props.column,
      tiles:  this.props.tiles
    };
  },
  render: function() {
    var tileNodes = _.times(this.props.size, function(index) {
      return (<Tile key={index} column={this.state.column} row={index} tile={this.state.tiles[index]} />);
    }, this);

    return (
      <div className="tile-column">        
          { tileNodes }
      </div>
    )
  }
});