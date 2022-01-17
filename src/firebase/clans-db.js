import firebase from './'
import store from '../store'

const db = firebase.firestore();
const ref = db.collection('clans');
export default class ClansDb {

  async setListener() {
    ref.onSnapshot((querySnapshot) => {
      const clans = [];
      querySnapshot.forEach((doc) => {
        clans.push(doc.data());
      });
      store.dispatch('data/getClansFromListener', clans);
    });
  }

  async removeClan(clan) {
    ref.doc(`${clan.id}`).delete()
    .then(() => {
      console.log('Document successfully deleted!');
    })
    .catch((error) => {
      console.error('Error removing document: ', error);
    });
  }

  async addClan(clan) {
    ref.doc(`${clan.id}`).set({
      id: clan.id,
      name: clan.name,
      count: clan.count,
      max: clan.max,
      admins: clan.admins,
      founders: clan.founders
    })
    .then(() => {
      console.log('Document successfully written!');
    })
    .catch((error) => {
      console.error('Error writing document: ', error);
    });
  }

  async updateClan(clan) {
    ref.doc(`${clan.id}`).update({
      name: clan.name,
      count: clan.count,
      max: clan.max,
      admins: clan.admins,
      founders: clan.founders
    })
    .then(() => {
      console.log('Document successfully updated!');
    })
    .catch((error) => {
      console.error('Error updating document: ', error);
    });
  }
}