import firebase from 'firebase/compat/app'; 
import 'firebase/compat/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyD9NOEiGybP2GLHcNJwCM9_CY93SV5mIhA",
  authDomain: "testproj-ad255.firebaseapp.com",
  projectId: "testproj-ad255",
  storageBucket: "testproj-ad255.appspot.com",
  messagingSenderId: "180015422467",
  appId: "1:180015422467:web:4ae70165ba3e58b0a20236",
  measurementId: "G-2008ZJHWNL"
};
  
  if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
  }
  const db = firebase.firestore();
  const firestore = firebase.firestore();

export {db, firestore}