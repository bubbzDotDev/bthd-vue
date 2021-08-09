<template>
  <div class="leadership">
    <base-card>
      <basecard-header>
        LEADERSHIP
      </basecard-header>
      <div class="clan-card-body">
        <div v-for="clan in clanInfo" :key="clan.id" class="clan-info">
          <a :href="clanUrl + clan.id" target="_blank" rel="noopener"><button>{{ clan.name }}</button></a>
          <p>Team Leader<span v-if="clan.founders.length > 1">s</span>:</p>
          <ul class="staff-list">
            <li v-for="founder in clan.founders" :key="founder.id">
              <a :href="`https://www.bungie.net/en/Profile/254/${founder.id}/${founder.bungieName}`" target="_blank" rel="noopener">{{ founder.name }}</a>
            </li>
          </ul>
          <p v-if="clan.admins.length > 0">Admin<span v-if="clan.admins.length > 1">s</span>:</p>
          <ul class="staff-list">
            <li v-for="admin in clan.admins" :key="admin.id">
              <a :href="`https://www.bungie.net/en/Profile/254/${admin.id}/${admin.bungieName}`" target="_blank" rel="noopener">{{ admin.name }}</a>
            </li>
          </ul>
        </div>
      </div>
    </base-card>
  </div>
</template>

<script>
import { ref } from 'vue'
import { useStore } from 'vuex'

export default {
  name: 'Leadership',
  setup() {
    const clanInfo = ref([]);
    const clanUrl = 'https://www.bungie.net/en/ClanV2?groupid=';
    const store = useStore();

    clanInfo.value = store.getters['data/clans'];

    return {
      clanInfo,
      clanUrl
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
  text-align: left;
}
</style>