/* eslint-disable */
<template>
<div id="app">
  <Navbar :class="addNavbarClass"/>
  <router-view/>
  <VueStyle v-if="!homePage">
    html, body {
      background: #ffffff;
    }
  </VueStyle>
</div>

</template>

<script>
import Navbar from '@/components/Navbar.vue';
import VueStyle from '@/components/VueStyle.vue';

export default {
  components: {
    VueStyle,
    Navbar,
  },
  computed: {
    homePage() {
      const routes = ['/projects', '/search'];
      if (routes.includes(this.$route.path) || this.$route.params.id) {
        return false;
      }
      return true;
    },
    // isLoggedIn() {
    //   return this.$store.getters.isLoggedIn;
    // },
    addNavbarClass() {
      if (this.homePage === false) {
        return 'navbar-other-page navbar-links-other-page';
      }
      return '';
    },
  },
};
</script>

<style lang="scss">
#app {
  min-height: 100vh;
}
html, body {
  font-family: 'Roboto', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #000000;
  background: linear-gradient( rgba(0,0,0,0.4), rgba(0, 0, 0, 0.4) ),
  url(assets/team-image.jpg) no-repeat center center fixed;
  background-size: cover;
  background-blend-mode: darken;
}
</style>
