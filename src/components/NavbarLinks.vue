<template>
  <div class="navbar-links">
    <router-link class="link mr-sm-3" to="/search">Szukaj</router-link>
    <router-link class="link mr-sm-3" to="/projects">Projekty</router-link>
    <md-button class="mr-sm-3" @click="logout">Wyloguj</md-button>
  </div>
</template>

<script>
export default {
  name: 'NavbarLinks',
  methods: {
    logout() {
      this.$store.dispatch('logout')
        .then(() => {
          this.$router.push('/home');
        });
    },
  },
};
</script>

<style lang="scss" scoped>
/* default page & home page */
.navbar-links {
  display: flex;
  justify-content: flex-end;
  align-items: center;
}
a.link.mr-sm-3 {
  color: #ffffff;
  font-size: 1.2em;
  font-weight: 700;
  padding: 5px 10px;
  &:link , :visited{
    color: #ffffff;
    text-decoration: none;
  }
  &:hover {
    color: #03dac6;
    border-bottom: 3px solid #03dac6;
    text-decoration: none;
  }
  &:active {
    color: #03dac6;
  }
}

/* navbar links other page */
.navbar-links-other-page {
  a.link.mr-sm-3 {
    color: #000000;
    &:link , :visited{
      color: #000000;
    }
    &:hover {
      color: #03dac6;
    }
    &:active {
      color: #03dac6;
    }
  }
}

</style>
