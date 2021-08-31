import ClansDb from '@/firebase/clans-db.js'

export default {
    removeClan({ commit }, payload) {
        commit('removeClan', payload);
        const clansDb = new ClansDb();
        clansDb.removeClan(payload);
    },
    getClansFromListener({ commit }, payload) {
        commit('setClansFromListener', payload);
    },
    cacheDataToDb({commit}, payload) {
        const apiKey = process.env.VUE_APP_BUNGIE_API_KEY;
        const groupId = payload;
        const clansDb = new ClansDb();

        const clan = {
            id: groupId,
            name: '',
            count: null,
            max: null,
            admins: [],
            founders: []
        };

        // Get general clan info
        const xhr = new XMLHttpRequest();
        xhr.open('GET', `https://www.bungie.net/Platform/GroupV2/${groupId}/`, true);
        xhr.setRequestHeader('X-API-Key', apiKey);
    
        xhr.onreadystatechange = function() {
            if (this.readyState === 4 && this.status === 200) {
                const json = JSON.parse(this.responseText);
                clan['name'] = json.Response.detail.name;
                clan['count'] = json.Response.detail.memberCount;
                clan['max'] = json.Response.detail.features.maximumMembers;

                // Get clan staff members
                const xhrStaff = new XMLHttpRequest();
                xhrStaff.open('GET', `https://www.bungie.net/Platform/GroupV2/${groupId}/AdminsAndFounder/`, true);
                xhrStaff.setRequestHeader('X-API-Key', apiKey);
            
                xhrStaff.onreadystatechange = function() {
                    if (this.readyState === 4 && this.status === 200) {
                        const json = JSON.parse(this.responseText);
                        json.Response.results.forEach(member => {

                            if (member.memberType === 3) { // Admin
                                let admin = {
                                    memberType: member.memberType,
                                    isOnline: member.isOnline,
                                    lastOnlineStatusChange: member.lastOnlineStatusChange,
                                    id: member.bungieNetUserInfo.membershipId,
                                    bungieName: member.bungieNetUserInfo.displayName
                                };
                                clan['admins'].push(admin);
                            }

                            if (member.memberType === 5) { // Founder
                                let founder = {
                                    memberType: member.memberType,
                                    isOnline: member.isOnline,
                                    lastOnlineStatusChange: member.lastOnlineStatusChange,
                                    id: member.bungieNetUserInfo.membershipId,
                                    bungieName: member.bungieNetUserInfo.displayName
                                };
                                clan['founders'].push(founder);
                            }
                        });
                        commit('setClan', clan);
                        clansDb.addClan(clan);
                    }
                }
                xhrStaff.send();
            }
        }
        xhr.send(); 
    },
    updateDataInDb({commit}, payload) {
        const apiKey = process.env.VUE_APP_BUNGIE_API_KEY;
        const groupId = payload;
        const clansDb = new ClansDb();

        const clan = {
            id: groupId,
            name: '',
            count: null,
            max: null,
            admins: [],
            founders: []
        };

        // Get general clan info
        const xhr = new XMLHttpRequest();
        xhr.open('GET', `https://www.bungie.net/Platform/GroupV2/${groupId}/`, true);
        xhr.setRequestHeader('X-API-Key', apiKey);
    
        xhr.onreadystatechange = function() {
            if (this.readyState === 4 && this.status === 200) {
                const json = JSON.parse(this.responseText);
                clan['name'] = json.Response.detail.name;
                clan['count'] = json.Response.detail.memberCount;
                clan['max'] = json.Response.detail.features.maximumMembers;

                // Get clan staff members
                const xhrStaff = new XMLHttpRequest();
                xhrStaff.open('GET', `https://www.bungie.net/Platform/GroupV2/${groupId}/AdminsAndFounder/`, true);
                xhrStaff.setRequestHeader('X-API-Key', apiKey);
            
                xhrStaff.onreadystatechange = function(){
                    if (this.readyState === 4 && this.status === 200) {
                        const json = JSON.parse(this.responseText);
                        json.Response.results.forEach(member => {

                            if (member.memberType === 3) { // Admin
                                let admin = {
                                    memberType: member.memberType,
                                    isOnline: member.isOnline,
                                    lastOnlineStatusChange: member.lastOnlineStatusChange,
                                    id: member.bungieNetUserInfo.membershipId,
                                    bungieName: member.bungieNetUserInfo.displayName
                                };
                                clan['admins'].push(admin);
                            }

                            if (member.memberType === 5) { // Founder
                                let founder = {
                                    memberType: member.memberType,
                                    isOnline: member.isOnline,
                                    lastOnlineStatusChange: member.lastOnlineStatusChange,
                                    id: member.bungieNetUserInfo.membershipId,
                                    bungieName: member.bungieNetUserInfo.displayName
                                };
                                clan['founders'].push(founder);
                            }
                        });
                        commit('updateClan', clan);
                        clansDb.updateClan(clan);
                    }
                }
                xhrStaff.send();
            }
        }
        xhr.send(); 
    }
}
