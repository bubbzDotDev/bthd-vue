<template>
  <footer>
    <a v-if="user" @click="logout" href="#">Logout</a>
    <router-link to="/dashboard">Staff</router-link>
  </footer>
</template>

<script>
import { computed } from 'vue'
import { useStore } from 'vuex'
import { useRoute } from 'vue-router';
import { useRouter } from 'vue-router'

export default {
  setup() {
    const store = useStore();
    const route = useRoute();
    const router = useRouter();

    async function logout() {
      try {
        await store.dispatch('auth/logout');
        if (route.name === 'dashboard') {
          router.replace('/');
        }
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