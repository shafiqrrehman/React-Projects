import React, { Component } from 'react';
import * as firebase from 'firebase';
import './styles.css'

const ref = firebase.database().ref('Messages');
const show = firebase.database().ref('Sign Up');
class Dashboard extends Component {

    constructor() {
        super();
        this.state = {
            user: '',
            alluser: [],
            message: '',
            messages: [],
            selectedUser: {}
        }
    }

    componentDidMount() {
        console.log("Component Did Mount")
        // ref.on('value', (snapshot) => {
        //     let currentMessage = snapshot.val()
        //     console.log(currentMessage)
        //     if(currentMessage != null) {
        //         this.setState({
        //             messages: currentMessage
        //         })
        //     }
        // })

        let self = this;
        console.log("Component Did Mount")
        show.on('value', (snapshot) => {
            let currentUser = snapshot.val()
            console.log(currentUser)
            let myuser = [];
            for (let key in currentUser) {
                const obj = {
                    name: currentUser[key].name,
                    key: key
                }
                myuser.push(obj)
            }
            self.setState({ alluser: myuser });
        })
    }

    // componentWillMount() {
    //     let self = this;
    //     console.log("Component Will Mount")
    //     show.on('value', (snapshot) => {
    //         let currentUser = snapshot.val()
    //         console.log(currentUser)
    //         let myuser = [];
    //         for(let key in currentUser) {
    //             const obj = {
    //                 name: currentUser[key].name,
    //                 key: key
    //             }
    //             myuser.push(obj)
    //         }
    //         self.setState({ alluser: myuser });
    //     })
    // }

    signOut() {
        firebase.auth().signOut()
            .then(() => {
                this.props.history.push('/login')
            })
            .catch((error) => {
                console.log(error)
            })
    }

    handleChange(event) {
        console.log("field is changing: " + event.target.value)
        this.setState({
            message: event.target.value
        })
    }

    submitMessage() {
        // console.log('Submit Message: ' + this.state.message)
        // const nextMsg = {
        //     msg: this.state.message
        // }

        // let list = Object.assign([], this.state.messages)
        // console.log(list)
        // list.push(nextMsg)
        // this.setState({
        //     messages: list
        // })

        // ref.set(list)
    }

    handleShow(user, index, event) {
        // this.state.alluser.map((msgs, i) => {
        //     return console.log(this.state.alluser[i].name);
        // })
        console.log(user)
        console.log(index)
        //console.log(event)
        this.setState({ selectedUser: user });
        // var x = document.getElementById("myDIV");
        // if (x.style.display === "none") {
        //     x.style.display = "block";
        // } else {
        //     x.style.display = "none";
        // }

    }



    render() {
        let currentMsg = this.state.messages.map((msgs, i) => {
            return (
                <li key={i}>{msgs.msg}</li>
            );
        })

        const myDiv = {
            // padding: "50px 0",
            textAlign: "center",
            backgroundColor: "lightblue",
            // marginLeft: "540px",
            // marginRight: "404px",

        }

        const btn = {
            justifyContent: "flex-end",
            display: "flex"
        }

        const inpt = {
            justifyContent: "flex-end",
            display: "flex"
        }
        return (
            <div style={{ display: 'flex' }}>
                {/* <button onClick={this.signOut.bind(this)}>Sign Out</button>
                <h1>Public Chat Room</h1>
                <ul>{currentMsg}</ul>
                <input type="text" value={this.state.message} onChange={this.handleChange.bind(this)} placeholder="Type your message here" /><br />
                <button onClick={this.submitMessage.bind(this)}>Send Message</button>
                <br />
                <br />
                <br /> */}
                {/* <button onClick={this.handleShow.bind(this, user, index)}> Show / Hide</button> */}
                {/* <button onClick={this.signOut.bind(this)}>Sign Out</button> */}
                <div style={{ width: '30%' }}>
                    <ul >
                        {this.state.alluser.map((user, index) => {
                            return (<li onClick={this.handleShow.bind(this, user, index)}
                                style={{ borderWidth: 1, borderColor: "gray", padding: 10, borderStyle: 'solid' }}
                                key={index}>{user.name} </li>
                            )
                        })}
                    </ul>
                </div>
                {(Object.keys(this.state.selectedUser).length > 0) ? (
                    <div id="myDIV" style={[myDiv,{ display:'flex', flexDirection:'column', justifyContent:'space-between', width: '60%'}]} >
                        <div style={{ height: '85%' }}>
                            <h4> {this.state.selectedUser.name}</h4>
                        </div>
                        <div style={{ display: 'flex', alignItems: 'flex-end' }}>
                            <input type="text" style={inpt} value={this.state.message} onChange={this.handleChange.bind(this)} placeholder="Type your message here" /><br />
                            <button style={btn} onClick={this.submitMessage.bind(this)}>Send Message</button>
                        </div>
                    </div>) : null}

            </div>
        );
    }
}

export default Dashboard;