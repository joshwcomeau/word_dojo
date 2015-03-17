var React       = require('../../libs/react/react-with-addons');
var TileColumn  = require('./TileColumn.jsx');

module.exports = React.createClass({
  render: function() {
    var tileColumnNodes = _.times(10, function(index) {
      return (<TileColumn key={index} />);
    }, this);

    return (
      <div className="gameboard">
          { tileColumnNodes }
      </div>
    )
  }
});