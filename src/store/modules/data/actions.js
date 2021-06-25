export default {
    cacheDataToDb({commit}, payload) {
        const apiKey = process.env.VUE_APP_BUNGIE_API_KEY;
        const xhr = new XMLHttpRequest();
        const groupId = payload;

        const clan = {
            id: groupId,
            name: '',
            count: null,
            max: null
        };

        xhr.open('GET', `https://www.bungie.net/Platform/GroupV2/${groupId}/`, true);
        xhr.setRequestHeader('X-API-Key', apiKey);
    
        xhr.onreadystatechange = function(){
            if (this.readyState === 4 && this.status === 200){
                const json = JSON.parse(this.responseText);
                clan['name'] = json.Response.detail.name;
                clan['count'] = json.Response.detail.memberCount;
                clan['max'] = json.Response.detail.features.maximumMembers;

                commit('setClan', clan);
            }
        }
        xhr.send();

    }
    // loadDataFromDb(context, payload) {


    //     context.commit('setData', clan);
    // }
}