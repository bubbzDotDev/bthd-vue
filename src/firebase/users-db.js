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
      bungieName: null,
      roles: []
    })
    .then(() => {
      console.log('User added successfully!');
    })
    .catch((error) => {
      console.error('Error adding user: ', error);
    });
  }

  async addRoleToUser(user, role) {
    ref.doc(`${user.uid}`).update({
      roles: firebase.firestore.FieldValue.arrayUnion(role)
    })
    .then(() => {
      console.log('Role added successfully!');
    })
    .catch((error) => {
      console.error('Error adding role: ', error);
    });
  }

  async removeRoleFromUser(user, role) {
    ref.doc(`${user.uid}`).update({
      roles: firebase.firestore.FieldValue.arrayRemove(role)
    })
    .then(() => {
      console.log('Role removed successfully!');
    })
    .catch((error) => {
      console.error('Error removing role: ', error);
    });
  }

}
