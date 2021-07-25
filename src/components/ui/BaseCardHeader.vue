<template>
  <div class="header">
    <slot></slot>
  </div>
</template>

<style scoped>
.header {
  font-family: 'Russo One', sans-serif;
  font-size: 30px;
  background-color: #470dbb;
  color: white;
  border-top-right-radius: 5px;
  border-top-left-radius: 5px; 
  text-align: center;
  padding: 0.5rem;
}
</style>