var React       = require('react');
var Gameboard   = require('./Gameboard.jsx');
var Sidebar     = require('./Sidebar.jsx');
var HowToPlay   = require('./HowToPlay.jsx');


module.exports = React.createClass({
  getInitialState: function() {
    return {
      tutorialShown: true
    };
  },

  componentDidMount: function() {
    window.addEventListener("keypress", this.handleKeypress);
  },
  componentWillUnmount: function() {
    window.removeEventListener("keypress", this.handleKeypress);
  },
  handleKeypress: function() {
    if ( this.state.tutorialShown ) 
      this.setState({ tutorialShown: false });
  },

  render: function() {
    return (
      <div className="app">
        { this.state.tutorialShown ? (<HowToPlay />) : null }
        <Sidebar />
        <Gameboard />
      </div>
    );
  }
});