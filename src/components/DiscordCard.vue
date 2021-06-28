<template>
  <div class="discord-container">
    <div class="discord-card">
      <div class="discord-card-header">
        <img src="@/assets/img/icons/discord_logo_and_text_white.png" alt="Discord logo with text" width="140" height="27">
        <span class="online-count-parent">
          <span class="online-count"><a href="https://discord.gg/bthd" target="_blank" rel="noopener">{{ onlineCount }}</a></span> 
          Guardians Online
        </span>
      </div>
      <p><a :onmouseover="hover" :onmouseout="unhover" href="https://discord.gg/bthd" target="_blank" rel="noopener">Join the Bulletheads Destiny<br />Discord Server today! <img class="discord-hover-img" src="@/assets/img/icons/discord_blurple.png" alt="Discord logo" width="45" height="34"></a></p>
    </div>
  </div>
</template>

<script>
import { ref } from 'vue'

export default {
  setup() {
    const onlineCount = ref(null);

    function unhover() {
      const img = document.querySelector('.discord-hover-img');
      img.setAttribute('src', require('@/assets/img/icons/discord_blurple.png'));
    }
  
    function hover() {
      const img = document.querySelector('.discord-hover-img');
      img.setAttribute('src', require('@/assets/img/icons/discord_white.png'));
    }

    const discordJsonURL = 'https://discord.com/api/guilds/411607476430176256/widget.json';
    fetch(discordJsonURL)
    .then((response) => response.json())
    .then((jsObject) => {
      onlineCount.value = jsObject.presence_count;
    });

    return {
      hover,
      unhover,
      onlineCount
    }
  },
}
</script>

<style scoped>
.discord-container {
  margin: 0 auto;
}
.discord-card {
  background-color: #23272A;
  font-weight: bold;
  text-align: center;
  border-radius: 5px;
  width: fit-content;
  box-shadow: 10px 10px 10px black;
  margin: 1rem;
}
.discord-card-header {
  width: 300px;
  height: 70px;
  color: #fff;
  font-size: 0.7rem;
  background-color: #5865F2;
  border-top-right-radius: 5px;
  border-top-left-radius: 5px; 
  display: flex;
  margin: 0.25rem auto;
  justify-content: space-between;
  align-items: center;
  font-weight: bold;
  padding: 0 0.5rem;
}
.online-count-parent {
  font-size: 0.8rem;
}
.online-count {
  background-color: #23272A;
  color: #fff;
  padding: 0.25rem;
  border-radius: 5px;
  font-size: 1rem;
}
.discord-card a {
  color: #99AAB5;
  text-decoration: none;
}
.discord-card a:hover {
  color: white;
  text-decoration: none;
}
.online-count a {
  color: #fff;
}
.discord-card img {
  vertical-align: middle;
}
.discord-card p {
  padding-bottom: 0.75rem;
}
</style>