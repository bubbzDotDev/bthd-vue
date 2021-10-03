<template>
  <div class="sidebar">
    <div class="nav-container" :class="{ 'menu-is-open':menuIsOpen }">
      <ul>
        <li>
          <router-link @click="toggleMenu(false)" to="/dashboard" class="tooltip">
            <img src="@/assets/img/icons/home.png" alt="home icon" height="20" width="20" />
            <span v-if="!menuIsOpen" class="tooltiptext">Dashboard Home</span>
          </router-link>
        </li>
        <li>
          <router-link @click="toggleMenu(false)" to="/profile" class="tooltip">
            <img class="to-profile" src="@/assets/img/icons/user.png" alt="admin icon" width="16" height="16" />
            <span v-if="!menuIsOpen" class="tooltiptext">Profile</span>
          </router-link>
        </li>
        <li v-if="canManageClans">
          <router-link @click="toggleMenu(false)" to="/dashboard/clans" class="tooltip">
            <img src="@/assets/img/icons/settings.png" alt="settings icon" width="20" height="20">
            <span v-if="!menuIsOpen" class="tooltiptext">Manage Clans</span>
          </router-link>
        </li>
        <li v-if="canManageLeadership">
          <router-link @click="toggleMenu(false)" to="/dashboard/leadership" class="tooltip">
            <img src="@/assets/img/icons/leadership.png" alt="staff icon" width="24" height="24">
            <span v-if="!menuIsOpen" class="tooltiptext">Manage Leadership</span>
          </router-link>
        </li>
        <li v-if="canManageBOTM">
          <router-link @click="toggleMenu(false)" to="/dashboard/botm" class="tooltip">
            <img src="@/assets/img/icons/m.png" alt="Bullethead of the Month icon" width="16" height="16">
            <span v-if="!menuIsOpen" class="tooltiptext">Manage BOTM</span>
          </router-link>
        </li>
        <li v-if="canManageBOTY">
          <router-link @click="toggleMenu(false)" to="/dashboard/boty" class="tooltip">
            <img src="@/assets/img/icons/y.png" alt="Bulletheads of the Year icon" width="16" height="16">
            <span v-if="!menuIsOpen" class="tooltiptext">Manage BOTY</span>
          </router-link>
        </li>
        <li v-if="canManageSiteStaff">
          <router-link @click="toggleMenu(false)" to="/dashboard/staff" class="tooltip">
            <img src="@/assets/img/icons/staff.png" alt="staff icon" width="20" height="20">
            <span v-if="!menuIsOpen" class="tooltiptext">Manage Site Staff</span>
          </router-link>
        </li>
        <!-- <li>
          <router-link @click="toggleMenu(false)" to="/dashboard/members" class="tooltip">
            <img src="@/assets/img/icons/members.png" alt="members icon" width="24" height="24">
            <span v-if="!menuIsOpen" class="tooltiptext">Manage Members</span>
          </router-link>
        </li> -->
      </ul>
      <ul class="nav-text" v-show="menuIsOpen">
        <li>
          <router-link @click="toggleMenu(false)" to="/dashboard">
            <span class="menu-item"> Dashboard Home</span>
          </router-link>
        </li>
        <li>
          <router-link @click="toggleMenu(false)" to="/profile">
            <span class="menu-item"> Profile</span>
          </router-link>
        </li>
        <li v-if="canManageClans">
          <router-link @click="toggleMenu(false)" to="/dashboard/clans">
            <span class="menu-item"> Manage Clans</span>
          </router-link>
        </li>
        <li v-if="canManageLeadership">
          <router-link @click="toggleMenu(false)" to="/dashboard/leadership">
            <span class="menu-item"> Manage Leadership</span>
          </router-link>
        </li>
        <li v-if="canManageBOTM">
          <router-link @click="toggleMenu(false)" to="/dashboard/botm">
            <span class="menu-item"> Manage BOTM</span>
          </router-link>
        </li>
        <li v-if="canManageBOTY">
          <router-link @click="toggleMenu(false)" to="/dashboard/boty">
            <span class="menu-item"> Manage BOTY</span>
          </router-link>
        </li>
        <li v-if="canManageSiteStaff">
          <router-link @click="toggleMenu(false)" to="/dashboard/staff">
            <span class="menu-item"> Manage Site Staff</span>
          </router-link>
        </li>
        <!-- <li>
          <router-link @click="toggleMenu(false)" to="/dashboard/members">
            <span class="menu-item"> Manage Members</span>
          </router-link>
        </li> -->
      </ul>
    </div>
    <div class="menu-arrow" :class="{ 'openArrow':menuIsOpen }">
      <img @click="toggleMenu" class="arrow" src="@/assets/img/icons/arrow.png" alt="arrow" />
    </div>
  </div>
</template>

<script>
import { ref, watch, computed } from 'vue'
import { useStore } from 'vuex'

export default {
  emits: ['menu-open'],
  setup(_, { emit }) {
    const canManageClans = ref(false);
    const canManageLeadership = ref(false);
    const canManageBOTM = ref(false);
    const canManageBOTY = ref(false);
    const canManageSiteStaff = ref(false);
    const user = ref({});
    const roles = ref([]);
    const rolesWithManageClans = ref([]);
    const rolesWithManageLeadership = ref([]);
    const rolesWithManageBOTM = ref([]);
    const rolesWithManageBOTY = ref([]);
    const rolesWithManageSiteStaff = ref([]);

    let usersTarget;
    const store = useStore();

    const authUser = computed(() => {
      return store.getters['auth/user']; 
    });

    function getData() {
      const users = computed(() => {
        return store.getters['users/users'];
      });
      users.value
      .then(result => {
        usersTarget = Object.assign({}, result);
      })
      .then(() => {
        for (const property in usersTarget) {
          if(usersTarget[property].id === authUser.value.uid) {
            user.value = usersTarget[property];

            roles.value = store.getters['roles/roles'];
            roles.value = JSON.parse(JSON.stringify(roles.value));

            roles.value.forEach(role => {
              if (role.permissions.includes('ManageClans')) {
                rolesWithManageClans.value.push(role.id);
              }
              if (role.permissions.includes('ManageLeadership')) {
                rolesWithManageLeadership.value.push(role.id);
              }
              if (role.permissions.includes('ManageBOTM')) {
                rolesWithManageBOTM.value.push(role.id);
              }
              if (role.permissions.includes('ManageBOTY')) {
                rolesWithManageBOTY.value.push(role.id);
              }
              if (role.permissions.includes('ManageSiteStaff')) {
                rolesWithManageSiteStaff.value.push(role.id);
              }
            });

            // Manage Clans Permissions
            rolesWithManageClans.value.forEach(role => {
              if (user.value.roles.includes(role)) {
                canManageClans.value = true;
              }
            });

            // Manage Leadership Permissions
            rolesWithManageLeadership.value.forEach(role => {
              if (user.value.roles.includes(role)) {
                canManageLeadership.value = true;
              }
            });

            // Manage BOTM Permissions
            rolesWithManageBOTM.value.forEach(role => {
              if (user.value.roles.includes(role)) {
                canManageBOTM.value = true;
              }
            });

            // Manage BOTY Permissions
            rolesWithManageBOTY.value.forEach(role => {
              if (user.value.roles.includes(role)) {
                canManageBOTY.value = true;
              }
            });

            // Manage Site Staff Permissions
            rolesWithManageSiteStaff.value.forEach(role => {
              if (user.value.roles.includes(role)) {
                canManageSiteStaff.value = true;
              }
            });
          }
        }
      });
    }

    getData();
    
    setTimeout(() => {
        getData();
      }, 500);

    const menuIsOpen = ref(false);

    function toggleMenu(command) {
      if (command === false) {
        menuIsOpen.value = false;
      } else {
        menuIsOpen.value = !menuIsOpen.value;
      }
    }

    if (window.innerWidth > 520) {
      watch(menuIsOpen, (newValue) => {
        emit('menu-open', newValue);
      });
    }

    window.onresize = () => {
    if (window.innerWidth > 520) {
      watch(menuIsOpen, (newValue) => {
        emit('menu-open', newValue);
      });
    }
};

    return {
      menuIsOpen,
      toggleMenu,
      canManageClans,
      canManageLeadership,
      canManageBOTM,
      canManageBOTY,
      canManageSiteStaff
    };
  }
}
</script>

<style scoped>
.sidebar { 
  color: #fff;
  height: 100%;
  z-index: 1;
  background-color: #470dbb;
}

.nav-container {
  display: flex;
  justify-content: center;
}

.menu-is-open {
  width: 13rem;
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
  transform: scaleX(-1);
}

/* Tooltip container */
.tooltip {
  position: relative;
  display: inline-block;
}

/* Tooltip text */
.tooltip .tooltiptext {
  visibility: hidden;
  width: fit-content;
  white-space: nowrap;
  background-color: black;
  color: #fff;
  text-align: center;
  padding: 5px;
  border-radius: 6px;
 
  /* Position the tooltip text */
  position: absolute;
  z-index: 1;
  top: -5px;
  left: 150%;
}

.tooltip .tooltiptext::after {
  content: " ";
  position: absolute;
  top: 50%;
  right: 100%; /* To the left of the tooltip */
  margin-top: -5px;
  border-width: 5px;
  border-style: solid;
  border-color: transparent black transparent transparent;
}

/* Show the tooltip text when you mouse over the tooltip container */
.tooltip:hover .tooltiptext {
  visibility: visible;
}
</style>