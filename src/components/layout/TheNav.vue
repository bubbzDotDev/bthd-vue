<template>
  <nav>
    <ul class="navigation">
      <li><a @click="clickHamburger" class="hamburger" href="#">&#9776;</a></li>
      <li><router-link @click="clickHamburger" to="/">Home</router-link></li>
      <li><router-link @click="clickHamburger" to="/leadership">Leadership</router-link></li>
      <li v-if="currentRoute === 'dashboard'"> <!-- Add a "|| isLoggedIn" -->
        <router-link @click="clickHamburger" to="/dashboard">Dashboard</router-link>
      </li>
    </ul>
    <div class="social">
      <a rel="noopener" href="https://twitter.com/bulletheadsclan" target="_blank"><i class="fab fa-twitter icons"></i></a>
      <a rel="noopener" href="https://www.youtube.com/channel/UCA_jcqLMCiJTgKfL15ExycA" target="_blank"><i class="fab fa-youtube icons"></i></a>
      <a rel="noopener" href="https://www.twitch.tv/bulletheadsclan" target="_blank"><i class="fab fa-twitch icons"></i></a>
    </div>
  </nav>
</template>

<script>
import { computed } from 'vue'
import { useRoute } from 'vue-router';

export default {
  setup() {
    
    // Hamburger Menu
    function clickHamburger() {
      const nav = document.querySelector('.navigation');
      const hamburger = document.querySelector('.hamburger');
      nav.classList.toggle('responsive');
      nav.classList.contains('responsive') ? hamburger.innerHTML = '&#10005;' : hamburger.innerHTML = '&#9776;';
    }
    window.onresize = () => {
      const nav = document.querySelector('.navigation');
      const hamburger = document.querySelector('.hamburger');
      if (window.innerWidth > 520) {
        nav.classList.remove('responsive');
        hamburger.innerHTML = '&#9776;';
      }
    };

    const route = useRoute();

    const currentRoute = computed(() => {
      return route.name;
    });

    return {
      clickHamburger,
      currentRoute
    };
  },
}
</script>

<style scoped>
nav {
  background-color: #343A40;
  display: flex;
  justify-content: space-between;
}

ul {
  margin: 0
}

li {
  list-style: none;
  width: fit-content;
  transition: ease-in-out 1s;
}

li a {
  color: #99AAB5;
  text-decoration: none;
  padding: 0.5rem;
  display: block;
  width: inherit;
}

li a:hover {
  color: #fff;
}

.navigation li:first-child {
    display: block;
}

.navigation li {
    display: none;
}

.responsive li {
    display: block;
}

.social {
  display: flex;
  justify-content: space-between;
  width: 150px;
  padding: 0.5rem 2.5rem 0.5rem 0.5rem;
}

.social a:hover > .icons {
  color: #fff;
}

.icons {
  color: #99AAB5;
  font-size: 1.5rem;
}

a.router-link-active {
  color: #fff;
}

@media only screen and (min-width: 32.5em) {
  .navigation {
      display: flex;
      align-items: center;
  }

  .navigation li {
      display: block;
  }

  .navigation li:first-child {
      display: none;
  }

  .social {
    align-items: center;
  }
}
</style>