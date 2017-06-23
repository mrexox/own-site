import React, { Component } from 'react';
import Logo from './Logo';
import MainFrame from './MainFrame';

class App extends Component {
  render() {
    return (
      <div className='app'>
        <Logo />
        <MainFrame />
        <div className='footer'>
          Valentine Kiselev (C) 2017
        </div>
      </div>

    );
  }
}

export default App;
