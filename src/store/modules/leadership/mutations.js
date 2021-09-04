export default {
    setLeadershipFromListener(state, payload) {
        payload.sort((clan1, clan2) => {
            return (clan1.name < clan2.name) ? -1 : (clan1.name > clan2.name) ? 1 : 0;
        });
        state.leadership = payload;
    },
    setPromotionOrDemotion(state, payload) {
        const index = state.leadership.indexOf(clan => {
            clan.id === payload.id;
        });

        if (index > -1) {
            // Remove clan
            state.leadership.splice(index, 1);

            const findDuplicates = (element) => element.id === payload.id;
            const newIndex = state.leadership.findIndex(findDuplicates);
            if (newIndex === -1) {
                // Add updated clan
                state.leadership.push(payload);
            }
        }
    }
}