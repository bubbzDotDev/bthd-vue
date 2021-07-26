<template>
  <section class="auth">
    <base-dialog :show="!!error" title="An error occurred" @close="handleError">
      <p>{{ error }}</p>
    </base-dialog>
    <base-dialog :show="isLoading" fixed title="Hold on a second...">
      <base-loader></base-loader>
    </base-dialog>
    <base-card>
      <basecard-header>Login</basecard-header>
      <form>
        <label>
          <fieldset>
            <legend>Email</legend>
            <input type="email" v-model.trim="email" />
          </fieldset>
        </label>
        <label>
          <fieldset>
            <legend>Password</legend>
            <input type="password" v-model.trim="password" />
          </fieldset>
        </label>
        <p v-if="!formIsValid">Email address invalid. Try again.</p>
        <p v-if="error">{{ error }}</p>
        <button @click="submitForm" type="button">Let me in</button>
      </form>
    </base-card>
    <router-link to="/signup">
      <p class="sign-up">Need an account? Sign up here.</p>
    </router-link>
  </section>
</template>

<script>
import { ref } from 'vue'
import { useStore } from 'vuex'

export default {
  setup() {
    const email = ref('');
    const password = ref('');
    const formIsValid = ref(true);
    const isLoading = ref(false);
    const error = ref(null);

    const store = useStore();

    async function submitForm() {
      formIsValid.value = true;
      if (email.value === '' || !email.value.includes('@')) {
        formIsValid.value = false;
        return;
      }
      
      isLoading.value = true;

      const data = {
        email: email.value,
        password: password.value
      };

      try {
        await store.dispatch('auth/login', data);
        email.value = '';
        password.value = '';
      } catch (err) {
        error.value = err.message || 'Failed to authenticate.';
      }
      
      isLoading.value = false;
    }

    function handleError() {
      error.value = null;
    }

    return {
      email,
      password,
      formIsValid,
      isLoading,
      error,
      submitForm,
      handleError
    };
  }
}
</script>

<style scoped>
.auth {
  margin: 0 auto;
  width: fit-content;
}
form {
  margin: 0.5rem;
  text-align: center;
}
fieldset {
  border: 3px dashed #343A40;
  margin: 0.25rem;
  border-radius: 5px;
}
legend {
  font-size: 0.9rem;
  text-align: left;
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

button {
  border: 5px solid #99AAB5;
  padding: 0.5rem;
  background-color: #99AAB5;
  color: #23272A;
  width: 216px;
  font-weight: bolder;
  font-size: 1.2rem;
  cursor: pointer;
  border-radius: 5px;
  margin-top: 0.5rem;
}

button:hover,
button:active,
button:focus {
  border: 5px solid #470dbb;
  color: #470dbb;
}

.sign-up {
  text-align: center;
}

a {
  text-decoration: none;
  color: #99AAB5;
}

a:hover {
  color: #fff;
}

</style>