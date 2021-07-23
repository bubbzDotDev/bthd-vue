<template>
  <div>
    <p>Welcome to the Dashboard, {{ user.bungieName }}</p>
  </div>
</template>

<script>
import UsersDb from '@/firebase/users-db.js'
import { useStore } from 'vuex'
import { computed } from 'vue'

export default {
  setup() {
    // const user = ref({});
    // const users = ref([]);
    const store = useStore();
    const usersDb = new UsersDb();
    // users.value = await usersDb.setUsers();
    usersDb.setUsers();

    const authUser = computed(() => { // Use ".uid" on this to get the ID
      return store.getters['auth/user']; 
    });

    console.log('uid:', authUser.value.uid);

    setTimeout(async () => {
      const users = computed(() => {
        return store.getters['users/users'];
      });
      console.log('users:', users.value);
    }, 1000);
    

    return {
      
    };
  },
}
</script>

<style scoped>

</style>