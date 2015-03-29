var React       = require('react/addons');
var Gameboard   = require('./Gameboard.jsx');
var Sidebar     = require('./Sidebar.jsx');
var HowToPlay   = require('./HowToPlay.jsx');

var ReactCSSTransitionGroup = React.addons.CSSTransitionGroup;

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
        <ReactCSSTransitionGroup transitionName="how-to-play">
          { this.state.tutorialShown ? (<HowToPlay />) : null }
        </ReactCSSTransitionGroup>
        <Sidebar />
        <Gameboard />
      </div>
    );
  }
});