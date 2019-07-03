import Vue from 'vue';
import VueMaterial from 'vue-material';
import BootstrapVue from 'bootstrap-vue';
import App from './App.vue';
import router from './_helpers/router';
import store from './_store/store';
import Axios from 'axios';


/* Bootstrap Vue */
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap-vue/dist/bootstrap-vue.css';
/* Vue Material */
import 'vue-material/dist/vue-material.min.css';
import 'vue-material/dist/theme/default-dark.css';
/* import scss */
import '../public/css/custom.scss';

Vue.config.productionTip = false;
Vue.use(VueMaterial);
Vue.use(BootstrapVue);

Vue.prototype.$http = Axios;
const token = localStorage.getItem('token');
if(token) {
  Vue.prototype.$http.defaults.headers.common['Authorization'] = token;
}

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app');
