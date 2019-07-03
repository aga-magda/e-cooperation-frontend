<template>
  <b-container fluid id="user-projects">
    <b-row class="created-projects-row">
      <b-col lg="8">
        <div class="administrator-header">
          <h4>Administrator projektów</h4>
          <md-button class="md-raised md-theme-default-dark" @click="$bvModal.show('create-project-modal')">
            Utwórz
          </md-button>
        </div>
        <ProjectCard
          v-for="project in projectsAdmin"
          v-bind:key="project.id"
          v-bind:project="project"
          buttonExpand="true"
          buttonView="true"
          buttonEdit="true"
          buttonDelete="true"
        />
        <CreateProjectModal/>
        <EditProjectModal/>
      </b-col>
    </b-row>
    <b-row class="project-participants-row">
      <b-col lg="8">
        <h4>Uczestnik projektów</h4>
        <ProjectCard
          v-for="project in projectsParticipant"
          v-bind:key="project.id"
          v-bind:project="project"
          buttonExpand="true"
          buttonKnowMore="true"
          buttonResign="true"
        />
      </b-col>
    </b-row>
  </b-container>
</template>

<script>
import ProjectCard from '@/components/ProjectCard.vue';
import CreateProjectModal from '@/components/CreateProjectModal.vue';
import EditProjectModal from '@/components/EditProjectModal.vue';

export default {
  name: 'user-projects',
  components: {
    ProjectCard,
    CreateProjectModal,
    EditProjectModal,
  },
  data() {
    return {
      toggle: false,
      projects: [],
      projectsAdmin: [],
      projectsParticipant: [],
      currentUser: {},
    };
  },
  created() {
    this.$store.dispatch('getUser')
      .then(() => {
        this.currentUser = this.$store.state.user;

        this.$store.dispatch('getProjects')
          .then(() => {
            this.projects = this.$store.state.projects;
            this.filterProjectsAdmin();
            this.filterProjectsParticipant();
            this.setTags();
          });
      });
  },
  methods: {
    setTags() {
      for (let i = 0; i < this.projects.length; i += 1) {
        const Tags = [];
        for (let j = 0; j < this.projects[i].tags.length; j += 1) {
          const jsonTag = this.projects[i].tags[j].name;
          Tags.push(jsonTag);
        }
        this.projects[i].tags = [];
        this.projects[i].tags = Tags;
      }
    },
    filterProjectsAdmin() {
      const projectsAdmin = [];
      for (let i = 0; i < this.projects.length; i += 1) {
        if (this.projects[i].creator.id === this.currentUser.id) {
          const json = this.projects[i];
          projectsAdmin.push(json);
        }
      }
      this.projectsAdmin = projectsAdmin;
    },
    filterProjectsParticipant() {
      const projectsParticipant = [];
      for (let i = 0; i < this.projects.length; i += 1) {
        for (let j = 0; j < this.projects[i].participants.length; j += 1) {
          if (this.projects[i].participants[j].userName === this.currentUser.userName) {
            const json = this.projects[i];
            projectsParticipant.push(json);
          }
        }
      }
      this.projectsParticipant = projectsParticipant;
    },
  },
};
</script>

<style lang="scss" scoped>
#user-projects {
  margin-top: 2%;
}

.row {
  padding: 0 15px;
  justify-content: left;
  margin: 0 150px;
}

.administrator-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1.2rem 0 0.5rem 0;
  border-bottom: 4px solid #03dac6;
  margin-bottom: 8px;
  button {
    margin-right: 0;
  }
}

#project-card:nth-child(2) {
 margin-top: 5%;
}

.project-participants-row {
  h4 {
    padding: 1.2rem 0 1.2rem 0;
    border-bottom: 4px solid #03dac6;
  }
}

/* responsive css */
@media (max-width: 1140px) {
  .row {
    margin: 0 50px;
  }
}

@media (max-width: 767px) {
  .row {
    margin: 0;
  }
}

@media (max-width: 540px) {
  #user-projects {
    margin-top: 5%;
    .row, .col-lg-8 {
      padding: 0;
    }
  }
}
</style>

<style lang="scss">
/* global styles */
@media (max-width: 540px) {
  button.md-button.md-raised {
    min-width: 47px;

    .md-button-content {
      font-size: 0.8em;
    }
  }
}

</style>
