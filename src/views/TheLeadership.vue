<template>
  <div class="leadership">
    <base-card v-if="leadershipInfo.length > 0">
      <basecard-header>
        LEADERSHIP
      </basecard-header>
      <div class="clan-card-body">
        <div v-for="clan in leadershipInfo" :key="clan.id" class="clan-info">
          <a :href="clanUrl + clan.id" target="_blank" rel="noopener"><button>{{ clan.name }}</button></a>
          <p>Team Leader<span v-if="clan.founders.length > 1">s</span>:</p>
          <ul class="staff-list">
            <li v-for="founder in clan.founders" :key="founder.id" class="no-wrap">
              <div v-for="clanData in clanInfo" :key="clanData.id" class="inline">
                <div v-if="clan.id === clanData.id">
                  <div v-for="staffMember in clanData.staff" :key="staffMember.id">
                    <div v-if="staffMember.id === founder.id && staffMember.isOnline">
                      <div class="is-online tooltip">
                        <span class="tooltiptext">Playing Destiny 2</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <a :href="`https://www.bungie.net/7/en/User/Profile/254/${founder.id}/${founder.bungieName}`" target="_blank" rel="noopener" class="team-leaders">{{ founder.bungieName }}</a>
            </li>
          </ul>
          <p v-if="clan.admins.length > 0">Admin<span v-if="clan.admins.length > 1">s</span>:</p>
          <ul class="staff-list">
            <li v-for="admin in clan.admins" :key="admin.id" class="no-wrap">
              <div v-for="clanData in clanInfo" :key="clanData.id" class="inline">
                <div v-if="clan.id === clanData.id">
                  <div v-for="staffMember in clanData.staff" :key="staffMember.id">
                    <div v-if="staffMember.id === admin.id && staffMember.isOnline">
                      <div class="is-online tooltip">
                        <span class="tooltiptext">Playing Destiny 2</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <a :href="`https://www.bungie.net/7/en/User/Profile/254/${admin.id}/${admin.bungieName}`" target="_blank" rel="noopener" class="admins">{{ admin.bungieName }}</a>
            </li>
          </ul>
        </div>
      </div>
    </base-card>
    <base-card v-else class="loader-card">
      <basecard-header>
        LEADERSHIP
      </basecard-header>
      <p style="text-align: center;">Loading...</p>
      <div class="loader"></div>
    </base-card>
  </div>
</template>

<script>
import { ref } from 'vue'
import { useStore } from 'vuex'

export default {
  name: 'Leadership',
  setup() {
    const leadershipInfo = ref([]);
    const clanInfo = ref([]);
    const clanUrl = 'https://www.bungie.net/en/ClanV2?groupid=';
    const store = useStore();

    setTimeout(() => {
      leadershipInfo.value = store.getters['leadership/leadership'];
      clanInfo.value = store.getters['data/clans'];
    }, 2000);

    return {
      leadershipInfo,
      clanInfo,
      clanUrl,
    };
  }
}
</script>

<style scoped>
.leadership {
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

.clan-info button {
  cursor: pointer;
  color: #470dbb;
  font-weight: bold;
  background-color: #99AAB5;
  padding: 0.5rem;
  border: none;
  border-radius: 5px;
  font-size: large;
}

.clan-info button:hover {
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

.loader-card {
  width: 100vw;
}

@media (min-width: 30em) {
  .loader-card {
    width: 100%;
  }
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

.is-online {
  width: 10px;
  height: 10px;
  border-radius: 50%;
  background-color: rgb(40, 207, 40);
  margin: 0 5px 5px 0;
}

.inline {
  display: inline-block;
}

/* Tooltip container */
.tooltip {
  position: relative;
}

/* Tooltip text */
.tooltip .tooltiptext {
  visibility: hidden;
  width: 170px;
  background-color: black;
  color: #fff;
  text-align: center;
  padding: 5px 0;
  border-radius: 6px;
 
  /* Position the tooltip text - see examples below! */
  position: absolute;
  z-index: 1;
}

/* Show the tooltip text when you mouse over the tooltip container */
.tooltip:hover .tooltiptext {
  visibility: visible;
}

.no-wrap {
  white-space: nowrap;
}
</style>
