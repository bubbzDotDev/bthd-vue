<template>
  <div>
    <div v-if="user" class="dashboard-menu-closed" :class="{ 'dashboard-menu-open':menuIsOpen }">
      <DashboardNav @menu-open="openMenu" />
      <router-view v-slot="slotProps" class="router-view">
        <transition name="route" mode="out-in">
          <component :is="slotProps.Component" @rerender="forceRerender" :key="componentKey"></component>
        </transition>
      </router-view>
    </div>
    <div v-else>
      <div v-if="currentRoute === 'signup'">
        <SignUp />
      </div>
      <div v-else>
        <UserLogin />
      </div>
    </div>
  </div>
</template>

<script>
import { ref, computed } from 'vue'
import { useStore } from 'vuex'
import { useRoute } from 'vue-router';
import UserLogin from '@/components/dashboard/UserLogin.vue'
import SignUp from '@/components/dashboard/SignUp.vue'
import DashboardNav from '@/components/dashboard/DashboardNav.vue'

export default {
  name: 'Dashboard',
  components: {
    UserLogin,
    DashboardNav,
    SignUp
  },
  setup() {
    const menuIsOpen = ref(false);
    const store = useStore();

    const user = computed(() => {
      return store.getters['auth/user'];
    });

    const route = useRoute();
    const currentRoute = computed(() => {
      return route.name;
    });

    function openMenu(event) {
      menuIsOpen.value = event;
    }
    
    const componentKey = ref(0);
    function forceRerender() {
      componentKey.value++;
    }

    return {
      user,
      openMenu,
      menuIsOpen,
      currentRoute,
      componentKey,
      forceRerender
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

.router-view {
  z-index: 0;
}
</style>