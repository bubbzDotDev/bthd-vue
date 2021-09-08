<template>
  <div class="backdrop">
    <base-card class="modal">
      <basecard-header>Create Role</basecard-header>
      <label class="label-for-name">
        <fieldset>
          <legend>Role Name</legend>
          <input type="text" v-model.trim="role.name" required />
        </fieldset>
      </label>
      <fieldset>
        <legend>Permissions</legend>
        <label><input type="checkbox" v-model="role.permissions" value="ManageClans"> Manage Clans</label>
        <label><input type="checkbox" v-model="role.permissions" value="ManageLeadership"> Manage Leadership</label>
        <label><input type="checkbox" v-model="role.permissions" value="ManageBOTM"> Manage BOTM</label>
        <label><input type="checkbox" v-model="role.permissions" value="ManageBOTY"> Manage BOTY</label>
        <label><input type="checkbox" v-model="role.permissions" value="ManageSiteStaff"> Manage Site Staff</label>
      </fieldset>
      <div class="button-div">
        <base-button @click="createRole">Create Role</base-button>
        <button @click="hideModal" class="cancel">Cancel</button>
      </div>
    </base-card>
  </div>
</template>

<script>
import { ref } from 'vue'
import RolesDb from '@/firebase/roles-db.js'

export default {
  emits: ['hide-modal', 'toast'],
  setup(_, { emit }) {

    const role = ref({
      name: null,
      permissions: []
    });

    const rolesDb = new RolesDb();

    function hideModal() {
      emit('hide-modal')
    }

    function createRole() {
      rolesDb.addRole(role.value);
      hideModal();
      emit('toast');
    }

    return {
      hideModal,
      createRole,
      role
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