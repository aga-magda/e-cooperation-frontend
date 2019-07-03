<template>
  <b-container id="search-page">
    <b-row>
      <h4>Dołącz do interesujących Ciebie projektów!</h4>
    </b-row>
    <b-row class="search-row">
      <b-form id="search-form" @submit.prevent>
        <md-chips
          class="md-accent"
          v-model="tags"
          md-placeholder="Dodaj słowo kluczowe..."
          md-check-duplicated
          :md-format="toLowerCase">
          <div class="md-helper-text">Wyszukaj projekty po słowach kluczowych</div>
        </md-chips>
        <div class="choose-city">
          <md-field>
            <label>Miasto</label>
            <md-textarea v-model="city" md-autogrow></md-textarea>
          </md-field>
          <md-switch class="md-primary" v-model="remote">Zdalnie</md-switch>
        </div>
        <md-button @click="submitSearch" class="md-raised md-primary">Wyszukaj</md-button>
      </b-form>
    </b-row>
    <b-row id="projects-row">
      <ProjectCard
        v-for="project in filteredProjects"
        v-bind:key="project.id"
        v-bind:project="project"
        buttonExpand="true"
        buttonKnowMore="true"
      >
      </ProjectCard>
    </b-row>
  </b-container>
</template>

<script>
import ProjectCard from '@/components/ProjectCard.vue';

export default {
  name: 'search',
  components: {
    ProjectCard,
  },
  data() {
    return {
      projects: [],
      filteredProjects: [],
      tags: [],
      city: '',
      remote: false,
      gender: [],
      toggle: false,
    };
  },
  created() {
    this.$store.dispatch('getProjects')
      .then(() => {
        this.projects = this.$store.state.projects;
        this.filteredProjects = this.projects.slice(0);
        this.setTags();
      });
  },
  updated() {
    if (this.remote === true)
      this.city = 'ZDALNIE';
  },
  methods: {
    setTags() {
      let i = 0;
      for (i = 0; i < this.projects.length; i += 1) {
        let j = 0;
        const Tags = [];
        for (j = 0; j < this.projects[i].tags.length; j += 1) {
          const jsonTag = this.projects[i].tags[j].name;
          Tags.push(jsonTag);
        }
        this.projects[i].tags = [];
        this.projects[i].tags = Tags;
      }
    },
    toLowerCase(str) {
      str.toLowerCase();
      return str;
    },
    submitSearch() {
      let filter1 = {
        tags: this.tags,
      };
      let filter2 = {
        city: this.city.toUpperCase(),
      };
      let filter3 = {
        tags: this.tags,
        city: this.city.toUpperCase(),
      };

      if (this.tags.length !== 0 && this.city === '')
        this.filteredProjects = this.projects.filter((item) => {
            for (let key in filter1) {
                for (let key2 in filter1[key]) {
                  if (item[key].includes(filter1[key][key2]))
                    return true;
              }
            }
        });

      if (this.tags.length === 0 && this.city !== '')
        this.filteredProjects = this.projects.filter((item) => {
            for (let key in filter2) {
              if (!item[key].includes(filter2[key]))
                return false;
            }
            return true;
        });


      if (this.tags.length !== 0 && this.city !== '')
        this.filteredProjects = this.projects.filter((item) => {
          for (let key in filter1) {
            for (let key2 in filter1[key]) {
              if (item[key].includes(filter1[key][key2]) && item['city'].includes(filter3['city']))
                return true;
            }
          }
        });

      if (this.tags.length === 0 && this.city === '')
        this.filteredProjects = this.projects.filter((item) => {
          return true;
        });

    },
  },
};
</script>

<style lang="scss" scoped>
#search-page {
  margin-top: 2%;
}

/* search-row style */
.search-row {
  position: relative;
  padding: 0 15px;
  background: #ffffff;
  border: 1px solid black;
  border-radius: 10px;
  -webkit-box-shadow: 10px 10px 0 0 rgba(84,84,84,0.9);
  -moz-box-shadow: 10px 10px 0 0 rgba(84,84,84,0.9);
  box-shadow: 10px 10px 0 0 rgba(84,84,84,0.9);
  form {
    width: 80%;
    max-width: 800px;
    padding: 1rem 3rem;
    button {
      margin-left: 0;
    }
  }
  .choose-city {
    display: flex;
    align-items: flex-end;
    div.md-field {
      width: 100%;
      margin-right: 5%;
    }
  }
}

/* projects-row style */
#projects-row {
  margin-top: 5%;
  display: flex;
  justify-content: center;
  padding: 0 15px;
}

#project-card {
  width: 80%;
}

.chips-tags {
  &:after {
    content: none;
  }
}

/* responsive css */
/* general page style */
@media (max-width: 720px) {
  .row {
    padding: 0 15px;
    justify-content: center;
  }
}

@media (max-width: 620px) {
  h4 {
    font-size: 1.1rem;
  }
}

@media (max-width: 540px) {
  #search-page {
    margin-top: 5%;
  }
  h4 {
    font-size: 1rem;
  }
}

/* search-row style */
@media (max-width: 720px) {
  .search-row {
    background: none;
    -webkit-box-shadow: none;
    -moz-box-shadow: none;
    box-shadow: none;
    margin: 1rem 0rem;

    form {
      width: 100%;
      background: #ffffff;
      padding: 1rem 0rem;
    }
  }
}

/* projects-row style */
@media (max-width: 960px) {
  #project-card {
    width: 100%;
  }
}
</style>
