export default {
  async getUsersFromListener({ commit }, payload) {
    commit('setUsersFromListener', payload);
  },
  async getUsersFromDb({ commit }, payload) {
    commit('setUsersFromDb', payload);
  }
}