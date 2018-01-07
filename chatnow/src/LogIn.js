import React, {Component} from 'react';
import * as firebase from 'firebase';
import {
    Link
} from 'react-router-dom';
import logo from './img/chatnow.png';
import Style from './css/style.css';
const ref = firebase.database().ref('Sign Up');

class Login extends Component {
    
    constructor() {
        super();
        this.state = {
            user: '',
            alluser: [],
            email: "",
            password: "",
            error: {
                message: ""
            }
        }
    }

    componentDidMount() {
        let self = this;
        console.log("Component Did Mount")
        ref.on('value', (snapshot) => {
            let currentUser = snapshot.val()
            console.log(currentUser)
            let myuser = [];
            for(let key in currentUser) {
                const obj = {
                    name: currentUser[key].name,
                    key: key
                }
                myuser.push(obj)
            }
            self.setState({ alluser: myuser });
        })
    }

    handleChange(event) {
        this.setState({
            [event.target.name]: event.target.value
        })
    }

    logIn() {
        console.log("inside auth log in...");
        const self = this;
        firebase.auth().signInWithEmailAndPassword(this.state.email, this.state.password)
            .then((data) => {
                console.log(data);
                console.log("inside of auths success");
                localStorage.setItem("uid",data.uid);
                self.props.history.push('/app')
            })
            .catch(error => {
                console.log("inside of error zone")
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
                            <h2 className="font-style">Welcome, Please Sign in.</h2>
                        </div>
                </div>
                <div className="main-login main-center">
                <form className="form-horizontal">
                <div className="form-group">
                <label for="name" className="cols-sm-2 control-label">Email</label>
                <div className="cols-sm-10">
								<div className="input-group">
									<span className="input-group-addon"><i className="glyphicon glyphicon-envelope" aria-hidden="true"></i></span>
									<input type="text" className="form-control" name="email" value={this.state.email} onChange={this.handleChange.bind(this)} id="name" placeholder="Enter your Name"/>
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
							<button type="button" className="btn btn-primary btn-lg btn-block login-button" onClick={this.logIn.bind(this)}>Sign In</button>
				</div>
                <div>{this.state.error.message}</div>
                <div className="login-register"><Link to={'/'}><strong>Not a member ? Sign up instead</strong></Link></div>
                {/* <ul>
                    {this.state.alluser.map((user, index) => {
                        return <li key={index}>{user.name}</li>
                    })}
                </ul> */}
                </form>
            </div>
            </div>
            </div>
        );
    }
}

export default Login;