export default {
  async setUsersFromListener(state, payload) {
    state.users = payload;
  },
  async setUsersFromDb(state, payload) {
    state.users = payload;
  }
}