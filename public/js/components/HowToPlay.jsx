var React               = require('react/addons');
var ClassNames          = require('classnames');
var FlashMessage        = require('./FlashMessage.jsx');
var GameActions         = require('../actions/GameActions');
var GameStore           = require('../stores/GameStore');
var FlashMessageActions = require('../actions/FlashMessageActions');


var _interval;

function getState() {
  return {
    
  };
}


module.exports = React.createClass({

  getInitialState: function() {
    return getState();
  },

  // componentDidMount: function() {
  //   window.addEventListener("keypress", this.handleKeypress);
  // },

  // componentWillUnmount: function() {
  //   window.removeEventListener("keypress", this.handleKeypress);
  // },

  // handleKeypress: function() {
  //   console.log("keypress");
  //   React.unmountComponentAtNode(document.getElementById("how-to-play"));
  // },

  render: function() {
    return (
      <div className="how-to-play" id="how-to-play">
        <div className="how-to-play-container">
          <h2>How To Play</h2>

          <div className="demo-left">
            <h5>Make words with connecting tiles</h5>
            <div className="demo-grid">
              
              <div className="tile-column demo-grid-col">
                <div className="tile demo-grid-tile demo-disabled">X</div>
                <div className="tile demo-grid-tile demo-disabled">H</div>
                <div className="tile demo-grid-tile demo-disabled">J</div>
              </div>
              <div className="tile-column demo-grid-col">
                <div className="tile demo-grid-tile demo-disabled">A</div>
                <div className="tile demo-grid-tile demo-active first">W</div>
                <div className="tile demo-grid-tile demo-disabled">C</div>
              </div>
              <div className="tile-column demo-grid-col">
                <div className="tile demo-grid-tile demo-disabled">R</div>
                <div className="tile demo-grid-tile demo-active second">O</div>
                <div className="tile demo-grid-tile demo-disabled">Y</div>
              </div>
              <div className="tile-column demo-grid-col">
                <div className="tile demo-grid-tile demo-disabled">E</div>
                <div className="tile demo-grid-tile demo-active third">R</div>
                <div className="tile demo-grid-tile demo-disabled">V</div>
              </div>
              <div className="tile-column demo-grid-col">
                <div className="tile demo-grid-tile demo-disabled">K</div>
                <div className="tile demo-grid-tile demo-disabled">I</div>
                <div className="tile demo-grid-tile demo-active fourth">D</div>
              </div>
              <div className="tile-column demo-grid-col">
                <div className="tile demo-grid-tile demo-disabled">R</div>
                <div className="tile demo-grid-tile demo-active fifth">S</div>
                <div className="tile demo-grid-tile demo-disabled">A</div>
              </div>                        
            </div>
          </div>

          <div className="demo-right">
            <h5>Submit words and earn points</h5>

            <div className="demo-rules">
              <div className="demo-spacebar">SPACE</div>
              <p>Hit <span className="demo-spacebar-filler"></span> to enter your word.</p>
              <p>Words must be at least <span className="red-text">3 letters long.</span></p>
              <p>Longer words are worth more points.</p>
              <p>Obscure letters are worth more points.</p>
              <p className="demo-start">Press any key to start.</p>
            </div>
          </div>
        </div>
      </div>
    );
  }
});