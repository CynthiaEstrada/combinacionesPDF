// Initialize Firebase
var config = {
  apiKey: "AIzaSyBJ4dfma4MgQvIjMJwJUp3U5KOKYm_4OFs",
  authDomain: "combinacionespdf.firebaseapp.com",
  databaseURL: "https://combinacionespdf.firebaseio.com",
  projectId: "combinacionespdf",
  storageBucket: "combinacionespdf.appspot.com",
  messagingSenderId: "657783964881"
};
firebase.initializeApp(config);

export const database = firebase.database();
//export const firebaseAuth = firebase.auht();
