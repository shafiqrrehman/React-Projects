import React, { Component } from 'react';
import * as firebase from 'firebase';

class Dashboard extends Component {
    constructor() {
        super();
        this.state = {
            users: [],
            selectedUser: {},
            me: {},
            messages: [],
            message: "",
            myData: {}
        }
    }
    componentDidMount() {
        let me = firebase.auth().currentUser;
        if (!me) {
            me = localStorage.getItem("uid");
        } else {
            me = me.uid
        }
        firebase.database().ref(`/Sign Up/${me}`).once("value", (snap) => {
            this.setState({ myData: snap.val() }, () => {
                console.log(this.state.myData)
            })
        })
        firebase.database().ref('/Sign Up').on("value", (snap) => {
            const data = snap.val();
            let users = []
            for (let key in data) {
                const obj = data[key];
                obj['uid'] = key;
                users.push(obj)
            }
            this.setState({ users, me: me }, () => {
                console.log(me)
            });
        })

    }

    openChat(user, index, event) {
        firebase.database()
            .ref(`/messages/${this.state.me}/${user.uid}`)
            .on("value", (snap) => {
                const data = snap.val();
                let messages = []
                for (let key in data) {
                    messages.push(data[key])
                }
                this.setState({ messages });
            })
        this.setState({ selectedUser: user }, () => {
            console.log(this.state.selectedUser)
        });
        
    }

    changeHandler(event) {
        this.setState({ message: event.target.value });
    }
    sendMessage() {
        const timestamp = firebase.database.ServerValue.TIMESTAMP;
        firebase.database()
            .ref(`/messages/${this.state.me}/${this.state.selectedUser.uid}`)
            .push({
                sender: this.state.me,
                message: this.state.message,
                timestamp: timestamp
            });

        firebase.database()
            .ref(`/messages/${this.state.selectedUser.uid}/${this.state.me}`)
            .push({
                sender: this.state.me,
                message: this.state.message,
                timestamp: timestamp
            })
    }

    signOut() {
        firebase.auth().signOut();
        this.props.history.push('/login');
    }

    profile() {
        this.props.history.push('/profile')
    }

    render() {
        // const users = this.state.users;
        // const messages = this.state.messages;
        // const selectedUser = this.state.selectedUser;
        // const myData = this.state.myData;
        const { users, messages, selectedUser, myData } = this.state;
        return (
            <div>
                <button className="btn btn-danger" onClick={this.signOut.bind(this)}>Sign Out</button>
            <div style={{ display: 'flex', backgroundColor: '#fff', justifyContent: 'space-around', height: window.screen.availHeight }}>
                <div style={{ width: "30%", border: '1px solid gray', margin: '20px' }}>
                    <ul className="list-group">
                        {
                            users.map((user, index) => {
                                return <li className="list-group-item list-group-item-success" key={index} onClick={this.openChat.bind(this, user, index)}>{user['name']}</li>
                            })
                        }
                    </ul>
                </div>


                <div className="container" style={{ width: "70%", border: '1px solid green', margin: '20px', backgroundColor: '#dee3e0' }}>
                        <div>
                        {(Object.keys(this.state.selectedUser).length > 0) ? 
                            (<div style={{ height: '85%' }}>
                            <h4 onClick={this.profile.bind(this)}>{this.state.selectedUser.name}</h4>
                            </div>) : null
                        }
                        </div>

                    <div className="form-group" style={{marginTop: '20px'}}>
                        <input className="form-control" type="text" onChange={this.changeHandler.bind(this)} /><br />
                        <button className="btn btn-primary btn-block" onClick={this.sendMessage.bind(this)}>Send</button>
                    </div><br />
                    <div>
                        <ul className="list-group">
                            {
                                messages.map((msg, index) => {
                                    return <li className="list-group-item" key={index}>
                                        <span><b>{(selectedUser.uid == msg.sender) ? selectedUser.name : myData.name}: </b></span><br />
                                        <span style={{fontSize: '18px'}}>{msg.message}</span><br /> <span>{(new Date(msg.timestamp)).toString()}</span></li>
                                })
                            }
                        </ul>

                    </div>
                    {/* <div className="form-group" style={{marginTop: '20px'}}>
                        <input className="form-control" type="text" onChange={this.changeHandler.bind(this)} /><br />
                        <button className="btn btn-primary btn-block" onClick={this.sendMessage.bind(this)}>Send</button>
                    </div> */}
                </div> {/*end */}
            </div>
            </div>
        );
    }
}

export default Dashboard;
