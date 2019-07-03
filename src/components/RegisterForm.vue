<template>
  <b-form novalidate class="register-form" @submit.prevent="register">
    <div class="register-title">
      <h3>Nie masz konta?</h3>
      <h5>Dołącz do nas!</h5>
    </div>
    <md-field :class="defineNameState">
      <label>Imię</label>
      <md-textarea v-model="name" md-autogrow></md-textarea>
      <span class="md-error">Podaj imię (tylko litery)</span>
    </md-field>
    <md-field :class="defineSurnameState">
      <label>Nazwisko</label>
      <md-textarea v-model="surname" md-autogrow></md-textarea>
      <span class="md-error">Podaj nazwisko (tylko litery)</span>
    </md-field>
    <md-field :class="defineEmailState">
      <label>Email</label>
      <md-textarea v-model="email" type="email" md-autogrow></md-textarea>
      <span class="md-error">Podaj poprawny email</span>
    </md-field>
    <md-field :class="defineUsernameState">
      <label>Login</label>
      <md-textarea v-model="username" md-autogrow></md-textarea>
      <span class="md-error">Podaj login (co najmniej 3 znaki a-z 0-9)</span>
    </md-field>
    <md-field :class="definePasswordState">
      <label>Hasło</label>
      <md-input v-model="password" type="password" md-autogrow></md-input>
      <span class="md-error">Podaj hasło (co najmniej 8 znaków)</span>
    </md-field>
    <md-field :class="defineAgeState">
      <label>Wiek</label>
      <md-input v-model="age" type="number" min="15" max="130" step="1"></md-input>
      <span class="md-error">Podaj wiek (15-130 lat)</span>
    </md-field>
    <div :class="defineGenderState">
      <md-radio v-model="gender" value="man" class="md-primary">Mężczyzna</md-radio>
      <md-radio v-model="gender" value="woman" class="md-primary">Kobieta</md-radio>
      <span class="gender-valid" v-if="genderChoosed">Zaznacz płeć</span>
    </div>
    <md-button class="md-raised md-primary" type="submit">Zarejestruj</md-button>
  </b-form>
</template>

<script>
export default {
  name: 'RegisterForm',
  data() {
    return {
      modalBox: '',
      name: '',
      surname: '',
      email: '',
      username: '',
      password: '',
      age: null,
      gender: '',
      nameState: null,
      surnameState: null,
      emailState: null,
      usernameState: null,
      passwordState: null,
      ageState: null,
      genderState: null,
      genderChoosed: false,
      submitted: false,
    };
  },
  updated() {
    console.log(this.passwordState);
  },
  computed: {
    defineNameState() {
      if (this.name !== '') {
        if (!this.validNameSurname(this.name) && this.submitted) {
          return { 'md-invalid': true };
        }
        this.nameState = 'valid';
        return { 'md-invalid': false };
      }
      if (this.name === '' && this.submitted) {
        this.nameState = 'invalid';
        return { 'md-invalid': true };
      }
      return { 'md-invalid': false };
    },
    defineSurnameState() {
      if (this.surname !== '') {
        if (!this.validNameSurname(this.surname) && this.submitted) {
          return { 'md-invalid': true };
        }
        this.surnameState = 'valid';
        return { 'md-invalid': false };
      }
      if (this.surname === '' && this.submitted) {
        this.surnameState = 'invalid';
        return { 'md-invalid': true };
      }
      return { 'md-invalid': false };
    },
    defineEmailState() {
      if (this.email !== '') {
        if (!this.validEmail(this.email) && this.submitted) {
          return { 'md-invalid': true };
        }
        this.emailState = 'valid';
        return { 'md-invalid': false };
      }
      if (this.email === '' && this.submitted) {
        this.emailState = 'invalid';
        return { 'md-invalid': true };
      }
      return { 'md-invalid': false };
    },
    defineUsernameState() {
      if (this.username !== '') {
        if (!this.validUsername(this.username) && this.submitted) {
          return { 'md-invalid': true };
        }
        this.usernameState = 'valid';
        return { 'md-invalid': false };
      }
      if (this.username === '' && this.submitted) {
        this.usernameState = 'invalid';
        return { 'md-invalid': true };
      }
      return { 'md-invalid': false };
    },
    definePasswordState() {
      if (this.password !== '') {
        if (!this.validPassword(this.password) && this.submitted) {
          return { 'md-invalid': true };
        }
        this.passwordState = 'valid';
        return { 'md-invalid': false };
      }
      if (this.password === '' && this.submitted) {
        this.passwordState = 'invalid';
        return { 'md-invalid': true };
      }
      return { 'md-invalid': false };
    },
    defineAgeState() {
      if (this.age !== null) {
        if (!this.validAge(this.age) && this.submitted) {
          return { 'md-invalid': true };
        }
        this.ageState = 'valid';
        return { 'md-invalid': false };
      }
      if (this.age === null && this.submitted) {
        this.ageState = 'invalid';
        return { 'md-invalid': true };
      }
      return { 'md-invalid': false };
    },
    defineGenderState() {
      if (this.gender !== '') {
        this.genderState = 'valid';
        this.genderChoosed = false;
        return { 'md-invalid': false };
      }
      if (this.gender === '' && this.submitted) {
        this.genderState = 'invalid';
        this.genderChoosed = true;
        return { 'md-invalid': true };
      }
      return { 'md-invalid': false };
    },
  },
  methods: {
    validNameSurname(text) {
      const re = /^[A-Za-zżźćńółęąśŻŹĆĄŚĘŁÓŃ]*$/;
      return re.test(text);
    },
    validEmail(email) {
      const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      return re.test(email);
    },
    validAge(age) {
      const re = /^\b(1[5-9]|[2-9][0-9]|1[0-2][0-9]|130)\b$/;
      return re.test(age);
    },
    validPassword(password) {
      const re = /^[a-zA-Z0-9]{8,}$/;
      return re.test(password);
    },
    validUsername(username) {
      const re = /^\b\w{3,}$/;
      return re.test(username);
    },
    checkFormValidity() {
      let valid = true;
      if (this.nameState === 'invalid' || this.nameState === null) {
        valid = false;
      }
      if (this.surnameState === 'invalid' || this.surnameState === null) {
        valid = false;
      }
      if (this.emailState === 'invalid' || this.emailState === null) {
        valid = false;
      }
      if (this.usernameState === 'invalid' || this.usernameState === null) {
        valid = false;
      }
      if (this.passwordState === 'invalid' || this.passwordState === null) {
        valid = false;
      }
      if (this.ageState === 'invalid' || this.ageState === null) {
        valid = false;
      }
      if (this.genderState === 'invalid' || this.genderState === null) {
        valid = false;
      }
      return valid;
    },
    register(e) {
      this.submitted = true;
      if (!this.checkFormValidity()) {
        return true;
      }
      e.preventDefault();

      const data = {
        name: this.name,
        surname: this.surname,
        email: this.email,
        username: this.username,
        password: this.password,
        age: this.age,
        gender: this.gender,
      };

      this.$store.dispatch('register', data)
        .then(() => {
          this.$router.push({ name: 'home' });

          this.$bvModal.msgBoxOk('Konto zostało założone. Możesz się zalogować.', {
            title: 'Potwierdzenie',
            size: 'md',
            buttonSize: 'sm',
            okVariant: 'primary',
            headerClass: 'p-2 border-bottom-0',
            footerClass: 'p-2 border-top-0',
            centered: true,
          })
            .then((value) => {
              this.modalBox = value;
            })
            .catch((error) => {
              console.log(error);
            });

          this.name = '';
          this.surname = '';
          this.email = '';
          this.username = '';
          this.password = '';
          this.age = null;
          this.gender = '';
          this.submitted = false;
        })
        .catch((error) => {
          let message = error.response.data.message;

          this.$bvModal.msgBoxOk(message, {
            title: 'Błąd rejestracji',
            size: 'md',
            buttonSize: 'sm',
            okVariant: 'danger',
            headerClass: 'p-2 border-bottom-0',
            footerClass: 'p-2 border-top-0',
            centered: true,
          });
        });
    },
  },
};
</script>

<style lang="scss" scoped>
/* register form style */
  .register-form {
  padding: 3rem 9rem 3rem 3rem;
  background: #ffffff;
  max-width: 600px;
  margin-left: auto;
  margin-right: 0;
  position: relative;
  right: 7%;
  -webkit-box-shadow: 10px 10px 0 0 rgba(84,84,84,0.9);
  -moz-box-shadow: 10px 10px 0 0 rgba(84,84,84,0.9);
  box-shadow: 10px 10px 0 0 rgba(84,84,84,0.9);
  border-radius: 10px;

  button {
    margin-left: 0;
  }
}
.register-title {
  padding-bottom: 1rem;
}

.gender-valid {
  color: #ff1744;
  font-size: 12px;
  display: inline-block;
  position: relative;
  bottom: 2px;
}


/* responsive css */
@media (max-width: 960px) {
  .register-form {
    margin-left: auto;
    margin-right: auto;
    right: 0;
  }
}

@media (max-width: 540px) {
  .register-form {
    padding: 2rem 1rem 2rem 1rem;
    margin-bottom: 20px;
  }
  .md-radio {
    margin-bottom: 0;
  }
}
</style>
