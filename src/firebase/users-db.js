import firebase from '@/firebase'
import store from '@/store'

const db = firebase.firestore();
const ref = db.collection('users');
export default class UsersDb {

  async setListener() {
    ref.onSnapshot((querySnapshot) => {
          const users = [];
          querySnapshot.forEach((doc) => {
              users.push(doc.data());
          });
          store.dispatch('users/getUsersFromListener', users);
      });
  }
  
  async setUsers() {
    const users = [];
    ref.get().then((querySnapshot) => {
      querySnapshot.forEach((doc) => {
        users.push(doc.data());
      });
      store.dispatch('users/getUsersFromDb', users);
    });
    return users;
  }

  async addUser(user) {
    ref.doc(`${user.uid}`).set({
      id: user.uid,
      email: user.email,
      bungieId: null,
      bungieName: null
    })
    .then(() => {
      console.log('User added successfully!');
    })
    .catch((error) => {
      console.error('Error adding user: ', error);
    });
  }

}
