import React, { Component } from 'react';
import {
  BrowserRouter as Router,
  Route
} from 'react-router-dom';
import SignUp from './SignUp';
import Login from './LogIn';
import PublicChat from './PublicChat';

class App extends Component {
  render() {
    return (
      <Router>
        <div>
          <Route exact path="/"  component={SignUp} />
          <Route path="/login" component={Login} />
          <Route path="/app" component={PublicChat} />
      </div>
      </Router>
    );
  }
}

export default App;
