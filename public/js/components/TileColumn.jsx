var React = require('../../libs/react/react-with-addons');
var Tile  = require('./Tile.jsx');

module.exports = React.createClass({
  render: function() {
    var tileNodes = _.times(10, function(index) {
      return (<Tile key={index} />);
    }, this);

    return (
      <div className="tile-column">
        { tileNodes }
      </div>
    )
  }
});