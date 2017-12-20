import React from 'react';
import {
    Router,
    Route
  } from 'react-router-dom';
import { firebaseApp } from '../firebase';
import App from './App';
import SignIn from './SignIn';
import SignUp from './SignUp';
import history from './history';



class Routes extends React.Component {

    componentDidMount() {
        firebaseApp.auth().onAuthStateChanged(user => {
            if(user) {
                console.log("user has signed in or up.", user);
                history.push('/app');
            } else {
                console.log("user has signed out or still needs to sign in.");
                history.replace('/signin');
            }
        })
    }

    render() {
        return (
            <Router history={history}>
                <div>
                    <Route path="/" exact component={SignUp} />
                    <Route path="/signup" exact component={SignUp} />
                    <Route path="/signin" exact component={SignIn} />
                    <Route path="/app" exact component={App} />
                </div>
            </Router>
            
        );
    }
}

export default Routes;