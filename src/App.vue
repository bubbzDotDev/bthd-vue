<template>
  <TheHeader />
  <div class="home-page">
    <DiscordCard />
    <ClanList />
  </div>
</template>

<script>
import TheHeader from './components/TheHeader.vue'
import ClanList from './views/ClanList.vue'
import DiscordCard from './components/DiscordCard.vue'

export default {
  name: 'App',
  components: {
    ClanList,
    TheHeader,
    DiscordCard
  }
}
</script>

<style>
body {
  margin: 0;
  font-family: 'Roboto', Arial, Helvetica, sans-serif;
  font-size: 18px;
  background-color: #2C2F33;
}
.home-page {
  display: flex;
  flex-wrap: wrap;
  width: fit-content;
  margin: 1rem auto;
}
</style>
