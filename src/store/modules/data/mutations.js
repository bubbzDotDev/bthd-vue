export default {
    setClan(state, payload) {
        const findDuplicates = (element) => element.id === payload.id;
        const index = state.clans.findIndex(findDuplicates);
        if (index === -1) {
            state.clans.push(payload);
        }
    },
    setClansFromListener(state, payload) {
        payload.sort((clan1, clan2) => {
            return (clan1.name < clan2.name) ? -1 : (clan1.name > clan2.name) ? 1 : 0;
        });
        state.clans = payload;
    },
    removeClan(state, payload) {
        const index = state.clans.indexOf(clan => {
            clan.id === payload.id;
        });

        if (index > -1) {
            state.clans.splice(index, 1);
        }
    }
}