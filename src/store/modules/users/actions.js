export default {
  async getUsersFromListener({ commit }, payload) {
    commit('setUsersFromListener', payload);
  },
  async getUsersFromDb({ commit }, payload) {
    console.log('payload from actions:', payload);
    commit('setUsersFromDb', payload);
  }
}