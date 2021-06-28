<template>
  <div>
    <div v-if="!user">
      <UserLogin />
    </div>
    <div v-else>
      <ClanConsole />
    </div>
  </div>
</template>

<script>
import { computed } from 'vue'
import { useStore } from 'vuex'
import UserLogin from '@/components/UserLogin.vue'
import ClanConsole from '@/components/ClanConsole.vue'

export default {
  name: 'Dashboard',
  components: {
    UserLogin,
    ClanConsole
  },
  setup() {
    const store = useStore();

    const user = computed(() => {
      return store.getters['auth/user'];
    });

    return {
      user
    };
  }
}
</script>