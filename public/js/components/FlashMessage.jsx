var React               = require('react/addons');
var ClassNames          = require('classnames');
var FlashMessageStore   = require('../stores/FlashMessageStore');

function getState() {
  return {
    message: FlashMessageStore.getFlashMessage()
  };
}

var ReactCSSTransitionGroup = React.addons.CSSTransitionGroup;

module.exports = React.createClass({

  getInitialState: function() {
    return getState();
  },

  componentDidMount: function() {
    FlashMessageStore.addChangeListener(this._onChange);
  },
  componentWillUnmount: function() {
    FlashMessageStore.removeChangeListener(this._onChange);
  },
  _onChange: function() {
    this.setState(getState());
  },  

  buildMessage: function() {
    if ( this.state.message ) {

      var flashClasses = ClassNames('flash-message', {
        'alert':    this.state.message.msgType === 'alert',
        'notice':   this.state.message.msgType === 'notice',
        'warning':  this.state.message.msgType === 'warning',
        'success':  this.state.message.msgType === 'success'
      });

      return (
        <div className="flash-message" key="fm">
          <h4>{this.state.message.head}</h4>
          <h6>{this.state.message.info}</h6>
        </div>
      );
    } else {
      // This is a bit of a hack, because this component needs to render *something*.
      // The alternative is to do all the check-for-flash-message stuff wherever the
      // component is rendered, but I'd rather keep that logic contained in this component.
      return (<div></div>);
    }
  },


  render: function() {
    var flashNode;

    return (
      <ReactCSSTransitionGroup transitionName="flash-msg">
        {this.buildMessage()}
      </ReactCSSTransitionGroup>
    );
  }
});