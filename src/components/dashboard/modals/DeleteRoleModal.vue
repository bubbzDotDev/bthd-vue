<template>
  <div class="backdrop">
    <base-card class="modal">
      <basecard-header>Delete Role</basecard-header>
      <div class="content">
        <p>Are you sure you want to delete {{ role.name }}?</p>
        <base-button @click="deleteRole">Delete Role</base-button>
        <button @click="hideModal" class="cancel">Cancel</button>
      </div>
    </base-card>
  </div>
</template>

<script>
import RolesDb from '../../../firebase/roles-db.js'
import UsersDb from '../../../firebase/users-db.js'

export default {
  props: {
    role: Object
  },
  emits: ['hide-modal', 'toast'],
  setup(props, { emit }) {

    function hideModal() {
      emit('hide-modal');
    }

    const rolesDb = new RolesDb();
    const usersDb = new UsersDb();

    function deleteRole() {
      rolesDb.removeRole(props.role);
      usersDb.removeRoleFromUsers(props.role);
      hideModal();
      emit('toast');
    }

    return {
      hideModal,
      deleteRole
    };
  }
}
</script>

<style scoped>
.backdrop {
  width: 100%;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.75);
  position: fixed;
  top: 0;
  left: 0;
  z-index: 10;
}

.modal {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}

.cancel {
  cursor: pointer;
  color: #99AAB5;
  background-color: #23272A;
  font-weight: bold;
  padding: 0.5rem;
  border: none;
  border-radius: 5px;
  font-size: large;
}

.cancel:hover,
.cancel:active {
  color: #fff;
}

.content {
  margin: 1rem auto;
  width: fit-content;
  text-align: center;
  padding: 0 1rem;
}
</style>