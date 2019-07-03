<template>
    <b-nav-form @submit.prevent="login">
      <md-field class=" mr-sm-3" :class="defineUsernameState" md-inline md-theme="default-dark">
        <label>Login</label>
        <md-input v-model="username"></md-input>
        <span class="md-error">Podaj login</span>
      </md-field>

      <md-field class=" mr-sm-3" :class="definePasswordState" md-inline md-theme="default-dark">
        <label>Hasło</label>
        <md-input type="password" v-model="password"></md-input>
        <span class="md-error">Podaj hasło</span>
      </md-field>
      <md-button type="submit" md-theme="default-dark">Zaloguj</md-button>

    </b-nav-form>
</template>

<script>
export default {
  name: 'LoginForm',
  data() {
    return {
      username: '',
      password: '',
      usernameState: null,
      passwordState: null,
      submitted: false,
    };
  },
  computed: {
    defineUsernameState() {
      if (this.username !== '') {
        this.usernameState = 'valid';
        return { 'md-invalid': false };
      }
      if (this.username === '' && this.submitted === true) {
        this.usernameState = 'invalid';
        return { 'md-invalid': true };
      }
      return { 'md-invalid': false };
    },
    definePasswordState() {
      if (this.password !== '') {
        this.passwordState = 'valid';
        return { 'md-invalid': false };
      }
      if (this.password === '' && this.submitted === true) {
        this.passwordState = 'invalid';
        return { 'md-invalid': true };
      }
      return { 'md-invalid': false };
    },
  },
  methods: {
    checkFormValidity() {
      let valid = true;
      if (this.usernameState === 'invalid' || this.usernameState === null) {
        valid = false;
      }
      if (this.passwordState === 'invalid' || this.passwordState === null) {
        valid = false;
      }
      return valid;
    },

    login(e) {
      this.submitted = true;
      if (!this.checkFormValidity()) {
        return true;
      }
      e.preventDefault();

      this.$store.dispatch('login', {
        username: this.username,
        password: this.password,
      })
        .then(() => {
          this.$router.push({ name: 'search' });
        })
        .catch((error) => {
          let message = error.response.data.message;

          this.$bvModal.msgBoxOk(message, {
            title: 'Błąd logowania',
            size: 'md',
            buttonSize: 'sm',
            okVariant: 'danger',
            headerClass: 'p-2 border-bottom-0',
            footerClass: 'p-2 border-top-0',
            centered: true,
          })
            .then(() => {
              this.username = '';
              this.password = '';
              this.submitted = false;
              this.usernameState = null;
              this.passwordState = null;
            })
            .catch((err) => {
              console.log(err);
            });
        });
    },
  },
};
</script>

<style lang="scss" scoped>
/* login form style */
.md-field {
  width: 35%;
}
form {
  display: flex;
  justify-content: flex-end;
}

/* responsive css */
@media (max-width: 960px) {
  .md-field {
    width: 30%;
  }
}

@media (max-width: 540px) {
  .register-form {
    padding: 2rem 1rem 2rem 1rem;
    margin-bottom: 20px;
  }
  .md-field {
    margin-left: 3%;
  }
}
</style>
