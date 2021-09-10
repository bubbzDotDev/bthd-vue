<template>
  <div v-if="hasPermissions" class="manage-boty">
    <h2>Manage BOTY</h2>
  </div>
</template>

<script>
import { ref, computed } from 'vue'
import { useStore } from 'vuex'

export default {
  setup() {
    const hasPermissions = ref(false);
    const user = ref({});
    const roles = ref([]);
    const rolesWithPermission = ref([]);
    let usersTarget;
    const store = useStore();

    const authUser = computed(() => {
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

          roles.value = store.getters['roles/roles'];
          roles.value = JSON.parse(JSON.stringify(roles.value));

          roles.value.forEach(role => {
            if (role.permissions.includes('ManageBOTY')) {
              rolesWithPermission.value.push(role.id);
            }
          });

          rolesWithPermission.value.forEach(role => {
            if (user.value.roles.includes(role)) {
              hasPermissions.value = true;
            }
          });
        }
      }
    });

    return {
      hasPermissions
    };
  }
}
</script>

<style scoped>
.manage-boty {
  color: #fff;
}

h2 {
  text-align: center;
}
</style>