<template>
  <TheHeader />
  <TheNav />
  <router-view v-slot="slotProps">
      <transition name="route" mode="out-in">
        <component :is="slotProps.Component"></component>
      </transition>
    </router-view>
</template>

<script>
import TheHeader from '@/components/TheHeader.vue'
import TheNav from '@/components/TheNav.vue'

export default {
  name: 'App',
  components: {
    TheHeader,
    TheNav
  }
}
</script>

<style>
@import url('https://fonts.googleapis.com/css2?family=Permanent+Marker&family=Roboto:wght@700&family=Russo+One&display=swap');

body {
  margin: 0;
  font-family: 'Roboto', Arial, Helvetica, sans-serif;
  font-size: 18px;
  background-color: #2C2F33;
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
  transition: all 0.3s ease-out;
}

.route-leave-active {
  transition: all 0.3s ease-in;
}

.route-enter-to,
.route-leave-from {
  opacity: 1;
  transform: translateY(0);
}
</style>
