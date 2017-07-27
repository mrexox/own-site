import React, { Component } from 'react';
import moment from 'moment';
import Logo from './Logo';
import MainFrame from './MainFrame';

class App extends Component {
  render() {
    return (
      <div className='app'>
        <Logo />
        <MainFrame />
        <div className='footer'>
          Valentine Kiselev (C) {moment().format('YYYY')}
        </div>
      </div>

    );
  }
}

export default App;
