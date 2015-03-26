var React = require('react/addons');
var Tile  = require('./Tile.jsx');


module.exports = React.createClass({

  render: function() {
    var tileNodes = _.times(this.props.size, function(index) {
      return (<Tile key={index} column={this.props.column} row={index} tile={this.props.tiles[index]} />);
    }, this);

    return (
      <div className="tile-column">        
          { tileNodes }
      </div>
    )
  }
});