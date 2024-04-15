import firebase from 'firebase/compat/app'; 
import 'firebase/compat/firestore';

const firebaseConfig = {
    //config
  };
  
  if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
  }
  const db = firebase.firestore();

export {db}