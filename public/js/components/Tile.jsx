var React = require('../../libs/react/react-with-addons');

module.exports = React.createClass({
  render: function() {
    return (
      <div className="tile">
        {this.props.letter}
      </div>
    )
  }
});