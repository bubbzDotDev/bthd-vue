<template>
  <footer>
    <router-link v-if="user" @click="logout" to="/">Logout</router-link>
    <router-link v-else to="/dashboard">Staff</router-link>
  </footer>
</template>

<script>
import { computed } from 'vue'
import { useStore } from 'vuex'

export default {
  setup() {
    const store = useStore();

    async function logout() {
      try {
        await store.dispatch('auth/logout');
      } catch (err) {
        console.log('Error:', err.message);
      }
    }

    const user = computed(() => {
      return store.getters['auth/user'];
    });

    return {
      logout,
      user
    };
  }
}
</script>

<style scoped>
footer {
  background-color: #343A40;
  align-items: center;
  text-align: right;
  padding: 0.5rem 2.5rem 0.5rem 0.5rem;
}
a {
  text-decoration: none;
  color: #99AAB5;
  margin-right: 1rem;
}
a.router-link-active,
footer a:hover {
  color: #fff;
}
</style>