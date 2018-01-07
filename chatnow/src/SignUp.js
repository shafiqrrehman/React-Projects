import React, {Component} from 'react';
import * as firebase from 'firebase';
import {
    Link
  } from 'react-router-dom';
import logo from './img/chatnow.png';
import Style from './css/style.css';
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
            <div className="container">
                <div className="row main">
                    <div className="panel-heading">
                    <div className="panel-title text-center">
                            <img src={logo} width="150" height="90" alt="Chat App" />
                            <h2 className="font-style">Sign up ! It's free and always will be.</h2>
                        </div>
                    </div>
                <div className="main-login main-center">
                <form className="form-horizontal">
                <div className="form-group">
                <label for="name" className="cols-sm-2 control-label">Name</label>
                <div className="cols-sm-10">
								<div className="input-group">
									<span className="input-group-addon"><i className="glyphicon glyphicon-user" aria-hidden="true"></i></span>
									<input type="text" className="form-control" name="name" id="name" value={this.state.name} onChange={this.handleChange.bind(this)}  placeholder="Enter your Name"/>
								</div>
							</div>
                </div>
                
                <div className="form-group">
							<label for="email" className="cols-sm-2 control-label">Email</label>
							<div className="cols-sm-10">
								<div className="input-group">
									<span className="input-group-addon"><i className="glyphicon glyphicon-envelope" aria-hidden="true"></i></span>
									<input type="text" className="form-control" name="email" value={this.state.email} onChange={this.handleChange.bind(this)} id="email"  placeholder="Enter your Email"/>
								</div>
							</div>
				</div>

                <div className="form-group">
							<label for="password" className="cols-sm-2 control-label">Password</label>
							<div className="cols-sm-10">
								<div className="input-group">
									<span className="input-group-addon"><i className="glyphicon glyphicon-lock" aria-hidden="true"></i></span>
									<input type="password" className="form-control" name="password" value={this.state.password} onChange={this.handleChange.bind(this)} id="password"  placeholder="Enter your Password"/>
								</div>
							</div>
				</div>

                <div className="form-group ">
							<button type="button" className="btn btn-success btn-lg btn-block login-button" onClick={this.signUp.bind(this)}>Register</button>
				</div>

                <div>{this.state.error.message}</div>
                <div className="login-register"><Link to={'/login'}><strong>Already a user? Sign in instead</strong></Link></div>
                </form>
            </div>
            </div>
            </div>
            
        );
    }
}

export default SignUp;