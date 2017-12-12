import React from 'react';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import SignIn from '../components/SignIn';
import Config from '../config/Config';
import * as firebase from 'firebase';
const ref = firebase.database().ref();

class Sign extends React.Component {
    constructor() {
        super();
        this.state = {
            usr: "",
            pass:""
        }
    }

    componentDidMount() {
        ref.child("SignIn").once("value", function (sign) {
          const data = sign.val();
          console.log(data);
        })
      }

    changeHandler(event) {
        this.setState({usr: event.target.value})
    }

    changeHandlerPass(event) {
        this.setState({pass: event.target.value})
    }

    save() {
        ref.child("User").set({
             username: this.state.usr,
             password: this.state.pass
             })
    }

    render() {
        return (
            <div>
                <SignIn value={this.state.usr} passs={this.state.pass} ChangeUsr={this.changeHandler.bind(this)} ChangePass={this.changeHandlerPass.bind(this)} onClick={this.save.bind(this)} />
            </div>
        );
    }
}

export default Sign;