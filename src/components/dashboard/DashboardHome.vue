<template>
  <div class="dashboard-home">
    <h2>Welcome to the dashboard<span v-if="user.bungieName || user.email">, {{ user.bungieName || user.email }}!</span><span v-else>!</span></h2>
  </div>
</template>

<script>
import UsersDb from '../../firebase/users-db.js'
import RolesDb from '../../firebase/roles-db.js'
import { useStore } from 'vuex'
import { ref, computed } from 'vue'

export default {
  setup() {
    const user = ref({});
    let usersTarget;
    const store = useStore();

    const usersDb = new UsersDb();
    usersDb.setListener();

    const rolesDb = new RolesDb();
    rolesDb.setListener();
    
    const authUser = computed(() => { // Use ".uid" on this to get the ID
      return store.getters['auth/user']; 
    });

    function getData() {
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
    }

    getData();

    setTimeout(() => {
        getData();
      }, 500);

    return {
      user
    };
  }
}
</script>

<style scoped>
.dashboard-home {
  color: #fff;
}

h2 {
  text-align: center;
}
</style>