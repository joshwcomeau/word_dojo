var React       = require('../../libs/react/react-with-addons');
var TileColumn  = require('./TileColumn.jsx');

module.exports = React.createClass({
  render: function() {
    var tileColumnNodes = _.times(10, function() {
      return (<TileColumn />);
    }, this);

    return (
      <div className="gameboard">
          { tileColumnNodes }
      </div>
    )
  }
});