import React, { Component } from 'react';
import Posts from './Posts.js';
const ORDERS = 0;
const POSTS = 1;
const CONTACT = 2;
const POST = 3;

class MainFrame extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tab: ORDERS, // posts, contact
    }

    this.toggleTab = this.toggleTab.bind(this);
  }

  toggleTab(e) {
    e.preventDefault();
    if (e.target.classList.contains('orders')) {
      this.setState({tab:ORDERS});
    } else if (e.target.classList.contains('posts')) {
      this.setState({tab:POSTS});
    } else if (e.target.classList.contains('contact')) {
      this.setState({tab:CONTACT});
    }
  }

  render() {
    var tab;
    let ordersClassName = "tablinks orders";
    let postsClassName = "tablinks posts";
    let contactClassName = "tablinks contact";
    switch(this.state.tab) {
      case ORDERS:
          tab = (<div className='orders'> Orders! </div>);
          ordersClassName += ' active';
          break;
      case POSTS:
          tab = (<Posts />);
          postsClassName += ' active';
          break;
      case CONTACT:
          tab = (<div className='contact'> Contact me. </div>);
          contactClassName += ' active';
          break;
      default:
          tab = (<div> ERROR, cant be another type! </div>);
    }
    return (
      <div className='frame'>
        <div className='tab'>
          <div className={ordersClassName} onClick={this.toggleTab}>Orders</div>
          <div className={postsClassName} onClick={this.toggleTab}>Posts</div>
          <div className={contactClassName} onClick={this.toggleTab}>Contact</div>
        </div>
        {tab}
      </div>
    );
  }
}

export default MainFrame;
