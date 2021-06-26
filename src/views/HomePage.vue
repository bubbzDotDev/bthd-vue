<template>
  <div class="home-page">
    <DiscordCard />
    <ClanList />
  </div>
</template>

<script>
import ClanList from '@/components/ClanList.vue'
import DiscordCard from '@/components/DiscordCard.vue'

export default {
  name: 'HomePage',
  components: {
    ClanList,
    DiscordCard
  }
}
</script>

<style>
.home-page {
  display: flex;
  flex-wrap: wrap;
  width: fit-content;
  margin: 1rem auto;
}
</style>
