<template>
  <section class="auth">
    <base-card>
      <basecard-header>Login</basecard-header>
      <form @submit.prevent="submitForm">
        <fieldset>
          <legend>Email</legend>
          <input type="email" v-model.trim="email" />
        </fieldset>
        <fieldset>
          <legend>Password</legend>
          <input type="password" v-model.trim="password" />
        </fieldset>
        <fieldset class="no-style">
          <p v-if="!formIsValid">Please enter a valid email and password.</p>
          <button type="button">Let me in</button>
        </fieldset>
      </form>
    </base-card>
  </section>
</template>

<script>
import { ref } from 'vue'

export default {
  setup() {
    const email = ref('');
    const password = ref('');
    const formIsValid = ref(true);

    async function submitForm() {
      // Do stuff
    }

    return {
      email,
      password,
      formIsValid,
      submitForm
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
}
fieldset {
  border: 3px dashed #343A40;
  margin: 0.25rem;
  border-radius: 5px;
}
legend {
  font-size: 0.9rem;
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
  border: 5px solid #470dbbc9;
}
fieldset.no-style {
  border: none;
  text-align: center;
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
}
button:hover,
button:active,
button:focus {
  border: 5px solid #470dbbc9;
  color: #470dbbc9;
}
</style>