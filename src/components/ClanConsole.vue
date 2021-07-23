<template>
  <div class="console">
    <h2>Welcome to the dashboard, {{ user.bungieName || user.userName }}!</h2>
  </div>
</template>

<script>
import UsersDb from '@/firebase/users-db.js'
import { useStore } from 'vuex'
import { ref, computed } from 'vue'

export default {
  setup() {
    const user = ref({});
    let usersTarget;
    const store = useStore();
    const usersDb = new UsersDb();
    
    const authUser = computed(() => { // Use ".uid" on this to get the ID
      return store.getters['auth/user']; 
    });

    usersDb.setUsers();

    setTimeout(() => {
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
    }, 300);
    
    return {
      user
    };
  }
}
</script>

<style scoped>
.console {
  color: #fff;
}

h2 {
  text-align: center;
}
</style>