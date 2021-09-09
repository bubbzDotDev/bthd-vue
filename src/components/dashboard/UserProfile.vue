<template>
  <div class="user-profile">
    <h2>Welcome to your profile<span v-if="user.bungieName || user.email">, {{ user.bungieName || user.email }}!</span><span v-else>!</span></h2>
  </div>
</template>

<script>
import { useStore } from 'vuex'
import { ref, computed } from 'vue'

export default {
  setup() {
    const user = ref({});
    let usersTarget;
    const store = useStore();
    
    const authUser = computed(() => { // Use ".uid" on this to get the ID
      return store.getters['auth/user']; 
    });

    const users = computed(() => {
      return store.getters['users/users'];
    });
    users.value
    .then(result => {
      usersTarget = Object.assign({}, result);
    })
    .then(() => {
      for (const property in usersTarget) {
        if(usersTarget[property].id === authUser.value.uid) {
          user.value = usersTarget[property];
        }
      }
    });
    
    return {
      user
    };
  }
}
</script>

<style scoped>
.user-profile {
  color: #fff;
}

h2 {
  text-align: center;
}
</style>