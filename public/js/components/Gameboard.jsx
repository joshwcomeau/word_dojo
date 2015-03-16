var React = require('../../libs/react/react-with-addons');
var Tile  = require('./Tile.jsx');

module.exports = React.createClass({
  render: function() {
    return (
      <div className="gameboard">
          <Tile letter="A" />
          <Tile letter="X" />
          <Tile letter="T" />
      </div>
    )
  }
});