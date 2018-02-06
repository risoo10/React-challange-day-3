import  firebase from 'firebase';
let config = {
    apiKey: "AIzaSyAOjRz_2hfR_7R9ErkCukKCxJZjGn2cKYE",
    authDomain: "to-do-app-react-firebase.firebaseapp.com",
    databaseURL: "https://to-do-app-react-firebase.firebaseio.com",
    projectId: "to-do-app-react-firebase",
    storageBucket: "to-do-app-react-firebase.appspot.com",
    messagingSenderId: "435936180943"
};
let fire = firebase.initializeApp(config);
export default fire;
