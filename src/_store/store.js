import Vue from 'vue';
import Vuex from 'vuex';
import axios from 'axios';


Vue.use(Vuex);
axios.defaults.baseURL = 'https://ecooperation.azurewebsites.net';


export default new Vuex.Store({
  state: {
    status: '',
    token: localStorage.getItem('token') || null,
    userId: localStorage.getItem('userId') || null,
    project: {},
    projects: [],
    user: {},
    editProject: null,
  },
  mutations: {
    auth_request(state) {
      state.status = 'loading';
    },
    auth_success(state, token) {
      state.status = 'success';
      state.token = token;
      state.userId = localStorage.getItem('userId');
    },
    auth_error(state) {
      state.status = 'error';
      state.token = null;
    },
    logout(state) {
      state.status = '';
      state.token = null;
      state.userId = null;
    },
    getProjects(state, projects) {
      state.projects = projects;
    },
    getProject(state, project) {
      state.project = project;
    },
    getUser(state, user) {
      state.user = user;
    },
  },
  actions: {
    login(context, user) {
      return new Promise((resolve, reject) => {
        context.commit('auth_request');
        axios.post('/users/authenticate', user)
          .then((response) => {
            const token = response.data.token;
            const userId = response.data.id;

            localStorage.setItem('token', token);
            localStorage.setItem('userId', userId);

            context.commit('auth_success', token);
            resolve(response);
          })
          .catch((error) => {
            context.commit('auth_error');
            localStorage.removeItem('token');
            reject(error);
          });
      });
    },
    register(context, user) {
      return new Promise((resolve, reject) => {
        context.commit('auth_request');
        axios.post('/users/register', user)
          .then((response) => {
            delete axios.defaults.headers.common['Authorization'];
            resolve(response);
          })
          .catch((error) => {
            context.commit('auth_error');
            reject(error);
          })
      });
    },
    logout(context) {
      return new Promise((resolve, reject) => {
        if (context.getters.isLoggedIn) {
          context.commit('logout');
          localStorage.removeItem('token');
          localStorage.removeItem('userId');
          delete axios.defaults.headers.common['Authorization'];
          resolve();
        }
      });
    },
    getProjects(context) {
      return new Promise((resolve, reject) => {
        axios.defaults.headers.common['Authorization'] = 'Bearer ' + context.state.token;

        axios.get('/projects')
          .then(response => {
            context.commit('getProjects', response.data);
            resolve();
          })
          .catch(error => {
            console.log(error);
            reject();
          })
      })
    },
    addProject(context, project) {
      return new Promise((resolve, reject) => {
        axios.defaults.headers.common['Authorization'] = 'Bearer ' + context.state.token;
        context.commit('auth_request');
        axios.post('/projects', project)
          .then((response) => {
            resolve(response);
          })
          .catch((error) => {
            context.commit('auth_error');
            reject(error);
          })
      });
    },
    getProject(context, id) {
      return new Promise((resolve, reject) => {
        axios.defaults.headers.common['Authorization'] = 'Bearer ' + context.state.token;

        axios.get('/projects/' + id)
          .then(response => {
            context.commit('getProject', response.data);
            resolve();
          })
          .catch(error => {
            console.log(error);
            reject();
          })
      })
    },
    getUser(context) {
      return new Promise((resolve,reject) => {
        axios.defaults.headers.common['Authorization'] = 'Bearer ' + context.state.token;

        axios.get('/users/' + this.state.userId)
          .then(response => {
            context.commit('getUser', response.data);
            resolve();
          })
          .catch(error => {
            console.log(error);
            reject();
          })

      })
    },
    modifyProject(context, project) {
      return new Promise((resolve, reject) => {
        axios.defaults.headers.common['Authorization'] = 'Bearer ' + context.state.token;
        context.commit('auth_request');

        let projectId = this.state.editProject.id;
        axios.put('/projects/' + projectId, project)
          .then((response) => {
            resolve(response);
          })
          .catch((error) => {
            context.commit('auth_error');
            reject(error);
          })
      });
    },
    deleteProject(context, id) {
      axios.delete('/projects/' + id)
        .then(response => {
          console.log(response.data);
        })
        .catch(error => {
          console.log(error);
        })
    },
  },
  getters: {
    isLoggedIn: state => !!state.token,
  },
});
