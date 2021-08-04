<template>
  <div class="manage-clans">
    <base-card>
      <basecard-header>
        MANAGE CLANS
      </basecard-header>
      <div class="clan-card-body">
        <div v-for="clan in clanInfo" :key="clan.id" class="clan-info">
          <a :href="clanUrl + clan.id" target="_blank" rel="noopener"><button>{{ clan.name }}</button></a>
          <p>Members: <span :class="clan.count === clan.max ? 'clan-info-count-red' : 'clan-info-count-green'">{{ clan.count }}/{{ clan.max }}</span></p>
          <button @click="launchRemoveClanModal(clan)" class="remove-clan"><span>✖</span> Remove clan</button>
        </div>
        <div class="clan-info"><button @click="launchAddClanModal">✚ Add clan</button></div>
      </div>
    </base-card>
    <AddClanModal 
      v-if="addClanModalIsVisible"
      @hide-modal="hideAddClanModal"
      @toast="toast('add')"
    />
    <RemoveClanModal 
      v-if="removeClanModalIsVisible"
      :clan="clanForRemoval"
      @hide-modal="hideRemoveClanModal"
      @toast="toast('remove')"
    />
  </div>
</template>

<script>
import { ref } from 'vue'
import { useStore } from 'vuex'
import AddClanModal from '@/components/dashboard/modals/AddClanModal.vue'
import RemoveClanModal from '@/components/dashboard/modals/RemoveClanModal.vue'
import toastr from 'toastr'

export default {
  components: {
    AddClanModal,
    RemoveClanModal
  },
  emits: ['rerender'],
  setup(_, { emit }) {
    const addClanModalIsVisible = ref(false);
    const removeClanModalIsVisible = ref(false);
    const clanForRemoval = ref({});
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

    function launchRemoveClanModal(clan) {
      removeClanModalIsVisible.value = true;
      clanForRemoval.value = clan;
    }

    function hideRemoveClanModal() {
      removeClanModalIsVisible.value = false;
    }

    function toast(type) {
      if (type === 'remove') {
        toastr["success"]("Clan removed!", "Success:")
        emit('rerender');
      }

      if (type === 'add') {
        toastr["success"]("Clan added!", "Success:")
        emit('rerender');
      }
      
      toastr.options = {
        "closeButton": true,
        "debug": false,
        "newestOnTop": false,
        "progressBar": false,
        "positionClass": "toast-top-center",
        "preventDuplicates": false,
        "onclick": null,
        "showDuration": "300",
        "hideDuration": "1000",
        "timeOut": "5000",
        "extendedTimeOut": "1000",
        "showEasing": "swing",
        "hideEasing": "linear",
        "showMethod": "fadeIn",
        "hideMethod": "fadeOut"
      }
    }
    
    return {
      clanInfo,
      clanUrl,
      launchAddClanModal,
      addClanModalIsVisible,
      hideAddClanModal,
      launchRemoveClanModal,
      removeClanModalIsVisible,
      hideRemoveClanModal,
      clanForRemoval,
      toast
    };
  }
}
</script>

<style scoped>
@import url('../../../node_modules/toastr/build/toastr.css');

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

.clan-info .remove-clan {
  color: inherit;
  background-color: inherit;
  font-size: x-small;
}

.clan-info .remove-clan span {
  color: red;
}

.clan-info .remove-clan:hover {
  background-color: inherit;
  color: #fff;
}

.clan-info .remove-clan:hover span {
  color: #fff;
}
</style>