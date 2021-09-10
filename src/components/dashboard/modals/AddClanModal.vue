<template>
  <div class="backdrop">
    <base-card class="modal">
      <basecard-header>Add Clan</basecard-header>
      <label>
        <fieldset>
          <legend>Enter clan ID #</legend>
          <input type="text" v-model.trim="clanId" required />
        </fieldset>
        <div class="button-div">
          <base-button @click="addClan">Add Clan</base-button>
          <button @click="hideModal" class="cancel">Cancel</button>
        </div>
      </label>
    </base-card>
  </div>
</template>

<script>
import { ref } from 'vue'
import { useStore } from 'vuex'

export default {
  emits: ['hide-modal', 'toast'],
  setup(_, { emit }) {
    const clanId = ref();

    function hideModal() {
      emit('hide-modal')
    }

    const store = useStore();

    function addClan() {
      store.dispatch('data/cacheDataToDb', clanId.value);
      hideModal();
      emit('toast');
    }

    return {
      hideModal,
      addClan,
      clanId
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

label {
  display: flex;
  flex-direction: column;
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
  width: 200px;
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