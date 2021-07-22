const firebase = require("firebase");
require("firebase/firestore");
const db = firebase.firestore();
const ref = db.collection("users");

class UsersDb {
  constructor(ref) {
    this.ref = ref;
  }
  setListener() {
    ref.onSnapshot((querySnapshot) => {
          var users = [];
          querySnapshot.forEach((doc) => {
              users.push(doc.data().name);
          });
      });
  }
}

export default { UsersDb };