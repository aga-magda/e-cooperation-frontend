<template>
  <b-container fluid id="project-info-user">
    <b-row>
      <b-col md="8">
        <ProjectCard
          v-bind:key="project.id"
          v-bind:project="project"
          buttonJoin="true"
        />
      </b-col>
      <b-col class="participants-sidebar">
        <h4>Uczestnicy:</h4>
        <div>
          <p v-if="project.participants.length === 0">brak uczestników</p>
          <p v-if="project.participants.length !== 0" v-for="participant in project.participants" v-bind:key="participant.id">
            {{participant.userName}}
          </p>
        </div>
      </b-col>
    </b-row>
  </b-container>
</template>

<script>
import ProjectCard from '@/components/ProjectCard.vue';

export default {
  name: 'project-details',
  components: { ProjectCard },
  data() {
    return {
      projectId: null,
      project: {
        creator: [],
        participants: [],
      },
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
  },
};
</script>

<style lang="scss" scoped>
/* project user info style */
#project-info-user {
  margin-top: 2%;
}
.row {
  padding: 0 15px;
  justify-content: left;
  margin: 0 150px;
}
.participants-sidebar {
  h4 {
    text-align: right;
  }
  div {
    float: right;
    padding: 1rem 1rem;
    width: 70%;
    min-height: 70vh;
    background: #ffffff;
    border: 1px solid black;
    border-radius: 10px;
    -webkit-box-shadow: 10px 10px 0 0 rgba(84,84,84,0.9);
    -moz-box-shadow: 10px 10px 0 0 rgba(84,84,84,0.9);
    box-shadow: 10px 10px 0 0 rgba(84,84,84,0.9);
    p {
      text-align: right;
      font-size: 1.1em;
    }
  }
}

/* responsive css */
@media (max-width: 1140px) {
  .row {
    margin: 0 50px;
  }

  .participants-sidebar {
    div {
      width: 90%;
    }
  }
}

@media (max-width: 960px) {
  .row {
    margin: 0;
  }

  .participants-sidebar {
    div {
      width: 100%;
    }
  }
}

@media (max-width: 767px) {
  .row {
    margin: 0;
  }

  .participants-sidebar {
    margin: 10% 0 20% 0;
    h4 {
      text-align: left;
    }
    div {
      float: left;
      width: 100%;
      min-height: 0;
      p {
        text-align: left;
      }
    }
  }
}

@media (max-width: 540px) {
  #project-info-user {
    margin-top: 5%;
  }
  .row, .col-md-8 {
    padding: 0;
  }
}
</style>
