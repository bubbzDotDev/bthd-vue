export default {
    getLeadershipFromListener({ commit }, payload) {
        commit('setLeadershipFromListener', payload);
    },
    promoteOrDemote({ commit }, payload) {
        commit('setPromotionOrDemotion', payload);
    }
}
