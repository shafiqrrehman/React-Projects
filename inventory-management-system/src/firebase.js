import * as firebase from 'firebase';

const config = {
    apiKey: "AIzaSyAm9njagdemvEcLw2rHWMxaBLiymbG3uR0",
    authDomain: "myfirstfirebase-2be3f.firebaseapp.com",
    databaseURL: "https://myfirstfirebase-2be3f.firebaseio.com",
    projectId: "myfirstfirebase-2be3f",
    storageBucket: "myfirstfirebase-2be3f.appspot.com",
    messagingSenderId: "738845191267"
  };

export const firebaseApp = firebase.initializeApp(config);
