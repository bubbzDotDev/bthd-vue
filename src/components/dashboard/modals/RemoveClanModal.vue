<template>
  <div class="backdrop">
    <base-card class="modal">
      <basecard-header>Remove Clan</basecard-header>
      <div class="content">
        <p>Are you sure you want to remove {{ clan.name }}?</p>
        <base-button @click="removeClan">Remove Clan</base-button>
        <button @click="hideModal" class="cancel">Cancel</button>
      </div>
    </base-card>
  </div>
</template>

<script>
import { useStore } from 'vuex'

export default {
  props: {
    clan: Object
  },
  emits: ['hide-modal', 'toast'],
  setup(props, { emit }) {

    function hideModal() {
      emit('hide-modal');
    }

    const store = useStore();

    function removeClan() {
      const clan = props.clan;
      store.dispatch('data/removeClan', clan);
      hideModal();
      emit('toast');
    }

    return {
      hideModal,
      removeClan
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