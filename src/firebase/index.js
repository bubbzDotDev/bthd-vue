import firebase from 'firebase'

const firebaseConfig = {
  apiKey: process.env.VUE_APP_FIREBASE_API_KEY,
  authDomain: "bthd-13c1e.firebaseapp.com",
  databaseURL: "https://bthd-13c1e-default-rtdb.firebaseio.com",
  projectId: "bthd-13c1e",
  storageBucket: "bthd-13c1e.appspot.com",
  messagingSenderId: "205527413041",
  appId: "1:205527413041:web:a78d5be516c837e6934010",
  measurementId: "G-QG6V5FDWTE"
};

firebase.initializeApp(firebaseConfig);
firebase.analytics();

export default firebase;