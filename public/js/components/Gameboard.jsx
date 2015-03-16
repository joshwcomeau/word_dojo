var React = require('react');
var Tile  = require('./Tile');

module.exports = React.createClass({
  render: function() {
    return (
      <div className="gameboard">
          <Tile letter="A">
          <Tile letter="X">
          <Tile letter="T">
      </div>
    )
  }
});