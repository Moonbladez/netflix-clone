import firebase from "firebase";

const firebaseConfig = {
  apiKey: "AIzaSyA126drjUsvaA708jeJrJDho3f5yWhoPUI",
  authDomain: "netflix-clone-216c0.firebaseapp.com",
  projectId: "netflix-clone-216c0",
  storageBucket: "netflix-clone-216c0.appspot.com",
  messagingSenderId: "617174918709",
  appId: "1:617174918709:web:68a4a35098a707f723337c",
};

const firebaseApp = firebase.initializeApp(firebaseConfig);
const db = firebaseApp.firestore();
const auth = firebase.auth();
const provider = new firebase.auth.GoogleAuthProvider();
const storage = firebase.storage();

export { auth, provider, storage, db };
