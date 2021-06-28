<template>
  <div class="card">
    <slot></slot>
  </div>
</template>

<style scoped>
.card {
  box-shadow: 10px 10px 10px #000;
  color: #99AAB5;
  background-color: #23272A;
  border-radius: 5px;
  width: fit-content;
  margin: 1rem;
  padding-bottom: 0.25rem;
}
</style>