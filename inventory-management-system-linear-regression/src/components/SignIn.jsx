import React from 'react';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';

function SignIn(props) {

    const style = {
        margin: 12,
      };

    return (
        <div>
            <h1>Sign In Form</h1>
            <TextField
            hintText="Enter Username"
            floatingLabelText="Username"
            value={props.value}
            onChange={props.ChangeUsr}
            /><br />
            <TextField
            hintText="Enter Password"
            floatingLabelText="Password"
            type="password"
            value={props.passs}
            onChange={props.ChangePass}
            /><br />
            <RaisedButton label="Sign In" secondary={true} style={style} onClick={props.onClick} />
        </div>
    );
}

export default SignIn;