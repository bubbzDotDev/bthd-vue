import firebase from './'
import store from '../store'

const db = firebase.firestore();
const ref = db.collection('roles');
export default class RolesDb {

  async setListener() {
    ref.onSnapshot((querySnapshot) => {
      const roles = [];
      querySnapshot.forEach((doc) => {
        roles.push(doc.data());
      });
      store.dispatch('roles/getRolesFromListener', roles);
    });
  }

  async removeRole(role) {
    ref.doc(`${role.id}`).delete()
    .then(() => {
      console.log('Role successfully deleted!');
    })
    .catch((error) => {
      console.error('Error removing role: ', error);
    });
  }

  async addRole(role) {
    ref.add({
      name: role.name,
      permissions: role.permissions,
      id: null
    })
    .then((docRef) => {
      ref.doc(`${docRef.id}`).update({
        id: docRef.id
      })
      .then(() => {
        console.log('Role successfully added!');
      })
      .catch((error) => {
        console.error('Error adding role ID: ', error);
      });
    })
    .catch((error) => {
      console.error('Error adding role: ', error);
    });
  }

  async updateRole(role) {
    ref.doc(`${role.id}`).update({
      name: role.name,
      permissions: role.permissions
    })
    .then(() => {
      console.log('Role successfully updated!');
    })
    .catch((error) => {
      console.error('Error updating role: ', error);
    });
  }
}