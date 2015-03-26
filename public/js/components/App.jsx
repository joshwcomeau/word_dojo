var React       = require('react');
var Gameboard   = require('./Gameboard.jsx');
var Sidebar     = require('./Sidebar.jsx');


module.exports = React.createClass({

  render: function() {
    return (
      <div className="app">
        <Sidebar />
        <Gameboard />
      </div>
    );
  }
});