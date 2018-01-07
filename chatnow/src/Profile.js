import React, { Component } from 'react';
import * as firebase from 'firebase';
const ref = firebase.database().ref();
const storage = firebase.storage();

class Profile extends Component {

    constructor() {
        super();
        this.state = {
            allFiles: []
        }
    }

    componentDidMount() {
        ref.child("images").on("value", (snap) => {
            let allFiles = [];
            const data = snap.val();
            for (let key in data) {
                allFiles.push(data[key]);
            }
            this.setState({ allFiles })
        })
    }

    fileUpload() {
        const myFile = document.getElementById("file").files[0];
        storage.ref(`/${myFile.name}`).put(myFile)
            .then((snapshot) => {
                console.log('Uploaded a blob or file!', snapshot);
                console.log('Uploaded a blob or file!', snapshot.downloadURL);

                ref.child("images").push({ url: snapshot.downloadURL, name: myFile.name, type: myFile.type })
            })
            .catch((error) => {
                console.log('error!', error);

            })
    }

    render() {
        return (
            <div className="container" style={{backgroundColor: '#fff'}}>
                <div >
                    file uploading
                    <input type="file" name="file" id="file" /><br />
                    <button onClick={this.fileUpload.bind(this)}>Upload</button>
                </div>
                <div >
                    {
                        this.state.allFiles.map((file, index) => {
                            return (
                                <div>
                                    {/* <a key={index} href={file.url} download target="_blank">{file.name}</a> */}
                                    <img src={file.url} width="300px" height="300px" alt="User Pic" />
                                </div>
                            );
                        })
                    }
                </div>


            </div>
        );
    }
}

export default Profile;