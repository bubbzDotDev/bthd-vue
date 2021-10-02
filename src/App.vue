<template>
  <div class="app-grid">
    <TheHeader />
    <TheNav />
    <router-view v-slot="slotProps" class="router-view">
      <transition name="route" mode="out-in">
        <component :is="slotProps.Component"></component>
      </transition>
    </router-view>
    <TheFooter />
  </div>
</template>

<script>
import { ref } from 'vue'
import { useStore } from 'vuex'
import TheHeader from '@/components/layout/TheHeader.vue'
import TheNav from '@/components/layout/TheNav.vue'
import TheFooter from '@/components/layout/TheFooter.vue'

export default {
  name: 'App',
  components: {
    TheHeader,
    TheNav,
    TheFooter
  },
  setup() {
    const clanInfo = ref([]);
    const store = useStore();
    
    setTimeout(() => {
      clanInfo.value = store.getters['data/clans'];

      // setInterval(() => {
      //   clanInfo.value.forEach(clan => {
      //     store.dispatch('data/updateDataInDb', clan.id);
      //   });
      // }, 3600000); // 1hr: 3600000 30sec: 30000

    }, 2000);
  }
}
</script>

<style>
@import url('https://fonts.googleapis.com/css2?family=Permanent+Marker&family=Roboto:wght@700&family=Russo+One&display=swap');
@import url('../node_modules/toastr/build/toastr.css');

html {
  font-family: 'Roboto', Arial, Helvetica, sans-serif;
  font-size: 18px;
  background-color: #2C2F33;
  box-sizing: border-box;
  height: 100%;
}
body {
  margin: 0;
  height: 100%;
}

.app-grid {
  display: grid;
  grid-template-columns: 1fr;
  grid-template-rows: auto auto 1fr auto;
  height: 100vh;
}

.route-enter-from {
  opacity: 0;
  transform: translateY(-30px);
}

.route-leave-to {
  opacity: 0;
  transform: translateY(30px);
}

.route-enter-active {
  transition: all 0.5s ease-out;
}

.route-leave-active {
  transition: all 0.5s ease-in;
}

.route-enter-to,
.route-leave-from {
  opacity: 1;
  transform: translateY(0);
}
</style>
