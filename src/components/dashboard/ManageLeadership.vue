<template>
  <div v-if="hasPermissions" class="manage-leadership">
    <base-card v-if="clanInfo.length > 0">
      <basecard-header>
        MANAGE LEADERSHIP
      </basecard-header>
      <div class="load-reset-all">
        <button @click="loadAllClans">Load/Reset All</button>
      </div>
      <div v-if="leadershipInfo.length > 0" class="clan-card-body">
        <div v-for="clan in leadershipInfo" :key="clan.id" class="clan-info">
          <a :href="clanUrl + clan.id" target="_blank" rel="noopener"><button>{{ clan.name }}</button></a>
          <div class="reset">
            <button @click="loadClan(clan)">Reset</button>
          </div>
          <p>Team Leader<span v-if="clan.founders.length > 1">s</span>:</p>
          <ul class="staff-list">
            <li v-for="founder in clan.founders" :key="founder.id">
              <a :href="`https://www.bungie.net/7/en/User/Profile/254/${founder.id}/${founder.bungieName}`" target="_blank" rel="noopener" class="team-leaders">{{ founder.bungieName }}</a>
              <button v-if="founder.memberType === 3" @click="demoteToAdmin(clan, founder)" class="promote-demote-buttons">
                <img src="../../assets/img/icons/demote.png" alt="demote icon" width="20" height="20">
              </button>
            </li>
          </ul>
          <p v-if="clan.admins.length > 0">Admin<span v-if="clan.admins.length > 1">s</span>:</p>
          <ul class="staff-list">
            <li v-for="admin in clan.admins" :key="admin.id">
              <a :href="`https://www.bungie.net/7/en/User/Profile/254/${admin.id}/${admin.bungieName}`" target="_blank" rel="noopener" class="admins">{{ admin.bungieName }}</a>
              <button @click="promoteToTeamLeader(clan, admin)" class="promote-demote-buttons">
                <img src="../../assets/img/icons/promote.png" alt="promote icon" width="20" height="20">
              </button>
            </li>
          </ul>
        </div>
      </div>
      <div v-else class="no-clans-loaded">
        <p>No clans loaded. Click "Load/Reset All" above to continue.</p>
      </div>
    </base-card>
    <base-card v-else>
      <basecard-header>
        MANAGE LEADERSHIP
      </basecard-header>
      <p style="text-align: center;">Loading...</p>
      <div class="loader"></div>
    </base-card>
  </div>
</template>

<script>
import { ref, computed } from 'vue'
import { useStore } from 'vuex'
import LeadershipDb from '../../firebase/leadership-db.js'

export default {
  setup(_, { emit }) {
    const hasPermissions = ref(false);
    const user = ref({});
    const roles = ref([]);
    const rolesWithPermission = ref([]);
    let usersTarget;
    const clanInfo = ref([]);
    const leadershipInfo = ref([]);
    const clanUrl = 'https://www.bungie.net/en/ClanV2?groupid=';
    const store = useStore();

    const authUser = computed(() => {
      return store.getters['auth/user']; 
    });

    const users = computed(() => {
      return store.getters['users/users'];
    });
    users.value
    .then(result => {
      usersTarget = Object.assign({}, result);
    })
    .then(() => {
      for (const property in usersTarget) {
        if(usersTarget[property].id === authUser.value.uid) {
          user.value = usersTarget[property];

          roles.value = store.getters['roles/roles'];
          roles.value = JSON.parse(JSON.stringify(roles.value));

          roles.value.forEach(role => {
            if (role.permissions.includes('ManageLeadership')) {
              rolesWithPermission.value.push(role.id);
            }
          });

          rolesWithPermission.value.forEach(role => {
            if (user.value.roles.includes(role)) {
              hasPermissions.value = true;
            }
          });
        }
      }
    });

    setTimeout(() => {
      clanInfo.value = store.getters['data/clans'];
      leadershipInfo.value = store.getters['leadership/leadership'];
    }, 2000);

    const leadershipDb = new LeadershipDb();

    function loadAllClans() {
      clanInfo.value.forEach(clan => {
        leadershipDb.loadClan(clan);
      });

      setTimeout(() => {
        leadershipInfo.value = store.getters['leadership/leadership'];
      }, 2000);
    }

    function loadClan(clan) {
      clanInfo.value.forEach(clanToUpdate => {
        if (clanToUpdate.id === clan.id) {
          leadershipDb.loadClan(clanToUpdate);

          setTimeout(() => {
            leadershipInfo.value = store.getters['leadership/leadership'];
          }, 2000);
        }
      });
    }

    function promoteToTeamLeader(clan, admin) {
      const clanTarget = JSON.parse(JSON.stringify(clan));
      const adminTarget = JSON.parse(JSON.stringify(admin));

      const index = clanTarget.admins.findIndex(member => member.id === adminTarget.id);

      if (index > -1) {
        clanTarget.admins.splice(index, 1);
        clanTarget.founders.push(adminTarget);
        leadershipDb.promoteOrDemote(clanTarget);
        store.dispatch('leadership/promoteOrDemote', clanTarget);
        emit('rerender');
      }
    }

    function demoteToAdmin(clan, admin) {
      const clanTarget = JSON.parse(JSON.stringify(clan));
      const adminTarget = JSON.parse(JSON.stringify(admin));

      const index = clanTarget.founders.findIndex(member => member.id === adminTarget.id);

      if (index > -1) {
        clanTarget.founders.splice(index, 1);
        clanTarget.admins.push(adminTarget);
        leadershipDb.promoteOrDemote(clanTarget);
        store.dispatch('leadership/promoteOrDemote', clanTarget);
        emit('rerender');
      }
    }

    return {
      clanInfo,
      clanUrl,
      leadershipInfo,
      loadAllClans,
      promoteToTeamLeader,
      demoteToAdmin,
      loadClan,
      hasPermissions
    };
  }
}
</script>

<style scoped>
.manage-leadership {
  margin: 1rem auto;
}

.clan-card-body {
  display: grid;
  grid-template-columns: 1fr 1fr;
  margin: 1rem;
}

.clan-info {
  border: 3px dashed #343A40;
  border-radius: 5px;
  padding: 1rem;
  margin: 0.25rem;
  text-align: center;
  color: #99AAB5;
}

.clan-info button,
.load-reset-all button {
  cursor: pointer;
  color: #470dbb;
  font-weight: bold;
  background-color: #99AAB5;
  padding: 0.5rem;
  border: none;
  border-radius: 5px;
  font-size: large;
}

.clan-info button:hover,
.load-reset-all button:hover {
  color: #99AAB5;
  background-color: #000;
}

.staff-list {
  list-style: none;
  padding: 0;
  margin: 0;
}

.staff-list li a {
text-decoration: none;
}

.staff-list li a:hover {
  text-decoration: underline;
}

.founders {
  color: #f1c40f;
}

.team-leaders {
  color: #9b59b6;
}

.admins {
  color: #206694;
}

.loader {
  width:30px;
  height:27.6px;
  --c:radial-gradient(farthest-side,#470dbb,#470dbb,#470dbb,#0000);
  background: 
    var(--c) 50%  0,
    var(--c) 0    100%,
    var(--c) 100% 100%;
  background-size: 12px 12px;
  background-repeat: no-repeat;
  position: relative;
  animation: dots 1s infinite;
  margin: 0 auto;
}

@keyframes dots{ 
    50%,100% {background-position: 100% 100%,50% 0,0 100%} 
}

.no-clans-loaded {
  padding: 1rem;
}

.load-reset-all {
  text-align: center;
  padding-top: 1rem;
}

.promote-demote-buttons {
  margin: 0.25rem;
}

.reset {
  margin-top: 0.5rem;
}
</style>