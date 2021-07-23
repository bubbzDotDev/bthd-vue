export default {
  async setUsersFromListener(state, payload) {
    state.users = payload;
  },
  async setUsersFromDb(state, payload) {
    console.log('payload from mutations:', payload);
    state.users = payload;
  }
}