<template>
  <div>
    <p v-for="user in filteredUsers" :key="user.id">
      Welcome to the Dashboard, {{ user.bungieName }}
    </p>
  </div>
</template>

<script>
import UsersDb from '@/firebase/users-db.js'
import { useStore } from 'vuex'
import { ref, computed } from 'vue'

export default {
  setup() {
    const filteredUsers = ref([]);
    let usersTarget;
    const store = useStore();
    const usersDb = new UsersDb();
    // users.value = await usersDb.setUsers();
    usersDb.setUsers();

    // const authUser = computed(() => { // Use ".uid" on this to get the ID
    //   return store.getters['auth/user']; 
    // });

    setTimeout(async () => {
      const users = computed(() => {
        return store.getters['users/users'];
      });
      users.value
        .then(result => {
          usersTarget = Object.assign({}, result);
          console.log('usersTarget:', usersTarget);
        })
        .then(() => {
          let objectToArray = Object.entries(usersTarget);
          filteredUsers.value = objectToArray.filter(([key, value]) => {
            console.log('key:', key);
            console.log('value:', value);
            // if (authUser.value.uid === doc.id) {
            //   console.log('doc:', doc);
            //   return doc;
            // }
          });
        });
    }, 1000);
    
    return {
      filteredUsers
    };
  }
}
</script>

<style scoped>

</style>