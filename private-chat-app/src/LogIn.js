import React, {Component} from 'react';
import * as firebase from 'firebase';
import {
    Link
} from 'react-router-dom';
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
                self.props.history.push('/app')
            })
            .catch(error => {
                console.log("inside of error zone")
                this.setState({error})
            })
    }

    render() {
        return (
            <div>
                <h1>Log In</h1>
                Email:
                <input type="text" name="email" value={this.state.email} onChange={this.handleChange.bind(this)} /><br />
                Password:
                <input type="text" name="password" value={this.state.password} onChange={this.handleChange.bind(this)} /><br />
                <button onClick={this.logIn.bind(this)}>Log In</button>
                <div>{this.state.error.message}</div>
                <div><Link to={'/'}>Sign up instead</Link></div>
                <ul>
                    {this.state.alluser.map((user, index) => {
                        return <li key={index}>{user.name}</li>
                    })}
                </ul>
            </div>
        );
    }
}

export default Login;