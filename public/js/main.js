var React       = require('../libs/react/react-with-addons');
var Gameboard   = require('./components/Gameboard.jsx');

console.log(document.getElementById("app"));

React.render(<Gameboard />, document.getElementById("app"));
