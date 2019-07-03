<template>
  <b-container fluid id="home-page">
    <b-row class="home-row">
      <b-col md>
        <RegisterForm />
      </b-col>
    </b-row>
  </b-container>
</template>

<script>
import RegisterForm from '@/components/RegisterForm.vue';

export default {
  name: 'home',
  components: {
    RegisterForm,
  },
};
</script>

<style lang="scss" scoped>
#home-page {
  height: 91%;
  position: relative;
}
.home-row {
  margin-top: 2%;
}
</style>
