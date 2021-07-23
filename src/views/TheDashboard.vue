<template>
  <div>
    <div v-if="user" class="dashboard">
      <DashboardNav />
      <router-view v-slot="slotProps" class="router-view">
        <transition name="route" mode="out-in">
          <component :is="slotProps.Component"></component>
        </transition>
      </router-view>
    </div>
    <div v-else>
      <UserLogin />
    </div>
  </div>
</template>

<script>
import { computed } from 'vue'
import { useStore } from 'vuex'
import UserLogin from '@/components/UserLogin.vue'
import ClanConsole from '@/components/dashboard/ClanConsole.vue'
import DashboardNav from '@/components/dashboard/DashboardNav.vue'

export default {
  name: 'Dashboard',
  components: {
    UserLogin,
    ClanConsole,
    DashboardNav
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

<style scoped>
.dashboard {
  display: grid;
  grid-template-columns: 50px 1fr;
  height: 100%;
}
</style>