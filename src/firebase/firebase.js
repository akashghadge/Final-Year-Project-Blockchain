import firebase from "firebase/app";
import "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyByAA2LcXP0DHLIvDb4bApV72NEkjzPN6k",
  authDomain: "final-year-project-blockchain.firebaseapp.com",
  projectId: "final-year-project-blockchain",
  storageBucket: "final-year-project-blockchain.appspot.com",
  messagingSenderId: "855503959600",
  appId: "1:855503959600:web:20fa8707475e4fd63f1ff5",
  measurementId: "G-RL2DZC93QF"
};
if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
  firebase.firestore();
}

export const db = firebase.firestore();

export default firebase;
