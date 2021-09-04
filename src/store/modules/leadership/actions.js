// import ClansDb from '@/firebase/clans-db.js'
// import LeadershipDb from '@/firebase/leadership-db.js'

export default {
    getLeadershipFromListener({ commit }, payload) {
        commit('setLeadershipFromListener', payload);
    },
    promoteOrDemote({ commit }, payload) {
        commit('setPromotionOrDemotion', payload);
    }
}
