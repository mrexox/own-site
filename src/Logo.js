import React, { Component } from 'react';

class Logo extends Component {
  constructor(props) {
    super(props);
    this.startBlink();
    this.state = {blinkClass:'blink'};
  }

  toggleBlinkClass() {
      if(this.state.blinkClass === 'blink') {
        this.setState({blinkClass: 'blink--hidden'});
      } else {
        this.setState({blinkClass: 'blink'});
      }
  }

  startBlink() {
    setTimeout(
      () => { this.toggleBlinkClass(); this.startBlink();},
      500
    );
  }

  render() {
    return (
      <div className='logo'>
        Web studio<span className={this.state.blinkClass}>|</span>
      </div>
    );
  }

}

export default Logo;
