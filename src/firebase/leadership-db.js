import firebase from '@/firebase'
import store from '@/store'

const db = firebase.firestore();
const ref = db.collection('leadership');
export default class LeadershipDb {

  async setListener() {
    ref.onSnapshot((querySnapshot) => {
      const clans = [];
      querySnapshot.forEach((doc) => {
        clans.push(doc.data());
      });
      store.dispatch('leadership/getLeadershipFromListener', clans);
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

  async loadClan(clan) {
    ref.doc(`${clan.id}`).set({
      id: clan.id,
      name: clan.name,
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

  async promoteOrDemote(clan) {
    ref.doc(`${clan.id}`).update({
      admins: clan.admins,
      founders: clan.founders
    })
    .then(() => {
      console.log('Position successfully changed!');
    })
    .catch((error) => {
      console.error('Error promoting admin: ', error);
    });
  }
}