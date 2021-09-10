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

  async updateUserRoles(user, roles) {
    ref.doc(`${user.id}`).update({
      roles: roles
    })
    .then(() => {
      console.log('Roles updated successfully!');
      this.setUsers();
    })
    .catch((error) => {
      console.error('Error updating roles: ', error);
    });
  }

  async removeRoleFromUsers(role) {
    ref.get().then((querySnapshot) => {
      querySnapshot.forEach((doc) => {
        const user = doc.data();
        ref.doc(`${user.id}`).update({
          roles: firebase.firestore.FieldValue.arrayRemove(role.id)
        })
        .then(() => {
          console.log('Role removed successfully!');
          this.setUsers();
        })
        .catch((error) => {
          console.error('Error removing role: ', error);
        });
      });
    });
  }
}
