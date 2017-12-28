import React, {Component} from 'react';
import * as firebase from 'firebase';
import {
    Link
  } from 'react-router-dom';
const ref = firebase.database().ref();

class SignUp extends Component {

    constructor() {
        super();
        this.state = {
            name: "",
            email: "",
            password: "",
            error: {
                message: ''
            }
        }
    }

    handleChange(event) {
        this.setState({
            [event.target.name]: event.target.value
        })
    }

    signUp() {
        console.log("Start Authentication");
        const self = this;
        firebase.auth().createUserWithEmailAndPassword(this.state.email, this.state.password)
            .then(function(data) {
                if(data) {
                    const obj = {
                        name: self.state.name,
                        email: self.state.email,
                        password: self.state.password
                    }
                    console.log(data.uid);
                    console.log("inside of authentication success.");
                    ref.child("Sign Up").child(data.uid).set(obj);
                    self.props.history.push('/login');
                }
            })
            .catch(error => {
                this.setState({error})
            })
    }

    render() {
        return (
            <div>
                <h1>Sign Up</h1>
                Name:
                <input type="text" name="name" value={this.state.name} onChange={this.handleChange.bind(this)} /><br />
                Email:
                <input type="text" name="email" value={this.state.email} onChange={this.handleChange.bind(this)} /><br />
                Password:
                <input type="text" name="password" value={this.state.password} onChange={this.handleChange.bind(this)} /><br />
                <button onClick={this.signUp.bind(this)}>Sign Up</button>
                <div>{this.state.error.message}</div>
                <div><Link to={'/login'}>Already a user? Sign in instead</Link></div>
            </div>
        );
    }
}

export default SignUp;