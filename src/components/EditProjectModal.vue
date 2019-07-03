<template>
  <b-modal
    projectId="id"
    id="edit-project-modal"
    ref="modal"
    title="Edytuj projekt"
    centered
    ok-title="Edytuj"
    cancel-title="Anuluj"
    cancel-variant="grey"
    @hidden="resetModal"
    @ok="editProject"
  >
    <form ref="form" @submit.stop.prevent="handleSubmit">
      <b-form-group
        :state="defineTitleState"
        label="Tytuł projektu"
        label-for="title-input"
        invalid-feedback="Tytuł projektu jest wymagany (co najmniej 3 znaki)."
      >
        <b-form-input
          id="title-input"
          v-model="title"
          :state="defineTitleState"
          type="text"
          required
        ></b-form-input>
      </b-form-group>

      <b-form-group
        :state="defineCityState"
        label="Miasto"
        label-for="city-input"
        invalid-feedback="Podanie miasta jest wymagane (co najmniej 3 znaki)."
      >
        <b-form-input
          ref="cityInput"
          id="city-input"
          v-model="city"
          :state="defineCityState"
          type="text"
        ></b-form-input>
      </b-form-group>

      <b-form-group
        :state="defineTagsState"
        label="Tagi projektu"
        label-for="tags-input"
        invalid-feedback="Słowa kluczowe dla projektu są wymagane."
      >
        <b-form-input
          id="tags-input"
          v-model="tag"
          :state="defineTagsState"
          type="text"
          required
        ></b-form-input>
      </b-form-group>
      <b-button class="buttonAddTag" size="sm" variant="primary" @click="addTag(tag)">Dodaj tag</b-button>
      <ul v-if="tags.length > 0" class="mt-2 tagList"> Dodane tagi:
        <li v-for="(tag, index) in tags" v-bind:key="index">
          <div class="tag">{{ tag.name }}</div>
          <b-button class="buttonDeleteTag" size="sm" variant="primary" @click="deleteTag(tag)">Usuń</b-button>
        </li>
      </ul>
      <b-form-group
        :state="defineDescriptionState"
        label="Opis projektu"
        label-for="description-input"
        invalid-feedback="Opis projektu jest wymagany (co najmniej 10 znaków)."
        class="description-input"
      >
        <b-form-textarea
          id="description-input"
          v-model="description"
          :state="defineDescriptionState"
          required
          rows="8"
          no-resize
        ></b-form-textarea>
      </b-form-group>
    </form>
    <b-button @click="showData">Pokaż dane</b-button>
  </b-modal>
</template>

<script>
export default {
  name: 'EditProjectModal',
  data() {
    return {
      projectData: {},
      id: '',
      title: '',
      city: '',
      description: '',
      tag: '',
      tags: [],
      user: {},
      project: {
        tags: null,
        city: null,
        creator: null,
      },
      titleState: null,
      cityState: null,
      descriptionState: null,
      tagsState: null,
      submitted: false,
    };
  },
  computed: {
    defineTitleState() {
      if (this.title !== '') {
        if (!this.validTitleCity(this.title)) {
          this.titleState = 'invalid';
          return 'invalid';
        }
        this.titleState = 'valid';
        return 'valid';
      }
      if (this.title === '' && this.submitted === true) {
        this.titleState = 'invalid';
        return 'invalid';
      }
    },
    defineCityState() {
      if (this.city !== '') {
        if (!this.validTitleCity(this.city)) {
          this.cityState = 'invalid';
          return 'invalid';
        }
        this.cityState = 'valid';
        return 'valid';
      }
      if (this.city === '' && this.submitted === true) {
        this.cityState = 'invalid';
        return 'invalid';
      }
    },
    defineTagsState() {
      if (this.tags.length > 0) {
        this.tagsState = 'valid';
        return 'valid';
      }
      if (this.tags.length === 0 && this.submitted === true) {
        this.tagsState = 'invalid';
        return 'invalid';
      }
    },
    defineDescriptionState() {
      if (this.description !== '') {
        if (!this.validDescription(this.description)) {
          this.descriptionState = 'invalid';
          return 'invalid';
        }
        this.descriptionState = 'valid';
        return 'valid';
      }
      if (this.description === '' && this.submitted === true) {
        this.descriptionState = 'invalid';
        return 'invalid';
      }
    },
  },
  methods: {
    validTitleCity(text) {
      const re = /^[A-Za-z0-9żźćńółęąśŻŹĆĄŚĘŁÓŃ ]{3,}$/;
      return re.test(text);
    },
    validTag(tag) {
      const re = /^[A-Za-z0-9żźćńółęąśŻŹĆĄŚĘŁÓŃ!@#$%&*.,();: ]{1,}$/;
      return re.test(tag);
    },
    validDescription(description) {
      const re = /^[A-Za-z0-9żźćńółęąśŻŹĆĄŚĘŁÓŃ!@#$%&*.,();: ]{10,}$/;
      return re.test(description);
    },
    showData() {
      let data = this.$store.state.editProject;
      this.title = data.title;
      this.city = data.city;
      this.description = data.description;

      for (let i = 0; i < data.tags.length; i += 1) {
        if (this.tags.length < data.tags.length) {
          const tagName = {name: data.tags[i]};
          this.tags.push(tagName);
        }
      }
    },
    addTag(tag) {
      if(!this.validTag(tag)) {
        this.tagsState = 'invalid';
        return 'invalid';
      }
      const tagName = {name: tag.toLowerCase()};
      this.tags.push(tagName);
      this.tag = '';
    },
    deleteTag(tag) {
      const tagPosition = this.tags.indexOf(tag);
      this.tags.splice(tagPosition, 1);
    },
    checkFormValidity() {
      let valid = true;
      if (this.tagsState === 'invalid' || this.tagsState === null) {
        valid = false;
      }
      if (this.titleState === 'invalid' || this.titleState === null) {
        valid = false;
      }
      if (this.cityState === 'invalid' || this.cityState === null) {
        valid = false;
      }
      if (this.descriptionState === 'invalid' || this.descriptionState === null) {
        valid = false;
      }
      return valid;
    },
    editProject(bvModalEvt, id) {
      this.submitted = true;
      // Prevent modal from closing
      bvModalEvt.preventDefault();
      // Trigger submit handler
      this.handleSubmit();
    },
    handleSubmit() {
      // Exit when the form isn't valid
      if (!this.checkFormValidity()) {
        return;
      }
      this.modifyProject();
      // Hide the modal manually
      this.$nextTick(() => {
        this.$refs.modal.hide();
      });
    },
    modifyProject(bvModalEvt) {
      let project = {
        id: this.$store.state.editProject.id,
        tags: [],
        city: this.city.toUpperCase(),
        title: this.title,
        description: this.description,
        participants: null,
      };

      this.$store.dispatch('modifyProject', project)
        .then((response) => {
          this.$router.go();
        })
        .catch((error) => {
          bvModalEvt.preventDefault();
        });
    },
    resetModal() {
      this.title = '';
      this.city = '';
      this.tag = '';
      this.tags = [];
      this.description = '';
      this.titleState = null;
      this.cityState = null;
      this.descriptionState = null;
      this.tagsState = null;
      this.submitted = false;
    },
  },
};
</script>

<style lang="scss" scoped>
.buttonAddTag{
  margin-top: -15px;
}

.description-input {
  margin-top: 15px;
}

.tagList {
  padding: 0;
  max-height: 200px;
  overflow: auto;
  li {
    padding-left: 15px;
    display: flex;
    justify-content: start;
    padding-bottom: 10px;
    .tag {
      min-width: 60%;
      display: inline;
    }
  }
}
</style>
