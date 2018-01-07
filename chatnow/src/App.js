import React, { Component } from 'react';
import {
  BrowserRouter as Router,
  Route
} from 'react-router-dom';
import SignUp from './SignUp';
import Login from './LogIn';
import Dashboard from './Dashboard';
import Profile from './Profile';

class App extends Component {

  render() {
    return (
      <Router>
        <div>
          <Route exact path="/"  component={SignUp} />
          <Route path="/login" component={Login} />
          <Route path="/app" component={Dashboard} />
          <Route path="/profile" component={Profile} />
        </div>
      </Router>
    );
  }
}

export default App;