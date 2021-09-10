<template>
  <div class="backdrop">
    <base-card class="modal">
      <basecard-header>Edit User Roles</basecard-header>
      <fieldset v-if="roles.length > 0">
        <legend>Roles for {{ user.bungieName || user.email }}</legend>
        <label v-for="role in roles" :key="role.id">
          <input type="checkbox" v-model="rolesToUser" :value="role.id"> 
          {{ role.name }}
        </label>
      </fieldset>
      <fieldset v-else>
        <p>No roles available. Cancel and create a role first.</p>
      </fieldset>
      <div class="button-div">
        <base-button v-if="roles.length > 0" @click="updateRoles">Edit User</base-button>
        <button @click="hideModal" class="cancel">Cancel</button>
      </div>
    </base-card>
  </div>
</template>

<script>
import { ref } from 'vue'
import UsersDb from '@/firebase/users-db.js'

export default {
  props: {
    user: Object,
    roles: Array
  },
  emits: ['hide-modal', 'toast'],
  setup(props, { emit }) {
    const usersDb = new UsersDb();
    const rolesToUser = ref(props.user.roles);

    function hideModal() {
      emit('hide-modal');
    }

    function updateRoles() {
      usersDb.updateUserRoles(props.user, rolesToUser.value);
      hideModal();
      emit('toast');
    }

    return {
      hideModal,
      updateRoles,
      rolesToUser
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

.label-for-name {
  display: flex;
  flex-direction: column;
}

label {
  display: block;
}

.button-div {
  margin: 1rem auto;
  width: fit-content;
}

fieldset {
  border: 3px dashed #343A40;
  margin: 1rem;
  border-radius: 5px;
}

input {
  background-color: #343A40;
  color: #fff;
  border: 5px solid #343A40;
  padding: 0.7rem 0.5rem;
  width: inherit;
  border-radius: 5px;
}

input:focus {
  border: 5px solid #470dbb;
}

legend {
  font-size: 0.9rem;
  text-align: left;
}
</style>