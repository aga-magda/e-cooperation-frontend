<template>
  <b-navbar sticky >
    <b-navbar-brand href="/" class="mb-0 ml-sm-3">
      Ecooperation
      <p>Find people and learn together easily</p>
    </b-navbar-brand>
    <LoginForm v-if="homePage"></LoginForm>
    <NavbarLinks v-if="!homePage"></NavbarLinks>
  </b-navbar>
</template>

<script>
import LoginForm from '@/components/LoginForm.vue';
import NavbarLinks from '@/components/NavbarLinks.vue';

export default {
  name: 'Navbar',
  components: {
    NavbarLinks,
    LoginForm,
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
  },
};
</script>

<style lang="scss" scoped>
/* default page & home page */
nav {
  background: transparent;
  height: 9%;
  display: flex;
  justify-content: space-between;
  padding-bottom: 0;
  a.navbar-brand.mb-0 {
    text-decoration: none;
    font-size: 1.8em;
    color: #ffffff;
    font-weight: 500;
  }
  p {
    color: #e1e1e1;
    font-size: 0.45em;
    font-weight: 400;
    line-height: 0.8;
  }
}

/* navbar other page */
.navbar-other-page {
  background: #ffffff;
  border-bottom: 1px solid rgb(228, 228, 228);
  a.navbar-brand.mb-0.ml-sm-3 {
    color: #000000;
  }
  p {
    color: #000000;
  }
}

/* responsive css */
@media (max-width: 720px) {
  a.navbar-brand.mb-0 {
    display: none;
  }
  nav {
    justify-content: flex-end;
    padding: 0.5rem 0.2rem;
  }
}
</style>
