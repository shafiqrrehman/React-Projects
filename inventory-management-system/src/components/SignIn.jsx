import React from 'react';
import { Link } from 'react-router-dom';
import { firebaseApp } from '../firebase';

class SignIn extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            // name: '',
            email: '',
            password: '',
            error: {
                message: ''
            }
        }
    }

    signIn() {
        console.log("This State", this.state);
        const {email, password} = this.state;
        firebaseApp.auth().signInWithEmailAndPassword(email, password)
        .then(data => {
            console.log("data", data);
        })
            .catch(error => {
                this.setState({error})
            })
    }

    render() {
        return (
            <div className="container">
                <h2>Sign In</h2>
                <div className="form-inline">
                    <div className="form-group">
                        {/* <input className="form-control" type="text" onChange={event => this.setState({name: event.target.value})} placeholder="Enter your full name" /> */}
                        <input className="form-control" type="email" onChange={event => this.setState({email: event.target.value})} placeholder="Enter your valid email" />
                        <input className="form-control" type="password" onChange={event => this.setState({password: event.target.value})} placeholder="Enter your password" />
                        <button className="btn btn-primary" onClick={this.signIn.bind(this)} type="button">Sign In</button>
                    </div>
                </div>
                <div>{this.state.error.message}</div>
                <div><Link to={'/signup'}>Sign Up instead</Link></div>
            </div>
        );
    }
}

export default SignIn;