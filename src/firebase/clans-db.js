import firebase from '@/firebase'
import store from '@/store'

const db = firebase.firestore();
const ref = db.collection("clans");
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
      console.log("Document successfully written!");
    })
    .catch((error) => {
        console.error("Error writing document: ", error);
    });
  }
}