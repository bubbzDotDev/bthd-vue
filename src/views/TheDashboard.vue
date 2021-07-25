<template>
  <div>
    <div v-if="user" class="dashboard-menu-closed" :class="{ 'dashboard-menu-open':menuIsOpen }">
      <DashboardNav @menu-open="openMenu" />
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
import { ref, computed } from 'vue'
import { useStore } from 'vuex'
import UserLogin from '@/components/UserLogin.vue'
import DashboardNav from '@/components/dashboard/DashboardNav.vue'

export default {
  name: 'Dashboard',
  emits: ['slide-out', 'slide-in'],
  components: {
    UserLogin,
    DashboardNav
  },
  setup() {
    const menuIsOpen = ref(false);
    const store = useStore();
    const user = computed(() => {
      return store.getters['auth/user'];
    });

    function openMenu(event) {
      menuIsOpen.value = event;
    }

    return {
      user,
      openMenu,
      menuIsOpen
    };
  }
}
</script>

<style scoped>
.dashboard-menu-closed {
  display: grid;
  grid-template-columns: 50px 1fr;
  height: 100%;
}

.dashboard-menu-open {
  grid-template-columns: 13rem 1fr;
}
</style>