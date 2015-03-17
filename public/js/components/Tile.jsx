var React       = require('../../libs/react/react-with-addons');
var GameActions = require('../actions/GameActions');

module.exports  = React.createClass({
  clickLetter: function(e) {
    var letter = e.target.textContent;
    console.log("letter is", letter);

    GameActions.clickLetter(letter);
  },

  // getInitialState: function() {
  //   return {
  //     letter: LetterStore.getNewLetter()
  //   };
  // },

  render: function() {
    return (
      <div className="tile" onClick={this.clickLetter}>
        {this.props.letter}
      </div>
    )
  }
});