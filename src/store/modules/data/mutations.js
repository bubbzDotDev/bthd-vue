export default {
    setClan(state, payload) {
        const findDuplicates = (element) => element.id === payload.id;
        const index = state.clans.findIndex(findDuplicates);
        if (index === -1) {
            state.clans.push(payload);
        }
    }
}