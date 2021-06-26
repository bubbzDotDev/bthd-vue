<template>
  <nav class="nav-bar">
    <ul class="navigation">
      <li><a @click="clickHamburger" class="hamburger" href="#">&#9776;</a></li>
      <li><a href="#">Home</a></li>
      <li><a href="#">Leadership</a></li>
    </ul>
    <div class="social">
      <a rel="noopener" href="https://twitter.com/bulletheadsclan" target="_blank"><i class="fab fa-twitter icons"></i></a>
      <a rel="noopener" href="https://www.youtube.com/channel/UCA_jcqLMCiJTgKfL15ExycA" target="_blank"><i class="fab fa-youtube icons"></i></a>
      <a rel="noopener" href="https://www.twitch.tv/bulletheadsclan" target="_blank"><i class="fab fa-twitch icons"></i></a>
    </div>
  </nav>
</template>

<script>
export default {
  setup() {
    
    // Hamburger Menu
    function clickHamburger() {
        document.querySelector('.navigation').classList.toggle('responsive');
        document.querySelector('.navigation').classList.contains('responsive') ? document.querySelector('.hamburger').innerHTML = '&#10005;' : document.querySelector('.hamburger').innerHTML = '&#9776;';
    }
    window.onresize = () => {
        if (window.innerWidth > 520) {
            document.querySelector('.navigation').classList.remove('responsive');
            document.querySelector('.hamburger').innerHTML = '&#9776;';
        }
    };

    return {
      clickHamburger
    };
  },
}
</script>

<style scoped>
.nav-bar {
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
  justify-content: space-evenly;
  width: 100px;
  padding: 0.5rem;
}

.social a:hover > .icons {
  color: #fff;
}

.icons {
  color: #99AAB5;
  font-size: 1.5rem;
}

@media only screen and (min-width: 32.5em) {
  .navigation {
      display: flex;
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