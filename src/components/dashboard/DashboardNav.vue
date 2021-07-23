<template>
  <div class="sidebar">
    <ul>
      <li><router-link to="/profile"><img class="to-profile" src="@/assets/img/icons/user.png" alt="admin icon"/></router-link></li>
      <li>✚</li> <!-- Add clans -->
      <!-- Promote Admins -->
      <!-- Add Site Staff -->
      <!-- Add BOTM -->
      <!-- Add BOTY -->
    </ul>
    <!-- <img src="@/assets/img/icons/arrow.png" />Arrow for making nav bigger/smaller -->
  </div>
</template>

<script>
export default {
  setup() {
    
  }
}
</script>

<style scoped>
.sidebar { 
  background-color: #470dbbc9;
  color: #fff;
  display: flex;
  justify-content: center;
}

ul,
li {
  margin: 0;
  padding: 0;
}

ul {
  list-style: none;
}

li {
  padding: 0.5rem;
}

.to-profile {
  border: 1px solid white;
  border-radius: 16px;
  padding: 2px;
}
</style>