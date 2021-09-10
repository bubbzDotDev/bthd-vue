<template>
  <div class="manage-staff">
    <base-card>
      <basecard-header>
        MANAGE SITE STAFF
      </basecard-header>
      <div class="site-staff-body">
        <div class="roles-container">
          <h3>Roles</h3>
          <ul class="roles-list">
            <li v-for="role in roles" :key="role.id">
              <a @click="launchViewRoleModal(role)">{{ role.name }}</a> 
              <button @click="launchDeleteRoleModal(role)" class="delete-role-button">✖</button>
            </li>
            <li class="center"><base-button @click="launchCreateRoleModal">Create Role</base-button></li>
          </ul>
        </div>
        <div class="users-container">
          <h3>Users</h3>
          <ul class="users-list">
            <li v-for="user in users" :key="user.id">
              <a @click="launchEditUserRolesModal(user)">{{ user.bungieName || user.email }}</a>
            </li>
          </ul>
        </div>
      </div>
    </base-card>
    <CreateRoleModal 
      v-if="createRoleModalIsVisible"
      @hide-modal="hideCreateRoleModal"
      @toast="toast('role-created')"
    />
    <ViewRoleModal 
      v-if="viewRoleModalIsVisible"
      :role="roleForModals"
      @hide-modal="hideViewRoleModal"
      @toast="toast('role-edited')"
    />
    <DeleteRoleModal 
      v-if="deleteRoleModalIsVisible"
      :role="roleForModals"
      @hide-modal="hideDeleteRoleModal"
      @toast="toast('role-deleted')"
    />
    <EditUserRolesModal 
      v-if="editUserRolesModalIsVisible"
      :user="userForModals"
      :roles="roles"
      @hide-modal="hideEditUserRolesModal"
      @toast="toast('user-role-edited')"
    />
  </div>
</template>

<script>
import { ref } from 'vue'
import { useStore } from 'vuex'
import CreateRoleModal from '@/components/dashboard/modals/CreateRoleModal.vue'
import DeleteRoleModal from '@/components/dashboard/modals/DeleteRoleModal.vue'
import ViewRoleModal from '@/components/dashboard/modals/ViewRoleModal.vue'
import EditUserRolesModal from '@/components/dashboard/modals/EditUserRolesModal.vue'
import toastr from 'toastr'

export default {
  components: {
    CreateRoleModal,
    DeleteRoleModal,
    ViewRoleModal,
    EditUserRolesModal
  },
  emits: ['rerender'],
  setup(_, { emit }) {
    const users = ref([]);
    const roles = ref([]);
    let usersTarget;
    const store = useStore();
    const createRoleModalIsVisible = ref(false);
    const deleteRoleModalIsVisible = ref(false);
    const viewRoleModalIsVisible = ref(false);
    const roleForModals = ref({});
    const userForModals = ref({});
    const editUserRolesModalIsVisible = ref(false);

    users.value = store.getters['users/users'];
    users.value
        .then(result => {
          usersTarget = Object.assign({}, result);
          usersTarget = JSON.parse(JSON.stringify(usersTarget));
          users.value = usersTarget;
        });
    

    roles.value = store.getters['roles/roles'];
    roles.value = JSON.parse(JSON.stringify(roles.value));

    function launchCreateRoleModal() {
      createRoleModalIsVisible.value = true;
    }

    function hideCreateRoleModal() {
      createRoleModalIsVisible.value = false;
    }

    function launchDeleteRoleModal(role) {
      roleForModals.value = role;
      deleteRoleModalIsVisible.value = true;
    }

    function hideDeleteRoleModal() {
      deleteRoleModalIsVisible.value = false;
    }

    function toast(type) {
      if (type === 'role-deleted') {
        toastr["success"]("Role deleted!", "Success:")
        emit('rerender');
      }

      if (type === 'role-created') {
        toastr["success"]("Role created!", "Success:")
        emit('rerender');
      }

      if (type === 'role-edited') {
        toastr["success"]("Role edited!", "Success:")
      }

      if (type === 'user-role-edited') {
        toastr["success"]("User edited!", "Success:")
        emit('rerender');
      }
      
      toastr.options = {
        "closeButton": true,
        "debug": false,
        "newestOnTop": false,
        "progressBar": false,
        "positionClass": "toast-top-center",
        "preventDuplicates": false,
        "onclick": null,
        "showDuration": "300",
        "hideDuration": "1000",
        "timeOut": "5000",
        "extendedTimeOut": "1000",
        "showEasing": "swing",
        "hideEasing": "linear",
        "showMethod": "fadeIn",
        "hideMethod": "fadeOut"
      }
    }

    function launchViewRoleModal(role) {
      roleForModals.value = role;
      viewRoleModalIsVisible.value = true;
    }

    function hideViewRoleModal() {
      viewRoleModalIsVisible.value = false;
    }

    function launchEditUserRolesModal(user) {
      userForModals.value = user;
      editUserRolesModalIsVisible.value = true;
    }

    function hideEditUserRolesModal() {
      editUserRolesModalIsVisible.value = false;
    }

    return {
      users,
      roles,
      toast,
      roleForModals,
      createRoleModalIsVisible,
      deleteRoleModalIsVisible,
      launchCreateRoleModal,
      hideCreateRoleModal,
      launchDeleteRoleModal,
      hideDeleteRoleModal,
      launchViewRoleModal,
      viewRoleModalIsVisible,
      hideViewRoleModal,
      launchEditUserRolesModal,
      userForModals,
      hideEditUserRolesModal,
      editUserRolesModalIsVisible
    }
  }
}
</script>

<style scoped>
.manage-staff {
  margin: 0 auto;
}

.site-staff-body {
  margin: 1rem;
}

.roles-list,
.users-list {
  list-style: none;
  padding: 0;
  margin: 0;
}

li {
  padding: 0.25rem;
}

.roles-container,
.users-container {
  border: 3px dashed #343A40;
  border-radius: 5px;
  padding: 0.5rem;
  margin: 0.25rem;
}

h3 {
  text-align: center;
  margin: 0;
  padding: 0;
}

.center {
  text-align: center;
}

a:hover {
  cursor: pointer;
  text-decoration: underline;
  color: #fff;
}

.delete-role-button {
  color: red;
  background-color: inherit;
  border: none;
  cursor: pointer;
  font-size: large;
}

.delete-role-button:hover {
  color: #fff;
}
</style>