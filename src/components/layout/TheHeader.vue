<template>
  <header>
    <div class="github-button-container">
      <a class="github-button" href="https://github.com/bubbzdotdev/bthd-vue" data-color-scheme="no-preference: dark; light: light; dark: dark;" data-icon="octicon-star" aria-label="Star bubbzdotdev/bthd-vue on GitHub">Star</a>
    </div>
    <div id="logo">
      <img src="@/assets/img/logo.png" alt="Bulletheads Logo" width="229" height="259">
    </div>
    <div class="header-text">
      <h1>BULLETHEADS</h1>
      <p>a Destiny gaming community</p>
    </div>
  </header>
</template>

<style scoped>
header {
  background-color: #000;
  color: #99AAB5;
  padding: 0.5rem 0 1rem 0;
}

#logo {
  margin: 0 auto;
  text-align: center;
}

.header-text {
  text-align: center;
  font-weight: bold;
}

h1 {
  font-family: 'Russo One', sans-serif;
  margin: 0;
}

p {
  font-family: 'Permanent Marker', cursive;
  margin: 0;
}

.github-button-container {
  display: flex;
  justify-content: right;
  padding-inline: 1rem;
  padding-block: 0.5rem;
}
</style>