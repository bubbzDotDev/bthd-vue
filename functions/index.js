const functions = require("firebase-functions");
const admin = require("firebase-admin");
admin.initializeApp();
const XMLHttpRequest = require("xhr2");

exports.updateDataInDb = functions.pubsub
    .schedule("every 5 minutes").onRun((context) => {
      console.log("This will run every 5 minutes.");

      const ref = admin.firestore().collection("clans");

      ref.get().then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          const document = doc.data();

          const clan = {
            name: "",
            count: null,
            max: null,
            admins: [],
            founders: [],
          };

          // Get general clan info
          const xhr = new XMLHttpRequest();
          xhr.open("GET", `https://www.bungie.net/Platform/GroupV2/${document.id}/`, true);
          xhr.setRequestHeader("X-API-Key", functions.config().bungie.key);

          xhr.onreadystatechange = function() {
            if (this.readyState === 4 && this.status === 200) {
              const json = JSON.parse(this.responseText);
              clan["name"] = json.Response.detail.name;
              clan["count"] = json.Response.detail.memberCount;
              clan["max"] = json.Response.detail.features.maximumMembers;

              // Get clan staff members
              const xhrStaff = new XMLHttpRequest();
              xhrStaff.open("GET", `https://www.bungie.net/Platform/GroupV2/${document.id}/AdminsAndFounder/`, true);
              // eslint-disable-next-line max-len
              xhrStaff.setRequestHeader("X-API-Key", functions.config().bungie.key);

              xhrStaff.onreadystatechange = function() {
                if (this.readyState === 4 && this.status === 200) {
                  const json = JSON.parse(this.responseText);
                  json.Response.results.forEach((member) => {
                    if (member.memberType === 3) { // Admin
                      const admin = {
                        memberType: member.memberType,
                        isOnline: member.isOnline,
                        lastOnlineStatusChange: member.lastOnlineStatusChange,
                        id: member.bungieNetUserInfo.membershipId,
                        bungieName: member.bungieNetUserInfo.displayName,
                      };
                      clan["admins"].push(admin);
                    }

                    if (member.memberType === 5) { // Founder
                      const founder = {
                        memberType: member.memberType,
                        isOnline: member.isOnline,
                        lastOnlineStatusChange: member.lastOnlineStatusChange,
                        id: member.bungieNetUserInfo.membershipId,
                        bungieName: member.bungieNetUserInfo.displayName,
                      };
                      clan["founders"].push(founder);
                    }
                  });

                  ref.doc(`${document.id}`).update({
                    name: clan.name,
                    count: clan.count,
                    max: clan.max,
                    admins: clan.admins,
                    founders: clan.founders,
                  })
                      .then(() => {
                        console.log("Document updated successfully!");
                      })
                      .catch((error) => {
                        console.error("Error updating document: ", error);
                      });
                }
              };
              xhrStaff.send();
            }
          };
          xhr.send();
        });
      });
      return ref.get().then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          const document = doc.data();
          console.log(document.id, "was updated.");
        });
      });
    });


