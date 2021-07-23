export default {
  async users(state) {
    console.log('getters:', state.users);
    return state.users;
  }
}