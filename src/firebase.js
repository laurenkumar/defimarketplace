import firebase from "firebase/app";
import "firebase/analytics";
import "firebase/firestore";
import "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyC5SvOQLOnOj1bPeoNii3dFBdXUGOevI6k",
  authDomain: "safemoon-marketplace.firebaseapp.com",
  databaseURL: "https://safemoon-marketplace.firebaseio.com",
  projectId: "safemoon-marketplace",
  storageBucket: "safemoon-marketplace.appspot.com",
  messagingSenderId: "676933090961",
  appId: "1:676933090961:web:b2be224a0f6c29072f8930",
  measurementId: "G-3KXTBP65BL"
};

const firebaseApp = firebase.initializeApp(firebaseConfig);
const provider = new firebase.auth.GoogleAuthProvider();
const db = firebaseApp.firestore();
const auth = firebase.auth();
const analytics = firebase.analytics();
export { auth, provider };
export default db;
