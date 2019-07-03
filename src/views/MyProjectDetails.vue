<template>
  <b-container fluid id="my-project-details">
    <b-row class="created-projects-row">
      <b-col lg="8">
        <h4>Informacje o projekcie</h4>
        <ProjectCard
          v-bind:key="project.id"
          v-bind:project="project"
          buttonEdit="true"
          buttonDelete="true"
        />
        <EditProjectModal />
      </b-col>
    </b-row>
    <b-row class="project-participants-row">
      <b-col lg="12">
        <h4>Uczestnicy projektu</h4>
        <div
        v-for="participant in project.participants"
        v-bind:key="participant.id"
        class="participant-card"
        >
          <div>{{participant.firstName}}</div>
          <div>{{participant.lastName}}</div>
          <div>{{participant.userName}}</div>
          <div class="participantEmail">{{participant.email}}</div>
          <md-button class="md-raised delete" @click="deleteParticipant">Usuń</md-button>
        </div>
      </b-col>
    </b-row>
  </b-container>
</template>

<script>
import ProjectCard from '@/components/ProjectCard.vue';
import EditProjectModal from '@/components/EditProjectModal.vue';

export default {
  name: 'my-project-details',
  components: {
    ProjectCard,
    EditProjectModal,
  },
  data() {
    return {
      projectId: null,
      project: {},
    };
  },
  created() {
    this.projectId = this.$route.params.id;

    this.$store.dispatch('getProject', this.projectId)
      .then(() => {
        this.project = this.$store.state.project;
        this.setTags();
      });
  },
  methods: {
    setTags() {
      let i = 0;
      const Tags = [];
      for (i = 0; i < this.project.tags.length; i += 1) {
        const jsonTag = this.project.tags[i].name;
        Tags.push(jsonTag);
      }
      this.project.tags = [];
      this.project.tags = Tags;
    },
    deleteParticipant(event) {
      this.$bvModal.msgBoxConfirm('Czy na pewno chcesz usunąć uczestnika?', {
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
          this.modalBox = value;
        })
        .catch((err) => {
          // An error occurred
        });
    },
  },
};
</script>

<style lang="scss" scoped>
/* my project styles */
#my-project-details {
  margin-top: 2%;
}

.row {
  padding: 0 15px;
  justify-content: left;
  margin: 0 150px;
  h4 {
    padding: 1.2rem 0 1.2rem 0;
    border-bottom: 4px solid #03dac6;
  }
}

#project-card:nth-child(2) {
  margin-top: 5%;
}

.project-participants-row {
  max-width: 1300px;
}

.participant-card {
  display: flex;
  align-items: center;
  box-sizing: border-box;
  height: 100px;
  border: 1px solid #e4e4e4;
  border-radius: 5px;
  margin: 5% 0;
  div {
    width: 25%;
    padding: 1.2rem;
  }
  button.delete.md-theme-default {
    background: #dc3545 ;
    margin: 1.5rem;
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
  .participant-card {
    justify-content: space-between;
    div {
      display: none;
    }
    .participantEmail {
      display: block;
      padding: 0;
      margin: 1.5rem;
    }
  }
}

@media (max-width: 540px) {
  #my-project-details {
    margin-top: 5%;
    .row, .col-lg-8, .col-lg-12 {
      padding: 0;
    }
  }
}
</style>

<style lang="scss">
/* global styles */
  .card.project-card {
  margin-bottom: 5%;
}
</style>
