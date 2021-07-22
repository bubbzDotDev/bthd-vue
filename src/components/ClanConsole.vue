<template>
  <div>
    <p>Welcome to the Dashboard, {{ user.bungieName }}</p>
  </div>
</template>

<script>
import { ref } from 'vue'
// import { useStore } from 'vuex'

export default {
  setup() {
    const user = ref({});

    // const store = useStore();

    return {
      user
    };
  },
}
</script>

<style scoped>

</style>