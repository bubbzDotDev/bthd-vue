<template>
  <main class="clan-list">
    <base-card>
      <basecard-header>
        CLANS
      </basecard-header>
      <div class="clan-card-body">
        <div v-for="clan in clanInfo" :key="clan.id" class="clan-info">
          <a :href="clanUrl + clan.id" target="_blank" rel="noopener"><button>{{ clan.name }}</button></a>
          <p>Members: <span :class="clan.count === clan.max ? 'clan-info-count-red' : 'clan-info-count-green'">{{ clan.count }}/{{ clan.max }}</span></p>
        </div>
      </div>
    </base-card>
  </main>
</template>

<script>
import { ref } from 'vue'
import { useStore } from 'vuex'

export default {
  setup() {
    // Initial variables
    const clanInfo = ref([]);
    const clanUrl = 'https://www.bungie.net/en/ClanV2?groupid=';

    // Clan IDs
    const clanIds = [
        3379218,
        4154203,
        3375350,
        3036440,
        3041710,
        3056680,
        3070897,
        3395516
      ];

    const store = useStore();

    // Send request to cache the data
    clanIds.forEach(clan => { store.dispatch('data/cacheDataToDb', clan); });
    
    // Retrieve the data
    clanInfo.value = store.getters['data/clans'];
    
    return {
      clanInfo,
      clanUrl
    };
  }
}
</script>

<style scoped>
.clan-list {
  margin: 0 auto;
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
  color: #470dbbc9;
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
.clan-info p {
  margin: 0.5rem 0 0 0;
  font-size: smaller;
}
.clan-info-count-green {
  color: green;
  font-weight: bold;
}
.clan-info-count-red {
  color: red;
  font-weight: bold;
}
</style>
