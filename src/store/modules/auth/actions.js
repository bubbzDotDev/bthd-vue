import firebase from 'firebase'

export default {
  async login(context, payload) {
    return context.dispatch('auth', {
      ...payload,
      mode: 'login'
    });
  },
  // async signup(context, payload) {
  //   return context.dispatch('auth', {
  //     ...payload,
  //     mode: 'signup'
  //   });
  // },
  async auth({ commit }, payload) {
    // const mode = payload.mode;

    firebase.auth().signInWithEmailAndPassword(payload.email, payload.password)
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user;
        // console.log(user.uid);
        commit('setUser', user);
      })
      .catch((error) => {
        console.log('Error code:', error.code);
        console.log('Error message:', error.message);
      }
    );

    // if (mode === 'signup') {
    //     Sign up option
    // }
  },
  logout({ commit }) {
    firebase.auth().signOut().then(() => {
      // Sign-out successful.
      commit('setUser', null);
    }).catch((error) => {
      console.log('Error:', error);
    });
  }
} 