<template>
  <div class="manage-clans">
    <base-card>
      <basecard-header>
        CLANS
      </basecard-header>
      <div class="clan-card-body">
        <div v-for="clan in clanInfo" :key="clan.id" class="clan-info">
          <a :href="clanUrl + clan.id" target="_blank" rel="noopener"><button>{{ clan.name }}</button></a>
          <p>Members: <span :class="clan.count === clan.max ? 'clan-info-count-red' : 'clan-info-count-green'">{{ clan.count }}/{{ clan.max }}</span></p>
        </div>
        <div class="clan-info"><button @click="launchAddClanModal">✚ Add clan</button></div>
      </div>
    </base-card>
    <AddClanModal 
      v-if="addClanModalIsVisible"
      @hide-modal="hideAddClanModal"
    />
  </div>
</template>

<script>
import { ref } from 'vue'
import { useStore } from 'vuex'
import AddClanModal from '@/components/dashboard/modals/AddClanModal.vue'

export default {
  components: {
    AddClanModal
  },
  setup() {
    const addClanModalIsVisible = ref(false);
    const clanInfo = ref([]);
    const clanUrl = 'https://www.bungie.net/en/ClanV2?groupid=';
    const store = useStore();
    
    clanInfo.value = store.getters['data/clans'];

    function launchAddClanModal() {
      addClanModalIsVisible.value = true;
    }

    function hideAddClanModal() {
      addClanModalIsVisible.value = false;
    }
    
    return {
      clanInfo,
      clanUrl,
      launchAddClanModal,
      addClanModalIsVisible,
      hideAddClanModal
    };
  }
}
</script>

<style scoped>
.manage-clans {
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
</style>