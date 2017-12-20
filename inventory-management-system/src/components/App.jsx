import React from 'react';
import { firebaseApp } from '../firebase';
import Products from './Products';

class App extends React.Component {

    signOut() {
        firebaseApp.auth().signOut();
    }

    render() {
        return (
            <div>
                <button className="btn btn-danger" onClick={this.signOut.bind(this)}>Sign Out</button>
                <Products />
            </div>
        );
    }
}

export default App;