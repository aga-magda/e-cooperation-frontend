<template>
  <div id="project-card">
    <h5 v-if="!searchPage">Admin: {{project.creator.userName}}</h5>
    <b-card class="project-card" header-text-variant="white" header-bg-variant="grey">
      <h4 :id="'project-title-' + project.id" slot="header">{{project.title}}</h4>
      <md-chips :class="'project-tags-' + project.id" class="chips-tags" v-model="project.tags" md-static/>
      <p class="city">Miasto: {{project.city}}</p>
      <b-card-text :id="'project-description-' + project.id" ref="description">{{project.description}}</b-card-text>
      <b-button-group>
        <md-button
          v-if="buttonExpand"
          ref="expandButton"
          @click="expandText(project.id)"
          class="md-raised md-theme-default"
        >
          Rozwiń
        </md-button>
        <md-button v-if="buttonJoin" class="md-raised md-theme-default-dark" @click="confirmJoin">
          Dołącz
        </md-button>
        <router-link v-if="buttonKnowMore" :to="{name: 'search/:id', params: {id: project.id}}">
          <md-button class="md-raised md-theme-default-dark">Dowiedz się więcej</md-button>
        </router-link>
        <router-link v-if="buttonView" :to="{name: 'projects/:id', params: {id: project.id}}">
          <md-button class="md-raised md-theme-default-dark">Przeglądaj</md-button>
        </router-link>
        <md-button
          v-if="buttonEdit"
          class="md-raised md-theme-default-dark"
          @click="showEditModal(project)"
        >
          Edytuj
        </md-button>
        <md-button
          v-if="buttonDelete"
          class="md-raised delete"
          @click="deleteProject(project.id)"
        >
          Usuń
        </md-button>
        <md-button
          v-if="buttonResign"
          class="md-raised delete"
          @click="resignProject"
        >
          Zrezygnuj
        </md-button>
      </b-button-group>
    </b-card>
  </div>
</template>

<script>

export default {
  name: 'ProjectCard',
  props: [
    'project',
    'buttonJoin',
    'buttonExpand',
    'buttonKnowMore',
    'buttonView',
    'buttonEdit',
    'buttonDelete',
    'buttonResign',
  ],
  computed: {
    searchPage() {
      if (this.$route.path === '/search') {
        return true;
      }
      return false;
    },
  },
  mounted() {
    if (this.buttonExpand) {
      const { description } = this.$refs;
      description.classList.add('shrink');
    }
  },
  methods: {
    confirmJoin(event) {
      this.$bvModal.msgBoxOk('Dołączyłeś do projektu. '
        + 'Twój adres email został przekazany administratorowi.', {
        title: 'Potwierdzenie',
        size: 'md',
        buttonSize: 'sm',
        okVariant: 'success',
        headerClass: 'p-2 border-bottom-0',
        footerClass: 'p-2 border-top-0',
        centered: true,
      })
        .then((value) => {
          this.modalBox = value;
        })
        .catch((err) => {
          // An error occurred
        });
    },
    deleteProject(id) {
      this.$bvModal.msgBoxConfirm('Czy na pewno chcesz usunąć projekt?', {
        title: 'Potwierdzenie',
        size: 'md',
        buttonSize: 'sm',
        okVariant: 'danger',
        okTitle: 'Tak, usuń',
        cancelVariant: 'grey',
        cancelTitle: 'Nie',
        headerClass: 'p-2 border-bottom-0',
        footerClass: 'p-2 border-top-0',
        centered: true,
      })
        .then((value) => {
          if (value) {
            this.$store.dispatch('deleteProject', id)
              .then(() => {
                if (this.$route.path !== '/projects') {
                  this.$router.push({ name: 'search' });
                }
                else {
                  setTimeout(function(){ location.reload(); }, 1800);
                }
              });
          }
        })
        .catch((err) => {
          // An error occurred
        });
    },
    resignProject(event) {
      this.modalBox = '';
      this.$bvModal.msgBoxConfirm('Czy na pewno chcesz zrezygnować z udziału w projekcie?', {
        title: 'Potwierdzenie',
        size: 'md',
        buttonSize: 'sm',
        okVariant: 'danger',
        okTitle: 'Tak, zrezygnuj',
        cancelVariant: 'grey',
        cancelTitle: 'Nie',
        headerClass: 'p-2 border-bottom-0',
        footerClass: 'p-2 border-top-0',
        centered: true,
      })
        .then((value) => {
          this.modalBox = value;
        })
        .catch((err) => {
          // An error occurred
        });
    },
    showEditModal(editProject) {
      this.$store.state.editProject = editProject;
      this.$bvModal.show('edit-project-modal');
    },
    expandText() {
      const { description } = this.$refs;
      const descriptionStyle = window.getComputedStyle(description);
      const descriptionHeight = descriptionStyle.getPropertyValue('height');
      const button = this.$refs.expandButton;

      description.classList.toggle('expand');

      if (descriptionHeight === '100px') {
        button.$el.innerHTML = "<div class='md-button-content'>ZWIŃ</div>";
      } else {
        button.$el.innerHTML = '<div class=\'md-button-content\'>ROZWIŃ</div>';
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.city {
  font-weight: 500;
}
.project-card {
  margin-top: 1%;
  margin-bottom: 10%;
  .chips-tags {
    &:after {
      content: none;
    }
  }
  .card-body {
    .card-text {
      overflow: hidden;
      transition: all 1.5s;
      text-align: justify;
    }
    .shrink {
      max-height: 100px;
    }
    .expand {
      max-height: 1000px;
    }
  }
  .btn-group {
    width: 100%;
    display: flex;
    justify-content: flex-end;
    button {
      margin-left: 8px;
      margin-right: 0;
    }
    .delete {
      background: #dc3545 ;
    }
  }
}
</style>
