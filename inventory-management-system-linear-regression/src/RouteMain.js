import React, { Component } from 'react';
import Sign from './container/Sign';

class App extends Component {
  render() {
    return (
      <div className="container">
        <div className="jumbotron">
          <h1>Inventory Management System</h1>
          <Sign />
        </div>
      </div>
    );
  }
}

export default App;
