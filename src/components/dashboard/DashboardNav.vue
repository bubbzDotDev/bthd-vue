<template>
  <div class="sidebar">
    <div class="nav-container">
      <ul>
        <li @click="toggleMenu(false)"><router-link to="/dashboard"><img src="@/assets/img/icons/home.png" alt="home icon" height="20" width="20"/></router-link></li>
        <li @click="toggleMenu(false)"><router-link to="/profile"><img class="to-profile" src="@/assets/img/icons/user.png" alt="admin icon"/></router-link></li>
        <li @click="toggleMenu(false)"><img src="@/assets/img/icons/settings.png" alt="settings icon" width="20" height="20"></li>
        <li @click="toggleMenu(false)"><img src="@/assets/img/icons/staff.png" alt="staff icon" width="24" height="24"></li>
        <li @click="toggleMenu(false)"><img src="@/assets/img/icons/promote.png" alt="promote icon" width="24" height="24"></li>
        <li @click="toggleMenu(false)"><img src="@/assets/img/icons/m.png" alt="Bullethead of the Month icon" width="16" height="16"></li>
        <li @click="toggleMenu(false)"><img src="@/assets/img/icons/y.png" alt="Bulletheads of the Year icon" width="16" height="16"></li>
      </ul>
      <ul class="nav-text" v-show="menuIsOpen">
        <li @click="toggleMenu(false)"><router-link to="/dashboard"><span class="menu-item"> Dashboard Home</span></router-link></li>
        <li @click="toggleMenu(false)"><router-link to="/profile"><span class="menu-item"> Profile</span></router-link></li>
        <li @click="toggleMenu(false)"><span class="menu-item"> Manage Clans</span></li>
        <li @click="toggleMenu(false)"><span class="menu-item"> Manage Site Staff</span></li>
        <li @click="toggleMenu(false)"><span class="menu-item"> Promote Members</span></li>
        <li @click="toggleMenu(false)"><span class="menu-item"> Manage BOTM</span></li>
        <li @click="toggleMenu(false)"><span class="menu-item"> Manage BOTY</span></li>
      </ul>
    </div>
    <div class="menu-arrow" @click="toggleMenu" :class="{'openArrow':menuIsOpen, 'closeArrow':!menuIsOpen}">
      <img class="arrow" src="@/assets/img/icons/arrow.png" alt="arrow" />
    </div>
  </div>
</template>

<script>
import { ref, watch } from 'vue'
export default {
  emits: ['menu-open'],
  setup(_, { emit }) {
    const menuIsOpen = ref(false);

    function toggleMenu(command) {
      if (command === false) {
        menuIsOpen.value = false;
      } else {
        menuIsOpen.value = !menuIsOpen.value;
      }
    }

    watch(menuIsOpen, (newValue) => {
      emit('menu-open', newValue);
    });

    return {
      menuIsOpen,
      toggleMenu
    };
  }
}
</script>

<style scoped>
.sidebar { 
  background-color: #470dbbc9;
  color: #fff;
  display: grid;
  grid-template-rows: 1fr 24px;
  height: 100%;
}

.nav-container {
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

.nav-container ul:first-child {
  text-align: center;
}

li {
  padding: 0.5rem;
  height: 24px;
}

.to-profile {
  border: 1px solid white;
  border-radius: 16px;
  padding: 2px;
}

.menu-arrow {
  text-align: center;
}

.arrow {
  height: 16px;
  cursor: pointer;
}

a {
  text-decoration: none;
  color: #fff;
}

.openArrow {
  transition: 1s transform cubic-bezier(0,.12,.14,1);
  transform: translateX(95px) scaleX(-1);
}

.closeArrow {
  transition: 1s transform cubic-bezier(0,.12,.14,1);
}
</style>