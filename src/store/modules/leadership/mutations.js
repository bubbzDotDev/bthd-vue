export default {
    setLeadershipFromListener(state, payload) {
        payload.sort((clan1, clan2) => {
            return (clan1.name < clan2.name) ? -1 : (clan1.name > clan2.name) ? 1 : 0;
        });
        state.leadership = payload;
    }
}