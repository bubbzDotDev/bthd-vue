<template>
  <div class="clan-list">
    <base-card v-if="clanInfo.length > 0">
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
    <base-card v-else class="loader-card">
      <basecard-header>
        CLANS
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
  setup() {
    const clanInfo = ref([]);
    const clanUrl = 'https://www.bungie.net/en/ClanV2?groupid=';

    const store = useStore();
    
    setTimeout(() => {
      clanInfo.value = store.getters['data/clans'];
    }, 2000);
    
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
</style>
